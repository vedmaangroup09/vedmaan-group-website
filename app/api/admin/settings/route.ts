import nodemailer from "nodemailer";
import { isAdminAuthenticated } from "../../../../lib/admin-auth";
import { getSmtpSettings, saveSmtpSettings, type SmtpSettings } from "../../../../lib/smtp-settings";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await getSmtpSettings();
  return Response.json({ ...settings, password: "", passwordConfigured: Boolean(settings.password) });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const settings: SmtpSettings = {
      host: String(body.host || "").trim().slice(0, 255),
      port: Number(body.port || 465),
      secure: Boolean(body.secure),
      user: String(body.user || "").trim().slice(0, 255),
      password: String(body.password || ""),
      from: String(body.from || "").trim().slice(0, 255),
      recipient: String(body.recipient || "").trim().slice(0, 500),
    };
    if (!settings.host || !settings.port || !settings.user || !settings.recipient) return Response.json({ error: "Please complete all required SMTP fields." }, { status: 400 });
    const current = await getSmtpSettings();
    if (!settings.password && !current.password) return Response.json({ error: "SMTP password is required." }, { status: 400 });
    await saveSmtpSettings(settings, !settings.password);
    const saved = await getSmtpSettings();
    if (body.test === true) {
      const transporter = nodemailer.createTransport({ host: saved.host, port: saved.port, secure: saved.secure, auth: { user: saved.user, pass: saved.password } });
      await transporter.sendMail({ from: saved.from || saved.user, to: saved.recipient, subject: "Vedmaan website SMTP test", html: "<p>Your Vedmaan website SMTP configuration is working correctly.</p>" });
    }
    return Response.json({ ok: true, tested: body.test === true });
  } catch (error) {
    console.error("SMTP settings update failed", error);
    return Response.json({ error: "Settings could not be saved or SMTP test failed. Check the credentials." }, { status: 500 });
  }
}

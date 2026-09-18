import nodemailer from "nodemailer";
import { getSmtpSettings } from "./smtp-settings";

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

const labels: Record<string, string> = {
  site_visit: "Site Visit Request",
  contact: "Contact Enquiry",
  agent: "Agent Registration",
};

export async function sendSubmissionMail(formType: string, fields: Record<string, string | boolean>) {
  const settings = await getSmtpSettings();
  if (!settings.host || !settings.user || !settings.password || !settings.recipient) throw new Error("SMTP settings are incomplete");

  const transporter = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: { user: settings.user, pass: settings.password },
  });
  const title = labels[formType] || "Website Form Submission";
  const rows = Object.entries(fields).map(([key, value]) => `<tr><th style="padding:9px 12px;text-align:left;border-bottom:1px solid #e5e7eb">${escapeHtml(key)}</th><td style="padding:9px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`).join("");
  await transporter.sendMail({
    from: settings.from || settings.user,
    to: settings.recipient,
    replyTo: typeof fields.email === "string" && fields.email ? fields.email : undefined,
    subject: `Vedmaan website: ${title}`,
    html: `<div style="font-family:Arial,sans-serif;color:#102747"><h2>${escapeHtml(title)}</h2><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table></div>`,
  });
}

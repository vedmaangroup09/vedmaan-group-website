import nodemailer from "nodemailer";

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

const labels: Record<string, string> = {
  site_visit: "Site Visit Request",
  contact: "Contact Enquiry",
  agent: "Agent Registration",
};

export async function sendSubmissionMail(formType: string, fields: Record<string, string | boolean>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const recipient = process.env.FORM_NOTIFICATION_EMAIL;
  if (!host || !user || !password || !recipient) throw new Error("SMTP settings are incomplete");

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass: password },
  });
  const title = labels[formType] || "Website Form Submission";
  const rows = Object.entries(fields).map(([key, value]) => `<tr><th style="padding:9px 12px;text-align:left;border-bottom:1px solid #e5e7eb">${escapeHtml(key)}</th><td style="padding:9px 12px;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`).join("");
  await transporter.sendMail({
    from: process.env.SMTP_FROM || user,
    to: recipient,
    replyTo: typeof fields.email === "string" && fields.email ? fields.email : undefined,
    subject: `Vedmaan website: ${title}`,
    html: `<div style="font-family:Arial,sans-serif;color:#102747"><h2>${escapeHtml(title)}</h2><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table></div>`,
  });
}

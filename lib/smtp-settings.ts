import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import type { RowDataPacket } from "mysql2";
import { ensureSubmissionsTable, getDatabase } from "./database";

export type SmtpSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  recipient: string;
};

type SettingRow = RowDataPacket & { setting_key: string; setting_value: string; is_secret: number };

function key() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters");
  return createHash("sha256").update(secret).digest();
}

function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return [iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), encrypted.toString("base64url")].join(".");
}

function decrypt(value: string) {
  const [iv, tag, encrypted] = value.split(".");
  const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, "base64url")), decipher.final()]).toString("utf8");
}

export async function getSmtpSettings(): Promise<SmtpSettings> {
  await ensureSubmissionsTable();
  const [rows] = await getDatabase().query<SettingRow[]>("SELECT setting_key, setting_value, is_secret FROM application_settings WHERE setting_key LIKE 'smtp_%'");
  const values = Object.fromEntries(rows.map((row) => [row.setting_key, row.is_secret ? decrypt(row.setting_value) : row.setting_value]));
  return {
    host: values.smtp_host || process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(values.smtp_port || process.env.SMTP_PORT || 465),
    secure: (values.smtp_secure || process.env.SMTP_SECURE || "true") === "true",
    user: values.smtp_user || process.env.SMTP_USER || "",
    password: values.smtp_password || process.env.SMTP_PASSWORD || "",
    from: values.smtp_from || process.env.SMTP_FROM || "",
    recipient: values.smtp_recipient || process.env.FORM_NOTIFICATION_EMAIL || "",
  };
}

export async function saveSmtpSettings(settings: SmtpSettings, keepExistingPassword: boolean) {
  await ensureSubmissionsTable();
  const entries: Array<[string, string, number]> = [
    ["smtp_host", settings.host, 0], ["smtp_port", String(settings.port), 0], ["smtp_secure", String(settings.secure), 0],
    ["smtp_user", settings.user, 0], ["smtp_from", settings.from, 0], ["smtp_recipient", settings.recipient, 0],
  ];
  if (!keepExistingPassword && settings.password) entries.push(["smtp_password", encrypt(settings.password), 1]);
  for (const [settingKey, value, isSecret] of entries) {
    await getDatabase().execute("INSERT INTO application_settings (setting_key, setting_value, is_secret) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), is_secret = VALUES(is_secret)", [settingKey, value, isSecret]);
  }
}

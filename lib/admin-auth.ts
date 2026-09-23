import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { RowDataPacket } from "mysql2";
import { ensureSubmissionsTable, getDatabase } from "./database";

export const ADMIN_COOKIE = "vedmaan_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters");
  return value;
}

function signature(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

type AdminSettingRow = RowDataPacket & { setting_key: string; setting_value: string };

async function storedCredentials() {
  try {
    await ensureSubmissionsTable();
    const [rows] = await getDatabase().query<AdminSettingRow[]>("SELECT setting_key, setting_value FROM application_settings WHERE setting_key IN ('admin_email', 'admin_password_hash')");
    const values = Object.fromEntries(rows.map((row) => [row.setting_key, row.setting_value]));
    return { email: values.admin_email || "", passwordHash: values.admin_password_hash || "" };
  } catch {
    return { email: "", passwordHash: "" };
  }
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, expected] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !expected) return false;
  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, "hex");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export async function getAdminEmail() {
  const stored = await storedCredentials();
  return stored.email || process.env.ADMIN_EMAIL || "";
}

export async function validateAdminCredentials(email: string, password: string) {
  const stored = await storedCredentials();
  if (stored.email && stored.passwordHash) {
    return safeEqual(email.trim().toLowerCase(), stored.email.trim().toLowerCase()) && verifyPassword(password, stored.passwordHash);
  }
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) throw new Error("Admin credentials are not configured");
  return safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) && safeEqual(password, adminPassword);
}

export async function saveAdminCredentials(email: string, password: string) {
  await ensureSubmissionsTable();
  const entries = [["admin_email", email.trim().toLowerCase(), 0], ["admin_password_hash", hashPassword(password), 1]] as const;
  for (const [settingKey, value, isSecret] of entries) {
    await getDatabase().execute("INSERT INTO application_settings (setting_key, setting_value, is_secret) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), is_secret = VALUES(is_secret)", [settingKey, value, isSecret]);
  }
}

export function createAdminSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const value = `admin.${expires}`;
  return { token: `${value}.${signature(value)}`, maxAge: SESSION_SECONDS };
}

export function verifyAdminSession(token?: string) {
  if (!token) return false;
  const [role, expiresText, providedSignature] = token.split(".");
  if (role !== "admin" || !expiresText || !providedSignature) return false;
  if (Number(expiresText) <= Math.floor(Date.now() / 1000)) return false;
  const expected = signature(`${role}.${expiresText}`);
  return safeEqual(providedSignature, expected);
}

export async function isAdminAuthenticated() {
  return verifyAdminSession((await cookies()).get(ADMIN_COOKIE)?.value);
}

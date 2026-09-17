import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

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

export function validateAdminCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) throw new Error("Admin credentials are not configured");
  return safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) && safeEqual(password, adminPassword);
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

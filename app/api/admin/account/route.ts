import { getAdminEmail, isAdminAuthenticated, saveAdminCredentials, validateAdminCredentials } from "../../../../lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ email: await getAdminEmail() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const currentPassword = String(body.currentPassword || "");
    const newPassword = String(body.newPassword || "");
    const currentEmail = await getAdminEmail();
    if (!(await validateAdminCredentials(currentEmail, currentPassword))) return Response.json({ error: "Current password is incorrect." }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    if (newPassword.length < 12) return Response.json({ error: "New password must contain at least 12 characters." }, { status: 400 });
    await saveAdminCredentials(email, newPassword);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Admin credentials update failed", error);
    return Response.json({ error: "Credentials could not be updated." }, { status: 500 });
  }
}

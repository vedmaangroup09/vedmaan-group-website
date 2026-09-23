import { cookies } from "next/headers";
import { ADMIN_COOKIE, createAdminSession, validateAdminCredentials } from "../../../../lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (typeof body.email !== "string" || typeof body.password !== "string" || !(await validateAdminCredentials(body.email, body.password))) {
      return Response.json({ error: "Invalid email or password." }, { status: 401 });
    }
    const session = createAdminSession();
    (await cookies()).set(ADMIN_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: session.maxAge,
      priority: "high",
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed", error);
    return Response.json({ error: "Admin login is not configured yet." }, { status: 500 });
  }
}

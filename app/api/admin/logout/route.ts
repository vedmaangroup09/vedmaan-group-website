import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "../../../../lib/admin-auth";

export async function POST() {
  (await cookies()).set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return Response.json({ ok: true });
}

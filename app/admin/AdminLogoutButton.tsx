"use client";

import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return <button className="adminLogout" type="button" onClick={logout}><LogOut /> Sign out</button>;
}

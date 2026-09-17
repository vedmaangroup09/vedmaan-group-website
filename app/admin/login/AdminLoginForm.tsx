"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";

export default function AdminLoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login failed.");
      window.location.href = "/admin";
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
      setLoading(false);
    }
  }
  return <form className="adminLoginCard" onSubmit={submit}>
    <span className="adminLoginIcon"><LockKeyhole /></span>
    <p>Vedmaan Group</p><h1>Admin dashboard</h1><small>Sign in to view website enquiries and registrations.</small>
    <label>Email address<input required type="email" name="email" autoComplete="username" /></label>
    <label>Password<input required type="password" name="password" autoComplete="current-password" /></label>
    {error && <div className="adminError" role="alert">{error}</div>}
    <button disabled={loading}>{loading ? "Signing in..." : "Sign in"}<ArrowRight /></button>
  </form>;
}

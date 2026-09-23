"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Save } from "lucide-react";

export default function AccountSettingsForm() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/account").then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setEmail(data.email || "");
    }).catch((reason) => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setMessage("");
    if (newPassword !== confirmPassword) { setError("New passwords do not match."); return; }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/account", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, currentPassword, newPassword }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      setMessage("Login credentials updated successfully.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to update credentials."); }
    finally { setLoading(false); }
  }

  return <form className="accountSettingsCard" onSubmit={submit}>
    <div className="smtpSettingsHead"><div><span>Secure access</span><h2>Login credentials</h2><p>Update the email and password used to access this dashboard.</p></div><KeyRound /></div>
    <div className="accountSettingsFields">
      <label>Login email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" /></label>
      <label>Current password<input required type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" /></label>
      <label>New password<input required minLength={12} type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" /></label>
      <label>Confirm new password<input required minLength={12} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" /></label>
    </div>
    <p className="accountPasswordHint">Use at least 12 characters with uppercase, lowercase, numbers and symbols.</p>
    {error && <p className="adminError" role="alert">{error}</p>}
    {message && <p className="smtpSuccess" role="status"><CheckCircle2 /> {message}</p>}
    <div className="smtpActions"><button disabled={loading} type="submit"><Save /> {loading ? "Please wait..." : "Save credentials"}</button></div>
  </form>;
}

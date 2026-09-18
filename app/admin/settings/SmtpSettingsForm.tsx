"use client";

import { FormEvent, useEffect, useState } from "react";
import { MailCheck, Save } from "lucide-react";

type Settings = { host: string; port: number; secure: boolean; user: string; password: string; from: string; recipient: string; passwordConfigured?: boolean };
const initial: Settings = { host: "smtp.hostinger.com", port: 465, secure: true, user: "", password: "", from: "", recipient: "" };

export default function SmtpSettingsForm() {
  const [settings, setSettings] = useState(initial);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch("/api/admin/settings").then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error); setSettings(data); }).catch((reason) => setError(reason.message)).finally(() => setLoading(false)); }, []);

  async function save(test: boolean) {
    setLoading(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...settings, test }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      setSettings((current) => ({ ...current, password: "", passwordConfigured: true }));
      setMessage(test ? "Settings saved and test email sent." : "SMTP settings saved securely.");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save settings."); } finally { setLoading(false); }
  }

  const update = (field: keyof Settings, value: string | number | boolean) => setSettings((current) => ({ ...current, [field]: value }));
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void save(false); }
  return <form className="smtpSettingsCard" onSubmit={submit}>
    <div className="smtpSettingsHead"><div><span>Email delivery</span><h2>SMTP configuration</h2><p>Form notifications will be sent to the recipient address below.</p></div><MailCheck /></div>
    <div className="smtpSettingsGrid">
      <label>SMTP host*<input required value={settings.host} onChange={(event) => update("host", event.target.value)} /></label>
      <label>SMTP port*<input required type="number" value={settings.port} onChange={(event) => update("port", Number(event.target.value))} /></label>
      <label>SMTP username*<input required type="email" value={settings.user} onChange={(event) => update("user", event.target.value)} /></label>
      <label>SMTP password{settings.passwordConfigured ? " (leave blank to keep current)" : "*"}<input type="password" value={settings.password} onChange={(event) => update("password", event.target.value)} autoComplete="new-password" /></label>
      <label>From email<input type="email" value={settings.from} placeholder="Defaults to SMTP username" onChange={(event) => update("from", event.target.value)} /></label>
      <label>Notification recipient*<input required value={settings.recipient} placeholder="leads@example.com" onChange={(event) => update("recipient", event.target.value)} /></label>
      <label className="smtpSecure"><input type="checkbox" checked={settings.secure} onChange={(event) => update("secure", event.target.checked)} /><span>Use secure SSL/TLS connection</span></label>
    </div>
    {message && <p className="smtpSuccess">{message}</p>}{error && <p className="adminError">{error}</p>}
    <div className="smtpActions"><button disabled={loading} type="submit"><Save /> {loading ? "Please wait..." : "Save settings"}</button><button disabled={loading} type="button" onClick={() => void save(true)}>Save & send test</button></div>
  </form>;
}

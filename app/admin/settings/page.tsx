import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/admin-auth";
import AdminLogoutButton from "../AdminLogoutButton";
import SmtpSettingsForm from "./SmtpSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <main className="adminShell"><header className="adminHeader"><div><span>Vedmaan Group</span><h1>Email settings</h1></div><div className="adminHeaderActions"><a href="/admin">Submissions</a><AdminLogoutButton /></div></header><SmtpSettingsForm /></main>;
}

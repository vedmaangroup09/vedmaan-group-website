import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/admin-auth";
import AdminSidebar from "../AdminSidebar";
import SmtpSettingsForm from "./SmtpSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <main className="adminShell adminDashboardShell"><AdminSidebar active="settings" /><div className="adminMain"><header className="adminHeader"><div><span>Configuration</span><h1>Email settings</h1><p>Manage the mailbox used for website form notifications.</p></div></header><SmtpSettingsForm /></div></main>;
}

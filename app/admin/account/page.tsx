import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../../lib/admin-auth";
import AdminSidebar from "../AdminSidebar";
import AccountSettingsForm from "./AccountSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <main className="adminShell adminDashboardShell"><AdminSidebar active="account" /><div className="adminMain"><header className="adminHeader"><div><span>Administrator</span><h1>Account settings</h1><p>Manage the credentials used for secure dashboard access.</p></div></header><AccountSettingsForm /></div></main>;
}

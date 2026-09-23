import Image from "next/image";
import { CalendarCheck, ExternalLink, KeyRound, LayoutDashboard, Mail, MessageSquareText, UsersRound } from "lucide-react";
import AdminLogoutButton from "./AdminLogoutButton";

type AdminSection = "all" | "site_visit" | "contact" | "agent" | "settings" | "account";

export default function AdminSidebar({ active }: { active: AdminSection }) {
  return <aside className="adminSidebar">
    <div className="adminSidebarBrand">
      <Image src="/assets/header-logo-white.png" alt="Vedmaan Group" width={154} height={82} priority />
      <span>Admin workspace</span>
    </div>
    <nav className="adminSidebarNav" aria-label="Dashboard navigation">
      <p>Workspace</p>
      <a className={active === "all" ? "active" : ""} href="/admin"><LayoutDashboard /><span>All submissions</span></a>
      <a className={active === "site_visit" ? "active" : ""} href="/admin?type=site_visit"><CalendarCheck /><span>Site visits</span></a>
      <a className={active === "contact" ? "active" : ""} href="/admin?type=contact"><MessageSquareText /><span>Contact enquiries</span></a>
      <a className={active === "agent" ? "active" : ""} href="/admin?type=agent"><UsersRound /><span>Agent registrations</span></a>
      <a className={active === "settings" ? "active" : ""} href="/admin/settings"><Mail /><span>Email settings</span></a>
      <a className={active === "account" ? "active" : ""} href="/admin/account"><KeyRound /><span>Account settings</span></a>
      <p>Website</p>
      <a href="/" target="_blank" rel="noopener noreferrer"><ExternalLink /><span>View website</span></a>
    </nav>
    <div className="adminSidebarFooter">
      <span>Signed in as</span>
      <strong>Administrator</strong>
      <AdminLogoutButton />
    </div>
  </aside>;
}

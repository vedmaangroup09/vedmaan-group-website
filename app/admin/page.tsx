import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/admin-auth";
import { ensureSubmissionsTable, getDatabase, type SubmissionRow } from "../../lib/database";
import AdminSidebar from "./AdminSidebar";
import AdminSubmissionsTable, { type AdminSubmission } from "./AdminSubmissionsTable";
import { CalendarDays } from "lucide-react";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

const titles: Record<string, string> = { site_visit: "Site visit requests", contact: "Contact enquiries", agent: "Agent registrations" };
type CountRow = RowDataPacket & { form_type: string; total: number };
const submissionQueries: Record<string, string> = {
  site_visit: "SELECT id, 'site_visit' AS form_type, name, email, phone, payload, source_page, email_sent, created_at FROM site_visit_submissions",
  contact: "SELECT id, 'contact' AS form_type, name, email, phone, payload, source_page, email_sent, created_at FROM contact_submissions",
  agent: "SELECT id, 'agent' AS form_type, company_name AS name, NULL AS email, mobile AS phone, payload, source_page, email_sent, created_at FROM agent_registrations",
};

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const localPreview = process.env.NODE_ENV === "development" &&
    !["DATABASE_HOST", "DATABASE_USER", "DATABASE_PASSWORD", "DATABASE_NAME"].every((key) => process.env[key]);
  const selected = (await searchParams).type || "all";
  const sql = `${submissionQueries[selected] || Object.values(submissionQueries).join(" UNION ALL ")} ORDER BY created_at DESC LIMIT 500`;
  let rows: SubmissionRow[] = [];
  let counts: CountRow[] = [];
  if (!localPreview) {
    await ensureSubmissionsTable();
    [rows] = await getDatabase().query<SubmissionRow[]>(sql);
    [counts] = await getDatabase().query<CountRow[]>(`
      SELECT 'site_visit' AS form_type, COUNT(*) AS total FROM site_visit_submissions
      UNION ALL SELECT 'contact', COUNT(*) FROM contact_submissions
      UNION ALL SELECT 'agent', COUNT(*) FROM agent_registrations
    `);
  }
  const total = counts.reduce((sum, item) => sum + Number(item.total), 0);
  const countFor = (type: string) => Number(counts.find((item) => item.form_type === type)?.total || 0);
  const displayRows: AdminSubmission[] = rows.map((row) => ({
    id: Number(row.id), formType: row.form_type, formTitle: titles[row.form_type] || row.form_type,
    name: row.name || "", email: row.email || "", phone: row.phone || "",
    payload: typeof row.payload === "string" ? JSON.parse(row.payload) as Record<string, string | boolean> : row.payload,
    sourcePage: row.source_page || "", emailSent: Boolean(row.email_sent), createdAt: new Date(row.created_at).toISOString(),
  }));

  return <main className="adminShell adminDashboardShell">
    <AdminSidebar active={titles[selected] ? selected as "site_visit" | "contact" | "agent" : "all"} />
    <div className="adminMain">
    <header className="adminHeader"><div><span>Overview</span><h1>Form submissions</h1><p>Review and manage enquiries received from the Vedmaan website.</p></div><div className="adminHeaderDate"><CalendarDays /><span>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(new Date())}</span></div></header>
    {localPreview && <p className="adminDemoNotice">Local preview: no database is configured, so submissions will appear here after database setup.</p>}
    <section className="adminStats"><a className={selected === "all" ? "active" : ""} href="/admin"><span>All submissions</span><b>{total}</b></a>{Object.entries(titles).map(([type, title]) => <a className={selected === type ? "active" : ""} href={`/admin?type=${type}`} key={type}><span>{title}</span><b>{countFor(type)}</b></a>)}</section>
    <section className="adminTableCard">
      <div className="adminTableHead"><h2>{selected === "all" ? "Recent submissions" : titles[selected]}</h2><span>Latest 500 records</span></div>
      {displayRows.length === 0 ? <div className="adminEmpty">No submissions found.</div> : <AdminSubmissionsTable rows={displayRows} />}
    </section>
    </div>
  </main>;
}

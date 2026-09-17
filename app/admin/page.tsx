import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../../lib/admin-auth";
import { ensureSubmissionsTable, getDatabase, type SubmissionRow } from "../../lib/database";
import AdminLogoutButton from "./AdminLogoutButton";
import type { RowDataPacket } from "mysql2";

export const dynamic = "force-dynamic";

const titles: Record<string, string> = { site_visit: "Site visits", contact: "Contact enquiries", agent: "Agent registrations" };
type CountRow = RowDataPacket & { form_type: string; total: number };

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  await ensureSubmissionsTable();
  const selected = (await searchParams).type || "all";
  const params: string[] = [];
  let sql = "SELECT * FROM form_submissions";
  if (selected !== "all" && titles[selected]) { sql += " WHERE form_type = ?"; params.push(selected); }
  sql += " ORDER BY created_at DESC LIMIT 500";
  const [rows] = await getDatabase().query<SubmissionRow[]>(sql, params);
  const [counts] = await getDatabase().query<CountRow[]>("SELECT form_type, COUNT(*) AS total FROM form_submissions GROUP BY form_type");
  const total = counts.reduce((sum, item) => sum + Number(item.total), 0);
  const countFor = (type: string) => Number(counts.find((item) => item.form_type === type)?.total || 0);

  return <main className="adminShell">
    <header className="adminHeader"><div><span>Vedmaan Group</span><h1>Form submissions</h1></div><AdminLogoutButton /></header>
    <section className="adminStats"><a className={selected === "all" ? "active" : ""} href="/admin"><span>All submissions</span><b>{total}</b></a>{Object.entries(titles).map(([type, title]) => <a className={selected === type ? "active" : ""} href={`/admin?type=${type}`} key={type}><span>{title}</span><b>{countFor(type)}</b></a>)}</section>
    <section className="adminTableCard">
      <div className="adminTableHead"><h2>{selected === "all" ? "Recent submissions" : titles[selected]}</h2><span>Latest 500 records</span></div>
      {rows.length === 0 ? <div className="adminEmpty">No submissions found.</div> : <div className="adminTableWrap"><table><thead><tr><th>ID</th><th>Form</th><th>Contact</th><th>Submitted data</th><th>Email</th><th>Date</th></tr></thead><tbody>{rows.map((row) => {
        const payload = typeof row.payload === "string" ? JSON.parse(row.payload) as Record<string, string | boolean> : row.payload;
        return <tr key={row.id}><td>#{row.id}</td><td><span className={`adminBadge ${row.form_type}`}>{titles[row.form_type] || row.form_type}</span></td><td><strong>{row.name || "—"}</strong><small>{row.email || ""}</small><small>{row.phone || ""}</small></td><td><details><summary>View all fields</summary><dl>{Object.entries(payload).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{String(value)}</dd></div>)}</dl></details></td><td><span className={row.email_sent ? "mailSent" : "mailPending"}>{row.email_sent ? "Sent" : "Not sent"}</span></td><td>{new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(row.created_at))}</td></tr>;
      })}</tbody></table></div>}
    </section>
  </main>;
}

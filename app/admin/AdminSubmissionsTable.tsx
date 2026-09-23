"use client";

import { Eye, X } from "lucide-react";
import { useRef, useState } from "react";

export type AdminSubmission = {
  id: number;
  formType: string;
  formTitle: string;
  name: string;
  email: string;
  phone: string;
  payload: Record<string, string | boolean>;
  sourcePage: string;
  emailSent: boolean;
  createdAt: string;
};

function fieldLabel(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/(\D)(\d+)/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^./, (letter) => letter.toUpperCase());
}

function formattedDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));
}

export default function AdminSubmissionsTable({ rows }: { rows: AdminSubmission[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<AdminSubmission | null>(null);

  function showDetails(row: AdminSubmission) {
    setSelected(row);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
    setSelected(null);
  }

  return <>
    <div className="adminTableWrap"><table><thead><tr><th>ID</th><th>Form</th><th>Contact</th><th>Submitted data</th><th>Email</th><th>Date</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.formType}-${row.id}`}>
      <td>#{row.id}</td>
      <td><span className={`adminBadge adminBadge-${row.formType}`}>{row.formTitle}</span></td>
      <td><strong>{row.name || "—"}</strong><small>{row.email}</small><small>{row.phone}</small></td>
      <td><button className="adminViewDetails" type="button" onClick={() => showDetails(row)}><Eye /> View all fields</button></td>
      <td><span className={row.emailSent ? "mailSent" : "mailPending"}>{row.emailSent ? "Sent" : "Not sent"}</span></td>
      <td>{formattedDate(row.createdAt)}</td>
    </tr>)}</tbody></table></div>
    <dialog className="adminSubmissionModal" ref={dialogRef} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      {selected && <div className="adminSubmissionModalCard">
        <header><div><span>{selected.formTitle}</span><h2>Submission #{selected.id}</h2><p>{formattedDate(selected.createdAt)}</p></div><button type="button" onClick={close} aria-label="Close submission details"><X /></button></header>
        <section className="adminSubmissionContact"><div><small>Name</small><strong>{selected.name || "—"}</strong></div><div><small>Email</small><strong>{selected.email || "—"}</strong></div><div><small>Phone</small><strong>{selected.phone || "—"}</strong></div></section>
        <section className="adminSubmissionFields">{Object.entries(selected.payload).filter(([key, value]) => key !== "website" && value !== "").map(([key, value]) => <div key={key}><dt>{fieldLabel(key)}</dt><dd>{typeof value === "boolean" ? (value ? "Yes" : "No") : value}</dd></div>)}</section>
        <footer><span>Source: {selected.sourcePage || "Website"}</span><button type="button" onClick={close}>Close</button></footer>
      </div>}
    </dialog>
  </>;
}

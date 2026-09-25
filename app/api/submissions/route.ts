import { headers } from "next/headers";
import { ensureSubmissionsTable, getDatabase } from "../../../lib/database";
import { sendSubmissionMail } from "../../../lib/mail";

export const runtime = "nodejs";

const requirements: Record<string, string[]> = {
  site_visit: ["name", "phone", "email"],
  contact: ["name", "phone", "email", "message"],
  agent: ["companyName", "companyType", "ownerName", "mobile", "officeAddress", "manager", "reraNumber"],
};

const submissionTables = {
  site_visit: "site_visit_submissions",
  contact: "contact_submissions",
  agent: "agent_registrations",
} as const;

function cleanFields(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const output: Record<string, string | boolean> = {};
  for (const [key, field] of Object.entries(value)) {
    if (!/^[a-zA-Z][a-zA-Z0-9_-]{0,49}$/.test(key)) continue;
    if (typeof field === "boolean") output[key] = field;
    else if (typeof field === "string") output[key] = field.trim().slice(0, 5000);
  }
  return output;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const formType = typeof body.formType === "string" ? body.formType : "";
    const fields = cleanFields(body.fields);
    if (!fields || !requirements[formType]) return Response.json({ error: "Invalid form submission." }, { status: 400 });
    if (typeof fields.website === "string" && fields.website) return Response.json({ ok: true });
    delete fields.website;
    for (const required of requirements[formType]) {
      if (!fields[required] || String(fields[required]).startsWith("Select ")) return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fields.email))) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });

    await ensureSubmissionsTable();
    const sourcePage = typeof body.sourcePage === "string" ? body.sourcePage.slice(0, 255) : null;
    let result: unknown;
    if (formType === "site_visit") {
      [result] = await getDatabase().execute(
        "INSERT INTO site_visit_submissions (name, phone, email, message, payload, source_page) VALUES (?, ?, ?, ?, ?, ?)",
        [fields.name, fields.phone, fields.email, fields.message || null, JSON.stringify(fields), sourcePage],
      );
    } else if (formType === "contact") {
      [result] = await getDatabase().execute(
        "INSERT INTO contact_submissions (name, email, phone, message, consent, payload, source_page) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [fields.name, fields.email, fields.phone, fields.message, fields.consent || null, JSON.stringify(fields), sourcePage],
      );
    } else {
      [result] = await getDatabase().execute(
        `INSERT INTO agent_registrations
          (company_name, company_type, owner_name, contact_name, mobile, office_address, manager, rera_number, agreement_1, agreement_2, agreement_3, agreement_4, agreement_5, payload, source_page)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fields.companyName, fields.companyType, fields.ownerName, fields.contactName || null, fields.mobile, fields.officeAddress, fields.manager, fields.reraNumber, fields.agreement1 || null, fields.agreement2 || null, fields.agreement3 || null, fields.agreement4 || null, fields.agreement5 || null, JSON.stringify(fields), sourcePage],
      );
    }
    const id = (result as { insertId: number }).insertId;
    let emailSent = false;
    try {
      await sendSubmissionMail(formType, fields);
      emailSent = true;
      await getDatabase().execute(`UPDATE ${submissionTables[formType as keyof typeof submissionTables]} SET email_sent = 1 WHERE id = ?`, [id]);
    } catch (mailError) {
      console.error("Submission saved but notification email failed", mailError);
    }
    const requestHeaders = await headers();
    console.info("Vedmaan form submission", { id, formType, emailSent, userAgent: requestHeaders.get("user-agent")?.slice(0, 120) });
    return Response.json({ ok: true, id });
  } catch (error) {
    console.error("Form submission failed", error);
    return Response.json({ error: "Submission could not be saved. Please try again." }, { status: 500 });
  }
}

export async function submitWebsiteForm(formType: "site_visit" | "contact" | "agent", form: HTMLFormElement) {
  const formData = new FormData(form);
  const fields: Record<string, string | boolean> = {};
  formData.forEach((value, key) => { if (typeof value === "string") fields[key] = value; });
  const response = await fetch("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, fields, sourcePage: window.location.pathname }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Unable to submit the form. Please try again.");
  return result;
}

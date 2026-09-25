import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions | Vedmaan Group", description: "Terms and conditions for using the Vedmaan Group website." };

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms & Conditions" intro="These terms apply when you access or use the Vedmaan Group website." sections={[
    { title: "Website use", body: ["The website and its content are provided for general information about Vedmaan Group, its projects and related services. You agree to use the website lawfully and only for legitimate enquiries.", "You must not attempt to disrupt the website, introduce harmful code, misuse a form, collect data without permission or gain unauthorised access to any account, server or system."] },
    { title: "Project information", body: ["Project details, availability, pricing, plans, specifications, distances, approvals and timelines displayed on the website are indicative and may change. Images and illustrations may be representative.", "Before making a decision, you should obtain the latest information directly from Vedmaan Group and independently verify it against applicable approvals, registrations, agreements and project documents."] },
    { title: "Enquiries and site visits", body: ["Submitting an enquiry or requesting a site visit records your interest and permits our team to respond. It does not reserve a property, confirm availability, fix a price or create an allotment or sale agreement.", "Site visits are subject to scheduling, access and confirmation by the Vedmaan team. Visitors remain responsible for following on-site safety and access instructions."] },
    { title: "Agent registrations", body: ["Submitting an agent-registration form does not automatically create an agency, partnership, employment or authority to represent Vedmaan Group.", "Empanelment remains subject to verification, company approval, applicable registrations and execution of the required agreement or memorandum of understanding."] },
    { title: "Communication", body: ["Where you provide contact details and consent, Vedmaan Group or its authorised representatives may contact you by telephone, SMS, email or WhatsApp in connection with your enquiry and relevant offerings. Communication preferences can be updated by contacting our team."] },
    { title: "Intellectual property", body: ["Unless otherwise stated, website text, branding, design, graphics and other original material belong to Vedmaan Group or are used with permission. They may not be copied, modified, republished or commercially used without prior written authorisation."] },
    { title: "External links", body: ["External links, maps and third-party services are provided for convenience. Vedmaan Group does not control and is not responsible for their availability, content, security or privacy practices."] },
    { title: "Limitation and availability", body: ["We aim to keep the website useful and available, but do not guarantee uninterrupted access or that every item of content will always be complete, current or error-free. To the extent permitted by law, use of the website and reliance on general website information is at the visitor's discretion."] },
    { title: "Changes and contact", body: ["Website content and these terms may be updated from time to time. The version displayed on this page applies from its stated update date.", "For questions about these terms, email info@vedmaangroup.com or call +91 83839 53751."] },
  ]} />;
}

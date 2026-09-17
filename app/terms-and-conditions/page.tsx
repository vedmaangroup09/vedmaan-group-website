import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions | Vedmaan Group", description: "Terms and conditions for using the Vedmaan Group website." };

export default function TermsPage() {
  return <LegalPage eyebrow="Legal" title="Terms & Conditions" intro="These terms apply when you access or use the Vedmaan Group website." sections={[
    { title: "Website use", body: ["The website and its content are provided for general information. You agree to use the website lawfully and not attempt to disrupt, damage or gain unauthorised access to it."] },
    { title: "Project information", body: ["Project details, availability, pricing, plans, specifications, distances and timelines should be independently verified with the company and applicable project documents before making a decision."] },
    { title: "Enquiries and registrations", body: ["Submitting a contact or agent-registration form does not create a booking, allotment, agency, partnership or other binding relationship. Agent empanelment remains subject to review, company approval and execution of the applicable agreement."] },
    { title: "Intellectual property", body: ["Unless otherwise stated, website text, branding, design and other original material belong to Vedmaan Group or are used with permission. They may not be reproduced or commercially used without authorisation."] },
    { title: "External links", body: ["External links are provided for convenience. Vedmaan Group is not responsible for the availability, content or practices of third-party websites."] },
    { title: "Changes", body: ["Website content and these terms may be updated from time to time. Continued use of the website after an update constitutes acceptance of the revised terms."] },
  ]} />;
}

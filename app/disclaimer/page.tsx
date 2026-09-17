import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = { title: "Disclaimer | Vedmaan Group", description: "Important information about content and imagery on the Vedmaan Group website." };

export default function DisclaimerPage() {
  return <LegalPage eyebrow="Legal" title="Disclaimer" intro="Please review these important notes before relying on information displayed on this website." sections={[
    { title: "Information purpose", body: ["The content provided on this website is for information purposes only and does not constitute an offer to avail any service. Prices mentioned are subject to change without notice, and the properties mentioned are subject to availability."] },
    { title: "Images and visuals", body: ["The images displayed on the website are for representation purposes only and may not reflect the actual properties. Images, layouts, plans, specifications and amenities should be verified against the applicable project documents."] },
    { title: "Independent verification", body: ["Visitors and prospective buyers should independently verify project approvals, registrations, availability, dimensions, location details, payment plans and other material information before making any purchase or investment decision."] },
    { title: "No professional advice", body: ["Nothing on this website should be treated as legal, financial, tax or investment advice. Seek advice from an appropriately qualified professional where required."] },
    { title: "External information", body: ["References to government initiatives, infrastructure or third-party destinations are informational and may change. Vedmaan Group does not control third-party websites or services linked from this website."] },
  ]} />;
}

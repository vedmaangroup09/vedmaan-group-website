import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = { title: "Disclaimer | Vedmaan Group", description: "Important information about content and imagery on the Vedmaan Group website." };

export default function DisclaimerPage() {
  return <LegalPage eyebrow="Legal" title="Disclaimer" intro="Please review these important notes before relying on information displayed on this website." sections={[
    { title: "Information purpose", body: ["The content provided on this website is for general information and does not constitute an offer, allotment, booking, contract or commitment to provide a property or service.", "Project availability, pricing, payment plans, specifications and timelines may change without prior notice and remain subject to confirmation by Vedmaan Group and the applicable documents."] },
    { title: "Images and visuals", body: ["Photographs, videos, renders, maps and other visuals may be used for representation or illustration. They may not reflect the current or final condition of a property, surrounding area, landscaping, furniture, infrastructure or view.", "Layouts, plans, dimensions, specifications and amenities should be verified against the latest sanctioned plans and applicable project documents."] },
    { title: "Project and location details", body: ["Distances, travel times, proposed roads, infrastructure references and nearby destinations are approximate or based on information available when the content was prepared. Actual conditions and routes may vary.", "References to proposed development do not amount to a guarantee regarding completion, timing or impact on a project."] },
    { title: "Independent verification", body: ["Visitors and prospective buyers should independently verify project approvals, registrations, title-related information, availability, dimensions, location details, payment plans and other material information before making any purchase or investment decision.", "Only duly executed agreements and official project documents should be relied upon for binding terms."] },
    { title: "No professional advice", body: ["Nothing on this website should be treated as legal, financial, tax or investment advice or as a promise of appreciation, return or future value. Seek advice from appropriately qualified professionals where required."] },
    { title: "Third-party information", body: ["References to government initiatives, infrastructure, media sources or third-party destinations are informational and may change. Vedmaan Group does not control third-party websites, maps or services linked from this website."] },
    { title: "Website availability", body: ["While reasonable care is taken when preparing website content, temporary errors, omissions or interruptions may occur. Vedmaan Group may update, replace or remove content at any time."] },
    { title: "Contact", body: ["For current project information or clarification about content displayed on this website, email info@vedmaangroup.com or call +91 83839 53751."] },
  ]} />;
}

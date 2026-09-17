import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy | Vedmaan Group", description: "Vedmaan Group privacy policy for website visitors and enquiries." };

export default function PrivacyPolicyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" intro="This policy explains how information submitted through the Vedmaan Group website may be collected and used." sections={[
    { title: "Information you provide", body: ["We may collect the information you enter in our contact, site-visit or agent-registration forms, including your name, phone number, email address, message, company details, office address, RERA registration number and uploaded documents."] },
    { title: "How information may be used", body: ["Information may be used to respond to enquiries, arrange site visits, review agent registrations, share requested project information and communicate relevant products, services, promotions or offers where consent has been provided."] },
    { title: "Sharing and protection", body: ["Information may be made available to authorised representatives or service providers where needed to handle your request. We take reasonable steps to protect submitted information, but no online transmission or storage method can be guaranteed as completely secure."] },
    { title: "Your choices", body: ["You may ask us to update your details or stop promotional communication by contacting the Vedmaan Group team. Essential responses connected with an active enquiry may still be sent."] },
    { title: "Third-party services", body: ["This website may use or link to third-party services, including maps and external websites. Their own privacy practices apply when you use those services."] },
    { title: "Contact", body: ["For questions about this policy or information submitted through the website, contact Vedmaan Group at +91 83839 53751."] },
  ]} />;
}

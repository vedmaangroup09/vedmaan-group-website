"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

const agreements = [
  "I agree to receive updates about Vedmaan projects, services, promotions, and special offers.",
  "I agree that submission of this form is not a legal admission of the Agent-Principal relationship.",
  "I agree that my empanelment as a real estate agent of Vedmaan is subject to the signing of the agreement and approval of the same by the company.",
  "I agree that I shall not give any presentations, documentation, receipts or agreements which are not authorised by the Company.",
  "I acknowledge that I am not authorised to issue any receipts or letterheads other than those directly issued from the Booking Control Department of the Company.",
];

export default function AgentRegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [accepted, setAccepted] = useState<boolean[]>(agreements.map(() => false));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) return <div className="agentSuccess" role="status"><span><Check /></span><h2>Registration received.</h2><p>Our channel relationship team will review the details and contact you.</p><button type="button" onClick={() => setSubmitted(false)}>Submit another registration</button></div>;

  return <form className="agentForm" onSubmit={submit}>
    <div className="agentFormGrid">
      <label>Company / Person Name*<input required name="companyName" /></label>
      <label>Company Type*<select name="companyType" defaultValue="Select Company Type"><option>Select Company Type</option></select></label>
      <label>Owner/Director Name*<input required name="ownerName" /></label>
      <label>Contact Person Name<input name="contactName" /></label>
      <label className="agentMobileField">Mobile Number*<span><input required name="mobile" inputMode="tel" autoComplete="tel" /><button type="button">Verify with OTP</button></span></label>
      <label>Office Address*<input required name="officeAddress" /></label>
      <label>Assisted By Vedmaan Relationship Manager*<select name="manager" defaultValue="Select Manager"><option>Select Manager</option></select></label>
      <label>Rera Registration Number*<input required name="reraNumber" /></label>
    </div>
    <fieldset className="agentAgreements"><legend>Declarations and consent</legend>{agreements.map((agreement, index) => <label key={agreement}><input required type="checkbox" checked={accepted[index]} onChange={(event) => setAccepted((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} /><span>{agreement}</span></label>)}<label className="agentAcceptAll"><input type="checkbox" checked={accepted.every(Boolean)} onChange={(event) => setAccepted(agreements.map(() => event.target.checked))} /><span>Accept All</span></label></fieldset>
    <p className="agentMouNote">* If there is any additional MoU Please Upload.</p>
    <button className="button gold agentSubmit">Submit <ArrowRight /></button>
  </form>;
}

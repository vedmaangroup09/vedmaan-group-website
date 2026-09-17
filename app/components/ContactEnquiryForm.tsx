"use client";

import { ArrowRight, Check, MessageSquareText } from "lucide-react";
import { FormEvent, useState } from "react";
import { submitWebsiteForm } from "../../lib/submit-form";

export default function ContactEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitWebsiteForm("contact", event.currentTarget);
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit the form.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return <div className="contactPageSuccess" role="status">
    <span><Check /></span>
    <p className="eyebrow"><i /> Enquiry received</p>
    <h2>Thank you for<br /><em>getting in touch.</em></h2>
    <p>Our team will connect with you shortly.</p>
    <button type="button" onClick={() => setSubmitted(false)}>Send another enquiry</button>
  </div>;

  return <form className="contactPageForm" onSubmit={submit}>
    <div className="contactPageFormHead"><span><MessageSquareText /></span><div><small>Contact Vedmaan</small><h2>Send us an enquiry</h2><p>Fill in your details and our team will contact you.</p></div></div>
    <div className="contactFormGrid">
      <label>Enter Name<input required name="name" autoComplete="name" placeholder="Enter Name" /></label>
      <label>Enter Email<input required type="email" name="email" autoComplete="email" placeholder="Enter Email" /></label>
      <label className="contactMessage">Enter Number<input required name="phone" autoComplete="tel" inputMode="tel" placeholder="Enter Number" /></label>
      <label className="contactMessage">Enter Message<textarea required name="message" rows={5} placeholder="Enter Message" /></label>
    </div>
    <label className="formHoneypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="contactConsentCheck"><input required name="consent" value="accepted" type="checkbox" defaultChecked /><span>I authorize company representatives to Call, SMS, Email or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.</span></label>
    {error && <p className="formSubmitError" role="alert">{error}</p>}
    <button className="button gold contactSubmit" disabled={loading}>{loading ? "Submitting..." : "Submit Now"} <ArrowRight /></button>
  </form>;
}

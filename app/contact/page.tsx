import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CalendarCheck, Clock3, Mail, MapPin, MessageCircle, Phone, Route, ShieldCheck } from "lucide-react";
import ContactEnquiryForm from "../components/ContactEnquiryForm";
import FloatingActions from "../components/FloatingActions";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact Vedmaan Group | Book a Site Visit",
  description: "Speak with Vedmaan Group about residential plots, project availability and private site visits in Jhajjar, Haryana.",
};

export default function ContactPage() {
  return <main className="contactPage">
    <SiteHeader />

    <section className="contactHero">
      <Image src="/assets/contact-consultation-hero.png" alt="A Vedmaan property advisor helping a couple understand their options" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
      <div className="contactHeroShade" />
      <div className="contactHeroCopy">
        <p className="eyebrow light"><span /> Connect with Vedmaan</p>
        <h1>Let&apos;s find your<br /><em>place for tomorrow.</em></h1>
        <p><span className="contactHeroDescriptionDesktop">From choosing the right project to arranging a private site visit, our property team is here to guide your next step.</span><span className="contactHeroDescriptionMobile">Get project guidance and book a private site visit.</span></p>
        <div><a className="button gold" href="tel:+918383953751">Call our team <Phone /></a><a href="#enquiry">Send an enquiry <ArrowRight /></a></div>
      </div>
      <div className="contactHeroCards"><span><b>8</b><small>Communities</small></span><span><b>Jhajjar</b><small>Haryana</small></span><span><b>Private</b><small>Site visits</small></span></div>
    </section>

    <section className="contactConnect" id="enquiry">
      <div className="contactConnectIntro">
        <p className="eyebrow"><span /> Start a conversation</p>
        <h2>Property guidance,<br /><em>made personal.</em></h2>
        <p>Tell us what matters to you. We will help you compare projects, understand current availability and arrange a guided visit.</p>
        <div className="contactDirectGrid">
          <a href="tel:+918383953751"><i><Phone /></i><span><small>Call the property desk</small><b>+91 83839 53751</b><em>Speak directly with our team</em></span><ArrowRight /></a>
          <a href="https://wa.me/918383953751" target="_blank" rel="noreferrer"><i><MessageCircle /></i><span><small>Chat on WhatsApp</small><b>Start a conversation</b><em>Share your project requirement</em></span><ArrowRight /></a>
          <a href="mailto:info@vedmaangroup.com"><i><Mail /></i><span><small>Email Vedmaan</small><b>info@vedmaangroup.com</b><em>Send your enquiry by email</em></span><ArrowRight /></a>
          <div><i><MapPin /></i><span><small>Visit our office</small><b>Jhajjar, Haryana</b><em>Meet our property advisors</em></span></div>
        </div>
      </div>
      <ContactEnquiryForm />
    </section>

    <section className="contactVisit">
      <div className="contactVisitImage contactVisitMap"><iframe title="Vedmaan Group location in Rohtak, Haryana" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55892.74399852038!2d76.61633495000001!3d28.88953605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85a5414251a5%3A0x9f011cc2777a4544!2sRohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1750850940727!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
    </section>

    <section className="contactAssurance">
      <div><p className="eyebrow light"><span /> What to expect</p><h2>Clear support at<br /><em>every step.</em></h2></div>
      <div className="contactAssuranceGrid"><article><ShieldCheck /><b>Verified information</b><p>Available project details and documentation explained clearly.</p></article><article><Clock3 /><b>Prompt response</b><p>A property advisor connects with you to understand your needs.</p></article><article><Route /><b>Guided project visit</b><p>See the location, access and community planning in person.</p></article><article><CalendarCheck /><b>Flexible scheduling</b><p>Plan your consultation and visit at a convenient time.</p></article></div>
    </section>

    <section className="projectsClosingCta contactClosing">
      <Image src="/assets/projects-family-cta.webp" alt="A family walking through a green Vedmaan community" fill sizes="100vw" />
      <div className="projectsClosingCopy"><h2>Your next address<br />starts with <em>a conversation.</em></h2><p>Speak with our team about availability, project details and site visits.</p></div>
      <a className="button gold" href="tel:+918383953751">Call Now <ArrowRight /></a>
    </section>

    <FloatingActions />
    <SiteFooter />
  </main>;
}

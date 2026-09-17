import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import AgentRegistrationForm from "../components/AgentRegistrationForm";
import FloatingActions from "../components/FloatingActions";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = { title: "Become Our Agent | Vedmaan Group", description: "Register to become a Vedmaan Group channel partner." };

export default function BecomeOurAgentPage() {
  return <main className="agentPage"><SiteHeader />
    <section className="innerPageHero agentHero"><div><p className="eyebrow light"><span /> Channel partner network</p><h1>Become our<br /><em>agent.</em></h1><p>At Vedmaan Group we work closely with our network of real estate agents to forge strategic business relationships that are mutually beneficial as well as future ready.</p></div></section>
    <section className="agentRegistration agentRegistrationFull"><div className="agentRegistrationIntro"><p className="eyebrow"><span /> Register with us</p><h2>Real Estate Agent <em>Empanelment Registration Form.</em></h2><p>Become a real estate agent and reap the benefits of attractive incentive scheme, marketing support, priority updates, training, invites to exclusive events and much more!</p><p>To complete your registration as a Vedmaan real estate agent please download the real estate agent empanelment form and upload the duly filled, signed and stamped form along with the documents required.</p><a href="tel:+918383953751">Help Desk No: +91 8383953751 <ArrowRight /></a></div><AgentRegistrationForm /></section>
    <FloatingActions /><SiteFooter />
  </main>;
}

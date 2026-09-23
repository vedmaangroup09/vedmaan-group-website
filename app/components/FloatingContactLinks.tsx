"use client";

import Image from "next/image";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function FloatingContactLinks() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return <>
    <a className="floatingWhatsApp" href="https://wa.me/918383953751" target="_blank" rel="noopener noreferrer" aria-label="Chat with Vedmaan Group on WhatsApp">
      <span><Image src="/assets/whatsapp-glyph-white.svg" alt="" width={28} height={28} unoptimized /></span>
    </a>
    <a className="floatingCall" href="tel:+918383953751" aria-label="Call Vedmaan Group">
      <span><Phone /></span>
    </a>
    <a className="floatingEnquire" href="/contact#enquiry" aria-label="Enquire now about a Vedmaan property">
      <span>Enquire Now</span><ArrowRight aria-hidden="true" />
    </a>
    {mounted && createPortal(<nav className="mobileContactBar" aria-label="Quick contact options">
      <a href="tel:+918383953751"><Phone aria-hidden="true" /><span>Call</span></a>
      <a href="https://wa.me/918383953751" target="_blank" rel="noopener noreferrer"><Image src="/assets/whatsapp-glyph-white.svg" alt="" width={24} height={24} unoptimized /><span>WhatsApp</span></a>
      <a href="/contact#enquiry"><MessageSquare aria-hidden="true" /><span>Enquire</span></a>
    </nav>, document.body)}
  </>;
}

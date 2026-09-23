import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";

export default function SiteFooter() {
  return <footer>
    <div className="footerMain">
      <div className="footerBrand"><Link href="/" aria-label="Vedmaan Group home"><Image src="/assets/header-logo-white.png" alt="Vedmaan Group" width={150} height={100} /></Link><p>Since 2015, Vedmaan Group has been creating thoughtfully planned communities in Haryana. With considered locations, practical infrastructure and open surroundings, we help turn land into an address with lasting value.</p><div><a href="tel:+918383953751" aria-label="Call Vedmaan Group"><Phone /></a><a href="https://wa.me/918383953751" target="_blank" rel="noopener noreferrer" aria-label="Chat with Vedmaan Group on WhatsApp"><Image src="/assets/whatsapp-glyph-white.svg" alt="" width={18} height={18} unoptimized /></a></div></div>
      <div><h4>Explore</h4><Link href="/about-vedmaan">About Vedmaan</Link><Link href="/projects">Projects</Link><Link href="/gallery">Gallery</Link><Link href="/news">News & Updates</Link><Link href="/contact">Contact</Link></div>
      <div className="footerOfferings"><h4>Featured projects</h4><Link href="/projects/south-city-1">South City 1</Link><Link href="/projects/south-city-2">South City 2</Link><Link href="/projects/dream-valley">Dream Valley</Link></div>
      <div className="footerVisit"><h4>Connect</h4><p>Experience the communities in person or grow with our channel network.</p><Link href="/contact#enquiry">Book a site visit <ChevronRight /></Link><Link href="/become-our-agent">Become our agent <ChevronRight /></Link></div>
    </div>
    <div className="footerBottom"><span>© 2026 Vedmaan Group. All rights reserved.</span><span>Agent RERA: RERA-RC/REP/HARERA</span><span><Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/terms-and-conditions">Terms</Link> · <Link href="/disclaimer">Disclaimer</Link></span></div>
  </footer>;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerState, setHeaderState] = useState<"top" | "visible" | "hidden">("top");

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let frame = 0;
    const update = () => {
      const currentY = Math.max(0, window.scrollY);
      if (currentY < 80) setHeaderState("top");
      else if (currentY < previousY) setHeaderState("visible");
      else if (currentY > previousY) { setHeaderState("hidden"); setMenuOpen(false); }
      previousY = currentY;
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    setHeaderState(previousY < 80 ? "top" : "visible");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  const close = () => setMenuOpen(false);
  return <>
    <div className="topbar">
      <span>RERA Registered Plotted Communities</span><span>Jhajjar, Haryana</span>
      <a href="tel:+918383953751"><Phone size={14} /> +91 83839 53751</a>
    </div>
    <header className={`header header-${headerState}${menuOpen ? " menu-active" : ""}`}>
      <Link className="brand" href="/" onClick={close}>
        <Image src={headerState === "visible" ? "/assets/footer-logo.png" : "/assets/header-logo-white.png"} alt="Vedmaan Group" width={132} height={96} priority />
      </Link>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <Link href="/about-vedmaan" onClick={close}>About Vedmaan</Link><Link href="/projects" onClick={close}>Projects</Link><Link href="/gallery" onClick={close}>Gallery</Link><Link href="/news" onClick={close}>News & Updates</Link><Link href="/become-our-agent" onClick={close}>Become Our Agent</Link><Link href="/contact" onClick={close}>Contact</Link>
        <Link className="navCta" href="/contact#enquiry" onClick={close}>Book a Site Visit <ArrowRight size={16} /></Link>
      </nav>
      <button className="menu" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
  </>;
}

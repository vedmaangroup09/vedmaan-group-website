"use client";

import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 320);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <>
    <button
      className={`backToTop${showTop ? " isVisible" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
    >
      <ArrowUp />
    </button>
    <a className="floatingCall" href="tel:+918383953751" aria-label="Call Vedmaan Group">
      <span><Phone /></span>
    </a>
  </>;
}

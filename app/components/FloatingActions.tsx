"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import FloatingContactLinks from "./FloatingContactLinks";

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
    <FloatingContactLinks />
  </>;
}

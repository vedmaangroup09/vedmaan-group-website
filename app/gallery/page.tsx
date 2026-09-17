"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Images, X } from "lucide-react";
import { useEffect, useState } from "react";
import FloatingActions from "../components/FloatingActions";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const galleryImages = [
  { src: "/assets/south-city-greens/official-entrance.webp", project: "South City 1", title: "Community entrance" },
  { src: "/assets/south-city-greens/official-jogging-track.webp", project: "South City 1", title: "Jogging track" },
  { src: "/assets/south-city-greens/official-park-play-area.webp", project: "South City 1", title: "Park and play area" },
  { src: "/assets/south-city-greens/official-sports-court.webp", project: "South City 1", title: "Sports court" },
  { src: "/assets/south-city-greens/community-centre.webp", project: "South City 1", title: "Community centre" },
  { src: "/assets/south-city-greens/community-court.webp", project: "South City 1", title: "Community court" },
  { src: "/assets/south-city-greens/community-walk.webp", project: "South City 1", title: "Community walkway" },
  { src: "/assets/south-city-greens/family-green.webp", project: "South City 1", title: "Green surroundings" },
  { src: "/assets/south-city-greens/gated-entry.webp", project: "South City 1", title: "Gated entry" },
  { src: "/assets/south-city-greens/green-overview.webp", project: "South City 1", title: "Community overview" },
  { src: "/assets/south-city-greens/green-walkway.webp", project: "South City 1", title: "Landscaped walkway" },
  { src: "/assets/south-city-greens/infrastructure-aerial.webp", project: "South City 1", title: "Infrastructure view" },
  ...Array.from({ length: 8 }, (_, index) => ({ src: `/assets/south-city-2-source/sc-${index + 1}.jpg`, project: "South City 2", title: `Project gallery ${String(index + 1).padStart(2, "0")}` })),
  { src: "/assets/dream-valley-source/dream-valley-banner-1.png", project: "Dream Valley", title: "Project entrance" },
  { src: "/assets/dream-valley-source/dream-valley-banner-2.png", project: "Dream Valley", title: "Project view" },
  ...Array.from({ length: 6 }, (_, index) => ({ src: `/assets/dream-valley-source/sector-gallery-${index + 1}.png`, project: "Dream Valley", title: `Site gallery ${String(index + 1).padStart(2, "0")}` })),
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const visibleImages = galleryImages;

  const move = (direction: number) => setSelected((current) => current === null ? null : (current + direction + visibleImages.length) % visibleImages.length);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [selected, visibleImages.length]);

  const activeImage = selected === null ? null : visibleImages[selected];

  return <main className="galleryPage">
    <SiteHeader />
    <div className="galleryPageTop" aria-hidden="true" />

    <section className="galleryArchive galleryArchiveSimple" aria-label="Project gallery">
      <div className="galleryArchiveGrid">
        {visibleImages.map((item, index) => <button type="button" className="galleryArchiveCard" onClick={() => setSelected(index)} key={item.src} aria-label={`Open ${item.project}: ${item.title}`}>
          <span className="galleryArchiveImage"><Image src={item.src} alt={`${item.project} — ${item.title}`} fill sizes="(max-width: 650px) 92vw, (max-width: 1000px) 46vw, 31vw" /><span className="galleryArchiveOverlay"><small>{item.project}</small><b>{item.title}</b><em>{String(index + 1).padStart(2, "0")}</em></span><i><Images /></i></span>
        </button>)}
      </div>
    </section>

    {activeImage && <div className="galleryLightbox" role="dialog" aria-modal="true" aria-label={`${activeImage.project}: ${activeImage.title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <button type="button" className="galleryLightboxClose" aria-label="Close image" onClick={() => setSelected(null)}><X /></button>
      <button type="button" className="galleryLightboxNav previous" aria-label="Previous image" onClick={() => move(-1)}><ArrowLeft /></button>
      <figure><div><Image src={activeImage.src} alt={`${activeImage.project} — ${activeImage.title}`} fill priority sizes="90vw" /></div><figcaption><span><small>{activeImage.project}</small><b>{activeImage.title}</b></span><em>{String((selected ?? 0) + 1).padStart(2, "0")} / {String(visibleImages.length).padStart(2, "0")}</em></figcaption></figure>
      <button type="button" className="galleryLightboxNav next" aria-label="Next image" onClick={() => move(1)}><ArrowRight /></button>
    </div>}

    <FloatingActions />
    <SiteFooter />
  </main>;
}

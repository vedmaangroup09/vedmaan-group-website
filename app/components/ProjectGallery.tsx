"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectGallery({ images, projectName }: { images: string[]; projectName: string }) {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    if (activeImage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowLeft") setActiveImage((activeImage - 1 + images.length) % images.length);
      if (event.key === "ArrowRight") setActiveImage((activeImage + 1) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, images.length]);

  return <>
    <div className="propertyGalleryGrid">
      {images.map((image, index) => <button type="button" onClick={() => setActiveImage(index)} aria-label={`Open ${projectName} gallery image ${index + 1}`} key={image}>
        <Image src={image} alt={`${projectName} project view ${index + 1}`} fill sizes="(max-width: 700px) 100vw, 33vw" />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </button>)}
    </div>
    {activeImage !== null && <div className="propertyGalleryModal" role="dialog" aria-modal="true" aria-label={`${projectName} image preview`} onClick={() => setActiveImage(null)}>
      <button className="propertyGalleryClose" type="button" onClick={() => setActiveImage(null)} aria-label="Close image preview"><X /></button>
      <button className="propertyGalleryNav previous" type="button" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage - 1 + images.length) % images.length); }} aria-label="Previous image"><ChevronLeft /></button>
      <div className="propertyGalleryModalImage" onClick={(event) => event.stopPropagation()}>
        <Image src={images[activeImage]} alt={`${projectName} project view ${activeImage + 1}`} fill sizes="92vw" priority />
        <small>{String(activeImage + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</small>
      </div>
      <button className="propertyGalleryNav next" type="button" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % images.length); }} aria-label="Next image"><ChevronRight /></button>
    </div>}
  </>;
}

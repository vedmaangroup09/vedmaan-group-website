"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const siteMotionTargets = [
  ".heroContent > *",
  ".heroFacts > *",
  ".intro > *",
  ".projectSectionHead > *",
  ".projectCard",
  ".landToLife > *",
  ".landToLifeGrid > *",
  ".experiencePanel > *",
  ".featureGrid > *",
  ".locationEditorial > *",
  ".locationRows > *",
  ".videoStory > *",
  ".insights > *",
  ".insightsGrid > *",
  ".galleryHead > *",
  ".galleryGrid > *",
  ".testimonyHead > *",
  ".testimonyTrack > article",
  ".contact > *",
  ".projectsHeroCopy > *",
  ".projectsLegacyCopy > *",
  ".projectsLegacyCollage",
  ".projectsLegacyValues > *",
  ".projectsCatalogueHead > *",
  ".projectsListingGrid > *",
  ".projectsAmenitiesIntro > *",
  ".projectsAmenitiesMarquee",
  ".projectsClosingCopy > *",
  ".projectsClosingCta > a",
  ".storyHeroCopy > *",
  ".storyOrigin > *",
  ".storyVision > *",
  ".storyTimelineTop > *",
  ".storyValuesHead > *",
  ".storyValuesGrid > *",
  ".storyApproach > *",
  ".contactHeroCopy > *",
  ".contactHeroCards > *",
  ".contactConnectIntro > *",
  ".contactConnect > *",
  ".contactVisitCopy > *",
  ".contactVisitMap",
  ".contactAssurance > *",
  ".contactAssuranceGrid > *",
  ".galleryPageHeroCopy > *",
  ".galleryArchiveHead > *",
  ".galleryFilters > *",
  ".galleryArchiveGrid > *",
  ".newsHero > div > *",
  ".newsArchiveHead > *",
  ".newsGrid > *",
  ".agentHero > div > *",
  ".agentSectionHead > *",
  ".agentBenefitGrid > *",
  ".agentRegistration > *",
  ".legalHero > div > *",
  ".legalContent article",
  ".notFound > *",
].join(",");

export default function SiteScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (!main || main.classList.contains("propertyPage")) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const elements = Array.from(main.querySelectorAll<HTMLElement>(siteMotionTargets));
    const uniqueElements = elements.filter((element, index) => elements.indexOf(element) === index);
    const variants = ["rise", "from-left", "from-right", "soft-scale"];

    main.classList.add("siteMotionReady");
    uniqueElements.forEach((element, index) => {
      element.dataset.siteMotion = variants[index % variants.length];
      element.style.setProperty("--site-motion-delay", `${(index % 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("isSiteMotionVisible");
          observer.unobserve(element);
          window.setTimeout(() => {
            element.classList.remove("isSiteMotionVisible");
            element.removeAttribute("data-site-motion");
            element.style.removeProperty("--site-motion-delay");
          }, 950);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    uniqueElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      main.classList.remove("siteMotionReady");
    };
  }, [pathname]);

  return null;
}

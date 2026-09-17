"use client";

import { useEffect } from "react";

const motionTargets = [
  ".propertyDetailHeroCopy > *",
  ".propertyHeroFacts > *",
  ".propertyExplore",
  ".propertyOverviewIntro > *",
  ".propertyOverviewVisual",
  ".propertyOverviewBenefits > *",
  ".southCityDevelopersIntro > *",
  ".southCityDeveloperTrack > *",
  ".propertyHighlightsBand > div:first-child > *",
  ".propertyHighlightSet:first-child > *",
  ".propertyPlanCopy > *",
  ".propertyPlanPanel",
  ".propertyPlanTabs > *",
  ".propertyAmenitiesIntro > *",
  ".propertyAmenitiesCollection > *",
  ".propertySectionHead > *",
  ".propertyPlotOptionGrid > *",
  ".propertyDocumentsIntro > *",
  ".propertyDocumentGrid > *",
  ".propertyProgressGrid > *",
  ".propertyProgressNote",
  ".propertyGalleryHead > *",
  ".propertyGalleryGrid > *",
  ".propertyConnectivityCopy > *",
  ".propertyConnectivityVisual",
  ".propertyConnectivityFacts > *",
  ".projectDestinationGrid > header",
  ".projectDestinationGrid > span",
  ".propertyInvestmentIntro > *",
  ".propertyInvestmentGrid > *",
  ".dreamValleyDdjayHead > *",
  ".dreamValleyDdjayGrid > *",
  ".propertyFaqIntro > *",
  ".propertyFaqList > *",
  ".projectsTestimony .testimonyHead > *",
  ".projectsTestimony .testimonyTrack > *",
  ".projectsTestimony .testimonyDots",
  ".projectsClosingCopy > *",
  ".projectsClosingCta > a",
].join(",");

export default function ProjectScrollMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".propertyPage");
    if (!page) return;

    const elements = Array.from(page.querySelectorAll<HTMLElement>(motionTargets));
    const uniqueElements = elements.filter((element, index) => elements.indexOf(element) === index);
    const variants = ["rise", "from-left", "from-right", "soft-scale"];

    page.classList.add("propertyMotionReady");
    uniqueElements.forEach((element, index) => {
      element.dataset.motion = variants[index % variants.length];
      element.style.setProperty("--motion-delay", `${Math.min(index % 5, 4) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("isMotionVisible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );

    uniqueElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}

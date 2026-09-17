"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Map, MapPinned, Route } from "lucide-react";
import { useState } from "react";

const dreamValleyTabs = [
  { label: "Site Layout", icon: Map, image: "/assets/dream-valley-source/dream-valley-Jhajjar-layout.png", alt: "Dream Valley site layout" },
  { label: "Jhajjar Master Plan", icon: MapPinned, image: "/assets/dream-valley-source/Master-Plan-Jhajjar.jpg", alt: "Jhajjar Master Plan 2031" },
  { label: "Location Map", icon: Route, image: "/assets/dream-valley-source/dream-valley-location-map.png", alt: "Dream Valley indicative location map from the project brochure" },
];

const southCityGreensTabs = [
  { label: "Site Layout", icon: Map, image: "/assets/south-city-greens/official-site-layout.png", alt: "South City Greens site layout plan" },
  { label: "Jhajjar Master Plan", icon: MapPinned, image: "/assets/south-city-greens/official-master-plan.webp", alt: "Jhajjar master plan showing Sector 36" },
];

const southCity2Tabs = [
  { label: "Site Layout", icon: Map, image: "/assets/south-city-2-source/south-city-2-site-plan-p1.jpg", alt: "South City 2 supplied site layout plan" },
  { label: "Project Location", icon: Route, image: "/assets/south-city-2-source/sc-2.jpg", alt: "South City 2 location at Sector 37, Jhajjar" },
];

type ProjectPlanningProps = {
  name: string;
  location: string;
  status: string;
  type: string;
  rera: string;
  image: string;
  secondary: string;
  isDreamValley: boolean;
  isSouthCityGreens?: boolean;
  isSouthCity2?: boolean;
};

export default function ProjectPlanning({ name, location, status, type, rera, image, secondary, isDreamValley, isSouthCityGreens = false, isSouthCity2 = false }: ProjectPlanningProps) {
  const [active, setActive] = useState(0);
  const tabs = isSouthCityGreens ? southCityGreensTabs : isDreamValley ? dreamValleyTabs : isSouthCity2 ? southCity2Tabs : [
    { label: "Community View", icon: Map, image: secondary, alt: `${name} community view` },
    { label: "Project View", icon: MapPinned, image, alt: `${name} project view` },
    { label: "Location Context", icon: Route, image: "/assets/map.webp", alt: `${name} location context` },
  ];
  const current = tabs[active];

  return <section className="propertyPlan propertyPlanBrochure">
    <div className="propertyPlanCopy">
      <p className="eyebrow"><span /> {isSouthCityGreens || isDreamValley || isSouthCity2 ? "Layout plan" : "Planning vision"}</p>
      <h2>{isSouthCityGreens ? <>Site layout <em>&amp; Jhajjar Master Plan.</em></> : isDreamValley ? <>Thoughtfully planned <em>for a superior living experience.</em></> : isSouthCity2 ? <>South City 2 <em>layout &amp; location.</em></> : <>A well-planned layout <em>for a better lifestyle.</em></>}</h2>
      <p>{isSouthCityGreens ? "19.99375 acres with 380 thoughtfully planned residential plots in Sector 36, Jhajjar." : isDreamValley ? "Total land area: 5.49375 acres. Number of plots: 92. Size of plots: 87.048 sq. mtr. to 145.623 sq. mtr." : isSouthCity2 ? "10.681 acres with 210 residential plots ranging from 90 to 180 sq. yd. in Sector 37, Jhajjar." : `A thoughtfully planned ${type.toLowerCase()} community in ${location}.`}</p>
      <div className="propertyPlanSpecs">{isSouthCityGreens ? <><span><small>Total land area</small><b>19.99375 Acres</b></span><span><small>Number of plots</small><b>380</b></span><span><small>Licence</small><b>84 of 2026</b></span><span><small>RERA</small><b>HRERA-PKL-JJR-949-2026</b></span></> : isDreamValley ? <><span><small>Total land area</small><b>5.49375 Acres</b></span><span><small>Number of plots</small><b>92</b></span><span><small>License</small><b>21 of 2026</b></span><span><small>RERA</small><b>HRERA-PKL-JJR-940-2026</b></span></> : isSouthCity2 ? <><span><small>Total land area</small><b>10.681 Acres</b></span><span><small>Number of plots</small><b>210</b></span><span><small>Plot sizes</small><b>90–180 sq. yd.</b></span><span><small>RERA</small><b>HRERA-PKL-JJR-637-2024</b></span></> : <><span><small>Location</small><b>{location}</b></span><span><small>Development type</small><b>{type}</b></span><span><small>Project status</small><b>{status}</b></span><span><small>RERA</small><b>{rera}</b></span></>}</div>
      <div className="propertyPlanActions"><Link className="button gold" href="/contact#enquiry">{isDreamValley ? "Apply now" : "Request project details"} <ArrowRight /></Link>{isSouthCityGreens ? <a className="propertyBrochureLink" href="/brochures/south-city-greens-brochure.pdf" download><Download /> Download brochure</a> : isDreamValley ? <a className="propertyBrochureLink" href="/brochures/dream-valley-brochure.pdf" download><Download /> Scheme brochure</a> : isSouthCity2 ? <a className="propertyBrochureLink" href="/brochures/south-city-2-documents/south-city-2-brochure.pdf" download><Download /> Download brochure</a> : <Link className="propertyBrochureLink" href="/contact#enquiry"><Download /> Request brochure</Link>}</div>
    </div>
    <div className="propertyPlanPanel">
      <div className={`propertyPlanTabs${isSouthCityGreens || isSouthCity2 ? " propertyPlanTabsTwo" : ""}`} role="tablist" aria-label={`${name} planning views`}>
        {tabs.map((tab, index) => { const Icon = tab.icon; return <button type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} key={tab.label}><Icon />{tab.label}</button>; })}
      </div>
      <div className="propertyPlanPanelBody">
        {isSouthCity2 && active === 1 ? <iframe className="propertyPlanMap" title="South City 2 location map" src="https://www.google.com/maps?q=28.5965833,76.62775&z=17&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div className="propertyPlanImage"><Image key={current.image} src={current.image} alt={current.alt} fill sizes="(max-width: 900px) 100vw, 48vw" /></div>}
      </div>
    </div>
  </section>;
}

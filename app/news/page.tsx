import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import FloatingActions from "../components/FloatingActions";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = { title: "News & Updates | Vedmaan Group", description: "News and updates about DDJAY, Haryana development and plotted housing." };

const updates = [
  { image: "/assets/news/ddjay.jpeg", label: "Housing policy", title: "What is Deen Dayal Jan Awas Yojna?", text: "An overview of Haryana's affordable plotted housing policy and its role in planned low- and medium-density colonies.", href: "/news/deen-dayal-jan-awas-yojna" },
  { image: "/assets/news/haryana-film-city.jpeg", label: "Regional development", title: "Haryana Film City – India’s New Cinema Destination in the Making", text: "A look at the proposed Film City initiative and the new development opportunities it may bring to Haryana.", href: "/news/haryana-film-city" },
  { image: "/assets/news/haryana-plot-schemes.jpeg", label: "Government schemes", title: "Haryana Government Plot Schemes 2025 – Apply for Legal Residential Plots in Prime Towns", text: "A guide to key government plot schemes and the affordable housing opportunities available to eligible buyers.", href: "/news/haryana-government-plot-schemes-2025" },
];

export default function NewsPage() {
  return <main className="newsPage"><SiteHeader />
    <section className="innerPageHero newsHero">
      <Image className="newsHeroImage" src="/assets/news/news-editorial-hero.png" alt="Property planning documents and infrastructure development updates" fill priority sizes="100vw" />
      <div className="newsHeroShade" />
      <div className="newsHeroCopy"><p className="eyebrow light"><span /> News & updates</p><h1>Ideas shaping<br /><em>tomorrow.</em></h1><p>Explore updates on plotted housing, government initiatives and emerging development across Haryana.</p></div>
    </section>
    <section className="newsArchive"><div className="newsArchiveHead"><p className="eyebrow"><span /> Latest updates</p><h2>Knowledge for<br /><em>better decisions.</em></h2><p>Clear perspectives on housing policy, public initiatives and the infrastructure shaping Haryana&apos;s next phase of growth.</p></div><div className="newsGrid">{updates.map((update, index) => <article key={update.title}><div className="newsImage"><Image src={update.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="newsCopy"><small>{update.label} · 0{index + 1}</small><h2>{update.title}</h2><p>{update.text}</p><a href={update.href}>Read article <ArrowUpRight /></a></div></article>)}</div></section>
    <FloatingActions /><SiteFooter />
  </main>;
}

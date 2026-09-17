import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export type LegalSection = { title: string; body: string[] };

export default function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return <main className="legalPage"><SiteHeader /><section className="innerPageHero legalHero"><div><p className="eyebrow light"><span /> {eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section><section className="legalContent"><aside><span>Vedmaan Group</span><b>{title}</b><small>Last updated: September 2026</small></aside><div>{sections.map((section, index) => <article key={section.title}><small>0{index + 1}</small><h2>{section.title}</h2>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}</div></section><SiteFooter /></main>;
}

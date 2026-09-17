import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Eye, Handshake, MapPin, Route, ShieldCheck, Target, TreePine, UsersRound } from "lucide-react";
import FloatingActions from "../components/FloatingActions";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const milestones = [
  { year: "2015", title: "The Beginning", text: "Vedmaan Group was founded with a clear vision.", image: "/assets/journey-milestone-1.webp" },
  { year: "2017", title: "First Project", text: "We launched our first thoughtfully planned plotted development.", image: "/assets/journey-milestone-2.webp" },
  { year: "2019", title: "Growing Trust", text: "More communities and more families became part of our journey.", image: "/assets/journey-milestone-3.webp" },
  { year: "2022", title: "Bigger Horizons", text: "Our presence grew through landmark developments in promising locations.", image: "/assets/journey-milestone-4.webp" },
  { year: "Today", title: "A Brighter Tomorrow", text: "We continue creating vibrant communities for generations ahead.", image: "/assets/dream-valley.webp" },
];

const values = [
  { Icon: ShieldCheck, title: "Trust in every detail", text: "Clear guidance, documented processes and dependable support at every step." },
  { Icon: TreePine, title: "Living close to nature", text: "Open surroundings and greener spaces designed into everyday community life." },
  { Icon: Route, title: "Planning with purpose", text: "Roads, access and infrastructure considered for comfort today and value tomorrow." },
  { Icon: UsersRound, title: "Communities that belong", text: "Places created around families, connections and a lasting sense of ownership." },
];

const approachProjects = [
  { name: "South City 1", location: "Sector 36, Jhajjar", image: "/assets/south-city.webp", tagline: "Modern living" },
  { name: "South City 2", location: "Sector 37, Jhajjar", image: "/assets/south-city-2-source/sc-2.jpg", tagline: "A gated affordable plotted colony under DDJAY" },
  { name: "Dream Valley", location: "Sector 7, Jhajjar", image: "/assets/dream-valley-source/dream-valley-banner-1.png", tagline: "A Valley of Dreams and Serenity" },
  { name: "Sector 27", location: "Sector 27, Jhajjar", image: "/assets/gallery-1.webp", tagline: "A new address" },
  { name: "South City 3", location: "Jhajjar, Haryana", image: "/assets/gallery-6.webp", tagline: "The next chapter" },
  { name: "South City 1 Extension", location: "Jhajjar, Haryana", image: "/assets/story-main.webp", tagline: "More room to grow" },
  { name: "Sector 1", location: "Sector 1, Pataudi", image: "/assets/gallery-2.webp", tagline: "A promising destination" },
  { name: "Sector 4", location: "Sector 4, Pataudi", image: "/assets/gallery-5.webp", tagline: "Designed for tomorrow" },
];

export default function OurStoryPage() {
  return <main className="storyPage">
    <SiteHeader />
    <section className="storyHero">
      <Image src="/assets/generated-highway-community.webp" alt="A thoughtfully planned green Vedmaan community" fill priority sizes="100vw" />
      <div className="storyHeroShade" />
      <div className="storyHeroCopy"><p className="eyebrow light"><span /> Our story</p><h1>Built on trust.<br /><em>Shaped for tomorrow.</em></h1><p>Since 2015, Vedmaan Group has been creating thoughtfully planned communities where land becomes a lasting address.</p><Link className="button gold" href="#our-journey">Discover our journey <ArrowRight /></Link></div>
      <div className="storyHeroNote"><span>More than land.</span><b>A legacy in the making.</b></div>
    </section>

    <section className="storyOrigin section" id="our-journey">
      <div className="storyOriginArt"><div className="storyOriginMain"><Image src="/assets/story-main.webp" alt="Vedmaan community boulevard" fill sizes="(max-width: 800px) 88vw, 43vw" /></div><div className="storyOriginSmall"><Image src="/assets/gallery-3.webp" alt="Landscaped community fountain" fill sizes="220px" /></div><div className="storyOriginYear"><strong>2015</strong><span>Where it began</span></div></div>
      <div className="storyOriginCopy"><p className="eyebrow"><span /> A clear beginning</p><h2>One vision.<br /><em>Many lasting addresses.</em></h2><p className="storyLead">Vedmaan began with a simple belief: good development starts by understanding how people want to live.</p><p>We bring together considered locations, practical infrastructure and open surroundings to create communities with meaning. Every project is guided by transparency, patient planning and long-term aspirations.</p><div className="storyOriginStats"><span><b>10+</b>Years of trust</span><span><b>08</b>Projects listed</span><span><b>02</b>Prime locations</span></div></div>
    </section>

    <section className="storyVision">
      <div className="storyVisionIntro"><p className="eyebrow light"><span /> What guides us</p><h2>A purpose that goes<br /><em>beyond the plot.</em></h2></div>
      <article><Eye /><span>01</span><h3>Our Vision</h3><p>To create trusted communities that make well-planned living accessible and rewarding for generations.</p></article>
      <article><Target /><span>02</span><h3>Our Mission</h3><p>To identify promising locations and develop transparent, connected spaces with lasting everyday value.</p></article>
      <article><Handshake /><span>03</span><h3>Our Promise</h3><p>To remain clear, responsible and present from the first conversation until an address becomes yours.</p></article>
    </section>

    <section className="storyTimeline section">
      <div className="storyTimelineTop"><div className="storyTimelineHead"><p className="eyebrow"><span /> Our journey</p><h2>A journey of<br /><em>growth and trust.</em></h2><p>From a bold vision in 2015 to thriving communities today, our journey has been shaped by trust, hard work and the belief that better living is possible for everyone.</p></div><div className="storyTimelineProject"><Image src="/assets/about-vedmaan-journey-project.webp" alt="Premium Vedmaan-style plotted community entrance" fill sizes="(max-width: 900px) 88vw, 48vw" /><span>More than just land.<br /><em>A better tomorrow.</em></span></div></div>
      <div className="storyJourneyPath"><svg className="storyJourneyLine" viewBox="0 0 1000 125" preserveAspectRatio="none" aria-hidden="true"><path className="storyJourneyTail storyJourneyTailFine" d="M0 55 C28 51 60 51 78 54" /><path className="storyJourneyTail storyJourneyTailMid" d="M76 54 C84 55 92 57 100 58" /><path className="storyJourneyMain" d="M100 58 C165 84 235 96 300 70 C365 44 435 11 500 24.5 C570 39 635 91 700 76.6 C770 61 840 48 900 58 C945 65 980 49 996 24" /><path className="storyJourneyCompanion" d="M0 62 C28 58 60 58 78 61 C86 62 94 64 100 65 C165 91 235 103 300 77 C365 51 435 18 500 31.5 C570 46 635 98 700 83.6 C770 68 840 55 900 65 C945 72 978 58 993 36" /><path className="storyJourneyArrow" d="M982 29 L996 24 L997 42" /></svg><svg className="storyJourneyFinish" viewBox="0 0 140 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 43 C42 43 79 39 108 24 L132 8 M132 8 L116 10 M132 8 L126 24" /></svg>{milestones.map((item, index) => <article key={item.year}><div className="storyJourneyImage"><Image src={item.image} alt="" fill sizes="100px" /></div><i /><b>{item.year}</b><div className="storyJourneyCard"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
    </section>

    <section className="storyValues section"><div className="storyValuesHead"><p className="eyebrow"><span /> The Vedmaan way</p><h2>Values seen in<br /><em>the way we build.</em></h2></div><div className="storyValuesGrid">{values.map(({ Icon, title, text }, index) => <article key={title}><div><span>0{index + 1}</span><Icon /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="storyApproach section">
      <div className="storyApproachCopy">
        <p className="eyebrow light"><span /> Our approach</p>
        <h2>Thoughtful planning.<br /><em>Lasting communities.</em></h2>
        <p className="storyApproachLead">From South City in Jhajjar to our growing portfolio of plots, residential and commercial properties, our focus stays the same: well-planned places that bring people, open spaces and everyday convenience together.</p>
        <div className="storyApproachPrinciples">
          {[
            { Icon: UsersRound, title: "People first", text: "Places planned around everyday family life." },
            { Icon: TreePine, title: "Greener spaces", text: "Landscaped surroundings with room to unwind." },
            { Icon: ShieldCheck, title: "Clear guidance", text: "Project information and support at every step." },
            { Icon: Route, title: "Purposeful planning", text: "Thoughtful access, roads and shared spaces." },
          ].map(({ Icon, title, text }) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="storyApproachFooter"><Link className="button gold" href="/projects">Explore projects <ArrowRight /></Link><span>People. Places. Possibilities.</span></div>
      </div>
      <div className="storyApproachVisual">
        <p className="storyApproachNote">Building more<br /><em>together.</em></p>
        {approachProjects.map((project, index) => <figure className="storyApproachPanel" key={project.name} style={{ animationDelay: `${index * -28}s` }}><Image src={project.image} alt={`${project.name}, ${project.location}`} fill unoptimized loading="eager" sizes="(max-width: 900px) 48vw, 24vw" /><figcaption><span>{project.tagline}</span><small>{project.name} · {project.location}</small></figcaption></figure>)}
      </div>
    </section>

    <section className="projectsClosingCta">
      <Image src="/assets/projects-family-cta.webp" alt="A family walking through a green Vedmaan community" fill sizes="100vw" />
      <div className="projectsClosingCopy"><h2>A brighter future<br />is <em>closer than you think.</em></h2><p>Schedule a private site visit and experience our communities firsthand.</p></div>
      <Link className="button gold" href="/contact#enquiry">Book a Site Visit <ArrowRight /></Link>
    </section>
    <FloatingActions /><SiteFooter />
  </main>;
}

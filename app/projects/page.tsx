"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Camera, Check, ChevronRight, Droplets, Dumbbell, GraduationCap, HeartPulse, Layers3, Lightbulb, MapPin, Phone, Play, Quote, Route, ShieldCheck, TreePine, Trees, UsersRound, Waves, Wifi, X } from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import FloatingActions from "../components/FloatingActions";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const projectList = [
  { slug: "south-city-1", name: "South City 1", location: "Sector 36, Jhajjar", city: "Jhajjar", status: "Completed", type: "Plots", image: "/assets/south-city.webp", rera: "HRERA-PKL-JJR-572-2024", tagline: "Where your legacy begins." },
  { slug: "south-city-2", name: "South City 2", location: "Sector 37, Jhajjar", city: "Jhajjar", status: "Completed", type: "Residential Plots", image: "/assets/south-city-2-source/sc-2.jpg", rera: "HRERA-PKL-JJR-637-2024", tagline: "A gated affordable plotted colony under DDJAY." },
  { slug: "dream-valley", name: "Dream Valley", location: "Sector 7, Jhajjar", city: "Jhajjar", status: "Ongoing", type: "Plots", image: "/assets/dream-valley-source/dream-valley-banner-1.png", rera: "HRERA-PKL-JJR-940-2026", tagline: "A Valley of Dreams and Serenity." },
  { slug: "sector-27", name: "Sector 27", location: "Sector 27, Jhajjar", city: "Jhajjar", status: "Upcoming", type: "Residential", image: "/assets/gallery-1.webp", rera: "Details on request", tagline: "A new address taking shape." },
  { slug: "south-city-3", name: "South City 3", location: "Jhajjar, Haryana", city: "Jhajjar", status: "Upcoming", type: "Plots", image: "/assets/gallery-6.webp", rera: "Details on request", tagline: "The next chapter of South City." },
  { slug: "south-city-1-extension", name: "South City 1 Extension", location: "Jhajjar, Haryana", city: "Jhajjar", status: "Upcoming", type: "Residential", image: "/assets/story-main.webp", rera: "Details on request", tagline: "More possibilities. Same trusted vision." },
  { slug: "sector-1-pataudi", name: "Sector 1", location: "Sector 1, Pataudi", city: "Pataudi", status: "Upcoming", type: "Plots", image: "/assets/gallery-2.webp", rera: "Details on request", tagline: "A promising new destination." },
  { slug: "sector-4-pataudi", name: "Sector 4", location: "Sector 4, Pataudi", city: "Pataudi", status: "Upcoming", type: "Residential", image: "/assets/gallery-5.webp", rera: "Details on request", tagline: "Designed for tomorrow." },
];

const filters = {
  type: ["All properties", "Plots", "Residential", "Commercial"],
  city: ["All locations", "Jhajjar", "Pataudi"],
};

const projectsHeroSlides = [
  { image: "/assets/south-city.webp", alt: "South City 1 community entrance" },
  { image: "/assets/south-city-2-source/sc-2.jpg", alt: "South City 2 project entrance" },
  { image: "/assets/dream-valley-source/dream-valley-banner-1.png", alt: "Dream Valley, Sector 7, Jhajjar" },
];

const amenityItems = [
  { label: "Wide Roads", Icon: Route },
  { label: "Parks & Green Spaces", Icon: Trees },
  { label: "Gated Communities", Icon: Building2 },
  { label: "Street Lighting", Icon: Lightbulb },
  { label: "Water Supply", Icon: Droplets },
  { label: "Nearby Schools & Hospitals", Icon: GraduationCap },
  { label: "24/7 Security", Icon: ShieldCheck },
  { label: "High-speed Connectivity", Icon: Wifi },
  { label: "Fitness Spaces", Icon: Dumbbell },
  { label: "CCTV Surveillance", Icon: Camera },
  { label: "Healthcare Access", Icon: HeartPulse },
  { label: "Recreation Zones", Icon: Waves },
];

const projectTestimonials = [
  { quote: "A truly impressive plotting project with a very promising location. The team explained everything clearly and patiently.", name: "Sukanya Yadav", details: "Google Review · 5 stars", image: "/assets/reviewer-sukanya-yadav.webp", rating: 5 },
  { quote: "The location is good and development around the project is clearly taking shape. Our site visit experience was excellent.", name: "Akash Awana", details: "Google Review · 5 stars", image: "/assets/reviewer-akash-awana.webp", rating: 5 },
  { quote: "I invested in this project and the developer service has been very good. My plot was allotted on time.", name: "Aman Tanwar", details: "Google Review · 5 stars", image: "/assets/reviewer-aman-tanwar.webp", rating: 5 },
  { quote: "Excellent project for investment in Sector 7, Jhajjar.", name: "Deep Thakur", details: "Google Review · 5 stars", image: "/assets/reviewer-deep-thakur.webp", rating: 5 },
  { quote: "Nice service, a well-planned township and guidance that felt like family.", name: "Verified Customer", details: "Google Review · 5 stars", image: "/assets/reviewer-google-1.webp", rating: 5 },
  { quote: "The project is well maintained, spacious and located in a promising area.", name: "Verified Customer", details: "Google Review · 5 stars", image: "/assets/reviewer-google-2.webp", rating: 5 },
  { quote: "I truly appreciate their customer service and attention to detail.", name: "Verified Customer", details: "Google Review · 5 stars", image: "/assets/reviewer-google-3.webp", rating: 5 },
  { quote: "Vedmaan Group is a trusted developer with a professional and supportive team.", name: "Ravi Kumar", details: "Google Review · 4 stars", image: "/assets/reviewer-ravi-kumar.webp", rating: 4 },
];

export default function ProjectsPage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [type, setType] = useState("All properties");
  const [city, setCity] = useState("All locations");

  const visibleProjects = useMemo(() => projectList.filter((project) =>
    (type === "All properties" || project.type === type) &&
    (city === "All locations" || project.city === city)
  ), [type, city]);

  const clearFilters = () => { setType("All properties"); setCity("All locations"); };

  useEffect(() => {
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % projectsHeroSlides.length), 4800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setTestimonialSlide((current) => (current + 1) % projectTestimonials.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!videoOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setVideoOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); };
  }, [videoOpen]);

  return (
    <main className="projectsPage">
      <SiteHeader />

      <section className="projectsHero">
        <div className="projectsHeroSlider">
          {projectsHeroSlides.map((slide, index) => <div className={`projectsHeroSlide${heroSlide === index ? " isActive" : ""}`} key={slide.image}><Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" /></div>)}
        </div>
        <div className="projectsHeroShade" />
        <div className="projectsHeroCopy">
          <p className="eyebrow light"><span /> Building a brighter tomorrow</p>
          <h1>Land that creates<br /><em>lasting value.</em></h1>
          <p><span className="projectsHeroDescriptionDesktop">Thoughtfully planned plotted communities where open surroundings, connected living and long-term possibilities come together.</span><span className="projectsHeroDescriptionMobile">Well-planned communities for better living and lasting value.</span></p>
          <div className="projectsHeroActions"><a className="button gold" href="#project-list-title">Explore communities <ArrowRight /></a><button className="projectsWatchVideo" type="button" onClick={() => setVideoOpen(true)}><span><Play fill="currentColor" /></span> Watch Video</button></div>
        </div>
      </section>

      <section className="projectsLegacy" aria-labelledby="projects-legacy-title">
        <div className="projectsLegacyCopy">
          <p className="eyebrow"><span /> Our purpose</p>
          <h2 id="projects-legacy-title">Communities<br /><span>built <em>for generations.</em></span></h2>
          <p>Founded in 2015, Vedmaan Group emerged with a clear vision — to create well-planned communities that offer modern living, natural surroundings and long-term value. We believe in developing spaces where people don&apos;t just live, but truly belong.</p>
          <Link className="button gold" href="/about-vedmaan">Know More About Us <ArrowRight /></Link>
        </div>
        <div className="projectsLegacyCollage">
          <div className="projectsLegacyMain"><Image src="/assets/story-main.webp" alt="Landscaped Vedmaan community road" fill sizes="(max-width: 800px) 84vw, 28vw" /></div>
          <div className="projectsLegacySmall"><Image src="/assets/hero.webp" alt="People walking through a green community" fill sizes="(max-width: 800px) 40vw, 14vw" /></div>
          <div className="projectsLegacyYear"><b>EST. 2015</b><span>Jhajjar, Haryana</span></div>
        </div>
        <div className="projectsLegacyValues">
          <article><TreePine /><div><h3>Green &amp; Healthy<br />Surroundings</h3></div></article>
          <article><Layers3 /><div><h3>Modern Infrastructure</h3></div></article>
          <article><UsersRound /><div><h3>Communities That Grow</h3></div></article>
          <article><BadgeCheck /><div><h3>Transparent &amp; Trustworthy</h3></div></article>
        </div>
      </section>



      {videoOpen && <div className="projectsVideoModal" role="dialog" aria-modal="true" aria-label="Vedmaan Group film" onMouseDown={(event) => { if (event.target === event.currentTarget) setVideoOpen(false); }}>
        <div className="projectsVideoDialog"><button type="button" className="projectsVideoClose" aria-label="Close video" onClick={() => setVideoOpen(false)}><X /></button><video autoPlay controls playsInline preload="metadata" poster="/assets/vedmaan-story-poster.webp"><source src="/assets/vedmaan-story-web.mp4" type="video/mp4" /></video><p>Vedmaan Group <span>Film 01</span></p></div>
      </div>}

      <section className="projectsCatalogue" aria-labelledby="project-list-title">

        <div className="projectsCatalogueHead">
          <div><p className="eyebrow"><span /> Discover Vedmaan</p><h2 id="project-list-title">A portfolio shaped<br /><em>around your future.</em></h2></div>
          <div><strong>{String(visibleProjects.length).padStart(2, "0")}</strong><span>Projects found</span>{(type !== "All properties" || city !== "All locations") && <button type="button" onClick={clearFilters}>Clear filters</button>}</div>
        </div>

        {visibleProjects.length ? <div className="projectsListingGrid">
          {visibleProjects.map((project, index) => <article className={`listingCard${project.status === "Upcoming" ? " listingCardUpcoming" : ""}`} key={project.name}>
            <div className="listingCardImage"><Image src={project.image} alt={project.name} fill sizes="(max-width: 760px) 90vw, 31vw" /><span className={`listingStatus ${project.status.toLowerCase()}`}>{project.status}</span><b>0{index + 1}</b></div>
            {project.status === "Upcoming" ? <div className="listingCardBody listingUpcomingBody"><h3>{project.name}</h3><span>Upcoming</span><Link href={`/projects/${project.slug}`}>View project <span><ArrowRight /></span></Link></div> : <div className="listingCardBody"><div className="listingLocation"><MapPin /> {project.location}<span>{project.type}</span></div><h3>{project.name}</h3><p>{project.tagline}</p><div className="listingRera"><span>RERA</span><b>{project.rera}</b></div><Link href={`/projects/${project.slug}`}>View project <span><ArrowRight /></span></Link></div>}
          </article>)}
        </div> : <div className="projectsEmpty"><Building2 /><h3>A tailored opportunity may be next.</h3><p>No currently listed project matches these filters. Speak with our team about upcoming commercial and residential opportunities.</p><Link href="/contact#enquiry">Talk to our team <ArrowRight /></Link></div>}
      </section>

      <section className="projectsAmenities" aria-labelledby="projects-amenities-title">
        <div className="projectsAmenitiesIntro">
          <p className="eyebrow"><span /> Modern living</p>
          <h2 id="projects-amenities-title">Amenities<br /><em>for a better life.</em></h2>
          <p>Wide roads, green spaces and essential conveniences—everything you need for a comfortable and connected lifestyle.</p>
        </div>
        <div className="projectsAmenitiesMarquee">
          <div className="projectsAmenitiesTrack">
            {[0, 1].map((copy) => <div className="projectsAmenitiesGroup" aria-hidden={copy === 1} key={copy}>
              {amenityItems.map(({ label, Icon }) => <article key={label}><Icon /><h3>{label}</h3></article>)}
            </div>)}
          </div>
        </div>
      </section>

      <section className="testimony projectsTestimony" aria-labelledby="projects-testimony-title">
        <div className="testimonyHead">
          <p className="eyebrow light"><span /> Testimonials</p>
          <h2 id="projects-testimony-title">What our<br /><em>community says.</em></h2>
          <p className="testimonyIntro">Real experiences from families and investors who chose Vedmaan communities.</p>
        </div>
        <div className="testimonyCarousel">
          <button className="testimonyArrow previous" type="button" aria-label="Previous testimonials" onClick={() => setTestimonialSlide((current) => (current - 1 + projectTestimonials.length) % projectTestimonials.length)}><ChevronRight /></button>
          <div className="testimonyViewport">
            <div className="testimonyTrack" style={{ "--testimony-desktop-shift": `calc(-${testimonialSlide * 33.333333}% - ${testimonialSlide * 6}px)`, "--testimony-mobile-shift": `calc(-${testimonialSlide * 100}% - ${testimonialSlide * 24}px)` } as CSSProperties}>
              {[...projectTestimonials, ...projectTestimonials.slice(0, 2)].map((item, itemIndex) => <article className={itemIndex === testimonialSlide ? "isFeatured" : ""} key={`${item.name}-${itemIndex}`}>
                <div className="testimonyCardTop"><Quote aria-hidden="true" /></div>
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <div className="testimonyProfile"><div className="testimonyAvatar"><Image src={item.image} alt="" fill sizes="46px" /></div><p><b>{item.name}</b><span>{item.details}</span></p><small aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</small></div>
              </article>)}
            </div>
          </div>
          <button className="testimonyArrow next" type="button" aria-label="Next testimonials" onClick={() => setTestimonialSlide((current) => (current + 1) % projectTestimonials.length)}><ChevronRight /></button>
        </div>
        <div className="testimonyDots" aria-label="Choose a testimonial">{projectTestimonials.map((item, index) => <button key={`${item.name}-${index}`} type="button" className={testimonialSlide === index ? "isActive" : ""} aria-label={`Show testimonial ${index + 1}`} onClick={() => setTestimonialSlide(index)} />)}</div>
      </section>

      <section className="projectsClosingCta">
        <Image src="/assets/projects-family-cta.webp" alt="A family walking through a green Vedmaan community" fill sizes="100vw" />
        <div className="projectsClosingCopy"><h2>A brighter future<br />is <em>closer than you think.</em></h2><p>Schedule a private site visit and experience our communities firsthand.</p></div>
        <Link className="button gold" href="/contact#enquiry">Book a Site Visit <ArrowRight /></Link>
      </section>

      <FloatingActions />
      <SiteFooter />
    </main>
  );
}

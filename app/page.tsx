"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Leaf,
  MapPin,
  Phone,
  Quote,
  Route,
  School,
  ShieldCheck,
  TrainFront,
  Trees,
} from "lucide-react";
import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const projects = [
  {
    slug: "south-city-1",
    name: "South City 1",
    sector: "Sector 36, Jhajjar",
    rera: "HRERA-PKL-JJR-572-2024",
    plan: "DDJAY",
    image: "/assets/south-city.webp",
    tag: "Completed",
    tagline: "Where your legacy begins.",
  },
  {
    slug: "south-city-2",
    name: "South City 2",
    sector: "Sector 37, Jhajjar",
    rera: "HRERA-PKL-JJR-637-2024",
    plan: "DDJAY",
    image: "/assets/south-city-2-source/sc-2.jpg",
    tag: "Completed",
    tagline: "A gated affordable plotted colony under DDJAY.",
  },
  {
    slug: "dream-valley",
    name: "Dream Valley",
    sector: "Sector 7, Jhajjar",
    rera: "HRERA-PKL-JJR-940-2026",
    plan: "40 : 60",
    image: "/assets/dream-valley-source/dream-valley-banner-1.png",
    tag: "Ongoing",
    tagline: "A Valley of Dreams and Serenity",
  },
  {
    slug: "sector-27",
    name: "Sector 27",
    sector: "Sector 27, Jhajjar",
    image: "/assets/gallery-1.webp",
    tag: "Upcoming",
    tagline: "A new address taking shape.",
  },
  {
    slug: "south-city-3",
    name: "South City 3",
    sector: "Jhajjar",
    image: "/assets/gallery-6.webp",
    tag: "Upcoming",
    tagline: "The next chapter of South City.",
  },
  {
    slug: "south-city-1-extension",
    name: "South City 1 Extension",
    sector: "Jhajjar",
    image: "/assets/story-main.webp",
    tag: "Upcoming",
    tagline: "More possibilities. Same trusted vision.",
  },
  {
    slug: "sector-1-pataudi",
    name: "Sector 1",
    sector: "Sector 1, Pataudi",
    image: "/assets/gallery-2.webp",
    tag: "Upcoming",
    tagline: "A promising new destination.",
  },
  {
    slug: "sector-4-pataudi",
    name: "Sector 4",
    sector: "Sector 4, Pataudi",
    image: "/assets/gallery-5.webp",
    tag: "Upcoming",
    tagline: "Designed for tomorrow.",
  },
];

const gallery = [
  "gallery-1.webp",
  "gallery-2.webp",
  "gallery-3.webp",
  "gallery-4.webp",
  "gallery-5.webp",
  "gallery-6.webp",
];

const heroSlides = [
  { image: "/assets/hero.webp", label: "Thoughtful living", position: "64% center" },
  { image: "/assets/dream-valley.webp", label: "Dream Valley", position: "center" },
  { image: "/assets/south-city.webp", label: "South City", position: "center" },
];

const locationSlides = [
  { image: "/assets/generated-connectivity-overview.webp", alt: "A peaceful community connected to the Gurugram urban skyline", caption: "Gurugram within reach" },
  { image: "/assets/generated-metro-living.webp", alt: "A green residential community with nearby metro access", caption: "Easy metro links" },
  { image: "/assets/generated-schools-workplaces.webp", alt: "A residential community close to a school and modern workplaces", caption: "Schools & workplaces" },
  { image: "/assets/generated-highway-gateway-v2.webp", alt: "A peaceful tree-lined residential community with a nearby highway flyover", caption: "Seamless highway access" },
];

type Testimonial = {
  quote: string;
  name: string;
  details: string;
  image?: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  { quote: "A truly impressive plotting project with a very promising location. The team was extremely supportive and explained everything clearly and patiently.", name: "Sukanya Yadav", details: "Google Review \u00b7 5 stars", image: "/assets/reviewer-sukanya-yadav.webp", rating: 5 },
  { quote: "\u0939\u093e\u0932 \u0939\u0940 \u092e\u0947\u0902 \u0907\u0938 \u092a\u094d\u0930\u094b\u091c\u0947\u0915\u094d\u091f \u0915\u0940 \u0938\u093e\u0907\u091f \u0935\u093f\u091c\u093f\u091f \u0915\u0940 \u0914\u0930 \u0935\u093f\u091c\u093f\u091f \u0915\u0947 \u0926\u094c\u0930\u093e\u0928 overall experience \u0915\u093e\u092b\u0940 \u0905\u091a\u094d\u091b\u093e \u0930\u0939\u093e\u0964 \u0932\u094b\u0915\u0947\u0936\u0928 \u0905\u091a\u094d\u091b\u0940 \u0932\u0917\u0940 \u0914\u0930 \u0906\u0938\u092a\u093e\u0938 \u0915\u093e development \u092d\u0940 \u0926\u0947\u0916\u0928\u0947 \u0915\u094b \u092e\u093f\u0932 \u0930\u0939\u093e \u0939\u0948\u0964", name: "Akash Awana", details: "Google Review \u00b7 5 stars", image: "/assets/reviewer-akash-awana.webp", rating: 5 },
  { quote: "I invested in this project and developer services is very good. Mujhe time pe plot allot kiya gaya.", name: "Aman Tanwar", details: "Google Review \u00b7 5 stars", image: "/assets/reviewer-aman-tanwar.webp", rating: 5 },
  { quote: "Excellent project for investment in Sector 7, Jhajjar.", name: "Deep Thakur", details: "Google Review \u00b7 5 stars", image: "/assets/reviewer-deep-thakur.webp", rating: 5 },
  { quote: "Nice service and very planned township and guide as family.", name: "Verified Customer", details: "Google Review \u00b7 5 stars", image: "/assets/reviewer-google-1.webp", rating: 5 },
  { quote: "The project is well maintained, spacious, and located in a promising area.", name: "Verified Customer", details: "Google Review \u00b7 5 stars", image: "/assets/reviewer-google-2.webp", rating: 5 },
  { quote: "I truly appreciate their customer service and attention to detail.", name: "Verified Customer", details: "Google Review \u00b7 5 stars", image: "/assets/reviewer-google-3.webp", rating: 5 },
  { quote: "Roof Builders and developers and Vedman Group are trusted developers.", name: "Ravi Kumar", details: "Google Review \u00b7 4 stars", image: "/assets/reviewer-ravi-kumar.webp", rating: 4 },
];

function PropertyDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className={`propertyDropdown${open ? " open" : ""}`}>
      <span className="propertyDropdownLabel">{label}</span>
      <button type="button" className="propertyDropdownTrigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{options.find((option) => option.value === value)?.label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open && (
        <div className="propertyDropdownMenu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button key={option.value} type="button" role="option" aria-selected={option.value === value} onClick={() => { onChange(option.value); setOpen(false); }}>
              <span>{option.label}</span>
              {option.value === value && <Check size={15} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AnimatedNumber({
  value,
  suffix = "",
  pad = 0,
}: {
  value: number;
  suffix?: string;
  pad?: number;
}) {
  const numberRef = useRef<HTMLElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;
    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplayValue(value);
          return;
        }
        const startedAt = performance.now();
        const duration = value > 100 ? 2200 : 1600;
        const animate = (time: number) => {
          const progress = Math.min((time - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.floor(value * eased));
          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <strong ref={numberRef} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{String(displayValue).padStart(pad, "0")}</span>
      {suffix && <sup aria-hidden="true">{suffix}</sup>}
    </strong>
  );
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [projectSlide, setProjectSlide] = useState(0);
  const [locationSlide, setLocationSlide] = useState(0);
  const [locationPaused, setLocationPaused] = useState(false);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const storyVideoRef = useRef<HTMLVideoElement>(null);
  const [propertyType, setPropertyType] = useState("Residential");
  const [transaction, setTransaction] = useState("Buy");
  const [searchCity, setSearchCity] = useState("");
  const [searchApplied, setSearchApplied] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const matchingProjects = projects.filter((project) =>
    (propertyType === "Residential" || propertyType === "Land") && transaction === "Buy" &&
    (!searchCity || project.sector.includes(searchCity))
  );
  const searchProperties = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVisibleProjects(matchingProjects);
    setProjectSlide(0);
    setSearchApplied(true);
    document.getElementById("projects")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  const [headerState, setHeaderState] = useState<"top" | "visible" | "hidden">(
    "top",
  );

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let frame = 0;
    const updateHeader = () => {
      const currentY = Math.max(0, window.scrollY);
      if (currentY < 80) {
        setHeaderState("top");
      } else if (currentY < previousY) {
        setHeaderState("visible");
      } else if (currentY > previousY) {
        setHeaderState("hidden");
      }
      previousY = currentY;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateHeader);
      }
    };
    setHeaderState(previousY < 80 ? "top" : "visible");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const slider = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % heroSlides.length),
      5500,
    );
    return () => window.clearInterval(slider);
  }, []);

  useEffect(() => {
    if (locationPaused) return;
    const slider = window.setInterval(
      () => setLocationSlide((current) => (current + 1) % locationSlides.length),
      5000,
    );
    return () => window.clearInterval(slider);
  }, [locationPaused]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialSlide((current) => (current + 1) % testimonials.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <SiteHeader />

      <section className="hero" id="home">
        <div className="heroSlider">
          {heroSlides.map((slide, index) => (
            <div
              className={`heroSlide${index === activeSlide ? " active" : ""}`}
              key={slide.image}
            >
              <Image
                src={slide.image}
                alt={`${slide.label} by Vedmaan Group`}
                fill
                priority
                sizes="100vw"
                style={{ objectPosition: slide.position }}
              />
            </div>
          ))}
        </div>
        <div className="heroShade" />
        <div className="heroOrnament" aria-hidden="true" />
        <div className="heroContent">
          <p className="eyebrow light">
            <span /> Building trust since 2015
          </p>
          <h1>
            Land that holds
            <br />
            <em>your legacy.</em>
          </h1>
          <p className="heroCopy">
            Thoughtfully planned plotted communities where open skies, green
            living and lasting value come together.
          </p>
          <div className="heroActions">
            <a className="button gold" href="#projects">
              Explore our projects <ArrowRight size={18} />
            </a>
            <a className="videoLink heroStoryLink" href="/about-vedmaan">
              Discover our story <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <a className="scroll" href="#about">
          <ArrowDown size={16} /> Scroll to discover
        </a>
      </section>

      <div className="heroFollowup">
      <form className="propertySearch" onSubmit={searchProperties} aria-label="Find a property">
        <div className="propertySearchFields">
          <PropertyDropdown label="Property type" value={propertyType} onChange={setPropertyType} options={["Residential", "Land", "Commercial", "Industrial"].map((value) => ({ label: value, value }))} />
          <PropertyDropdown label="Looking to" value={transaction} onChange={setTransaction} options={["Buy", "Rent"].map((value) => ({ label: value, value }))} />
          <PropertyDropdown label="Location" value={searchCity} onChange={setSearchCity} options={[{ label: "All locations", value: "" }, { label: "Jhajjar", value: "Jhajjar" }, { label: "Pataudi", value: "Pataudi" }]} />
          <div className="propertyBudget"><span>Budget</span><div>Price on enquiry</div></div>
          <button className="propertySearchSubmit" type="submit">Search properties <ArrowRight size={18} /></button>
        </div>
      </form>

      <section className="intro section" id="about">
        <div className="introTopNote">
          People <i /> Places <i /> Possibilities
        </div>
        <div className="introVertical">
          Building trust <span>·</span> Creating dreams
        </div>
        <div className="introArt reveal">
          <div className="introMain">
            <Image
              src="/assets/story-main.webp"
              alt="Green open spaces at Vedmaan"
              fill
              sizes="(max-width: 800px) 90vw, 42vw"
            />
          </div>
          <div className="introSmall">
            <Image
              src="/assets/story-small.webp"
              alt="Vedmaan community entrance"
              fill
              sizes="260px"
            />
          </div>
          <div className="introSmallSecond">
            <Image
              src="/assets/gallery-3.webp"
              alt="Landscaped community spaces at Vedmaan"
              fill
              sizes="260px"
            />
          </div>
          <div className="yearSeal">
            <strong>2015</strong>
            <span>Our journey began</span>
          </div>
          <p className="introArtCaption">
            <span /> More than land.
            <br />A brighter tomorrow.
          </p>
        </div>
        <div className="introCopy">
          <p className="eyebrow">
            <span /> The Vedmaan vision
          </p>
          <h2>
            We don’t just develop land.
            <em>We shape better living.</em>
          </h2>
          <p>
            Founded in 2015, Vedmaan Group emerged with a visionary goal — to
            build cities for people, not just buildings. We design spaces where
            clean air, quiet surroundings and nature meet modern amenities.
          </p>
          <div className="values">
            <div>
              <Leaf />
              <span>
                <b>Healthy, sustainable living</b>Green spaces, walkable
                neighbourhoods and modern convenience
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <b>Connected yet peaceful</b>Easy access to Gurugram, away from
                the chaos of the city
              </span>
            </div>
          </div>
          <a className="textLink" href="#experience">
            Read our complete story <ArrowRight size={17} />
          </a>
        </div>
      </section>

      </div>

      <section className="crossMarquee" aria-label="Vedmaan living values">
        <div className="crossMarqueeBand crossMarqueeBandOne" aria-hidden="true">
          <div className="crossMarqueeTrack">
            {[0, 1, 2, 3].map((copy) => (
              <div className="crossMarqueeCopy" key={copy}>
                <span>Thoughtful Living</span><i />
                <span>Plotted Communities</span><i />
                <span>Connected Locations</span><i />
                <span>Built on Trust</span><i />
              </div>
            ))}
          </div>
        </div>
        <div className="crossMarqueeBand crossMarqueeBandTwo" aria-hidden="true">
          <div className="crossMarqueeTrack">
            {[0, 1, 2, 3].map((copy) => (
              <div className="crossMarqueeCopy" key={copy}>
                <span>Jhajjar</span><i />
                <span>Open Spaces</span><i />
                <span>Lasting Value</span><i />
                <span>Better Tomorrows</span><i />
                <span>Trusted Since 2015</span><i />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <svg className="projectCurve projectCurveTop" viewBox="0 0 430 390" aria-hidden="true">
          <path d="M120 -20C120 91 137 157 211 208C267 247 341 263 430 286" />
          <path d="M120 -20C120 94 143 164 222 219C280 259 351 281 430 306" />
          <path d="M120 -20C120 98 151 174 237 232C295 272 360 301 430 327" />
          <path d="M120 -20C120 103 164 187 255 247C314 286 371 323 430 348" />
          <path d="M120 -20C120 110 181 203 278 263C335 299 383 346 430 369" />
        </svg>
        <svg className="projectCurve projectCurveBottom" viewBox="0 0 480 380" aria-hidden="true">
          <path d="M480 28C393 49 363 111 359 178C352 282 271 349 80 380" />
          <path d="M480 55C413 73 390 126 383 191C371 286 292 349 120 380" />
          <path d="M480 84C430 99 414 143 406 205C393 290 319 348 160 380" />
          <path d="M480 116C449 128 440 161 432 219C418 296 351 349 204 380" />
          <path d="M480 151C466 163 466 184 458 235C443 302 386 348 252 380" />
        </svg>
        <div className="projectMonogram" aria-hidden="true">
          Vedmaan<br />Group
        </div>
        <div className="sectionHead projectSectionHead">
          <div>
            <p className="eyebrow light">
              <span /> Our communities
            </p>
            <h2>
              Places designed to
              <br />
              <em>grow with you.</em>
            </h2>
          </div>
          <p>
            Explore plotted developments created for peaceful living, effortless
            connectivity and enduring value in Jhajjar’s most promising sectors.
          </p>
        </div>
        {searchApplied && <div className="propertySearchSummary" role="status"><span>{visibleProjects.length ? `${visibleProjects.length} matching projects` : "No listed projects match your search. Try another location or property type."}</span><button type="button" onClick={() => { setVisibleProjects(projects); setProjectSlide(0); setSearchApplied(false); setPropertyType("Residential"); setTransaction("Buy"); setSearchCity(""); }}>Clear search</button>{!visibleProjects.length && <a href="#contact">Ask our team <ArrowRight size={15} /></a>}</div>}
        <div className="projectSectionActions">
          <a className="button projectAllButton" href="/projects">
            View all projects <ArrowRight size={17} />
          </a>
          <div className={`projectSliderControls${visibleProjects.length <= 3 ? " fewProjects" : ""}`} hidden={!visibleProjects.length} aria-label="Project slider controls">
            <button
              type="button"
              aria-label="Previous projects"
              onClick={() => setProjectSlide((current) => (current - 1 + visibleProjects.length) % visibleProjects.length)}
            >
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              aria-label="Next projects"
              onClick={() => setProjectSlide((current) => (current + 1) % visibleProjects.length)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="projectViewport">
          <div
            className="projectGrid"
            style={{
              "--project-desktop-shift": `calc(-${projectSlide * 33.333333}% - ${projectSlide * 6.6667}px)`,
              "--project-mobile-shift": `calc(-${projectSlide * 100}% - ${projectSlide * 28}px)`,
            } as CSSProperties}
          >
          {(visibleProjects.length > 2 ? [...visibleProjects, ...visibleProjects.slice(0, 2)] : visibleProjects).map((project, index) => (
            <article className="projectCard" key={`${project.name}-${index}`}>
              <div className="projectImage">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  loading="eager"
                  sizes="(max-width: 800px) 90vw, 31vw"
                />
                <span className="projectIndex">0{index + 1}</span>
                <span className="projectTag">{project.tag}</span>
                <span className="projectImageCaption">
                  A brighter<br />tomorrow
                </span>
              </div>
              <div className="projectBody">
                <p className="projectLocation">
                  <MapPin size={17} strokeWidth={1.8} />
                  {project.sector}
                </p>
                <h3>{project.name}</h3>
                <p className="projectTagline">{project.tagline}</p>
                <div className="projectMeta">
                  <span>
                    Status <b>{project.tag}</b>
                  </span>
                  <span>
                    Location <b>{project.sector}</b>
                  </span>
                  <span>
                    Typology <b>Residential plots</b>
                  </span>
                </div>
                {project.rera && project.plan ? (
                  <small className="projectRera">RERA: {project.rera} · Plan: {project.plan}</small>
                ) : (
                  <small className="projectRera">Project details will be announced soon</small>
                )}
                <a href={`/projects/${project.slug}`}>
                  View project{" "}
                  <span>
                    <ArrowRight size={17} />
                  </span>
                </a>
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section className="landToLife section" aria-label="Vedmaan Group at a glance">
        <div className="legacyNumbers" aria-label="Vedmaan Group at a glance">
          <div className="legacyItem">
            <AnimatedNumber value={10} suffix="+" />
            <span>Years of trust</span>
          </div>
          <div className="legacyItem">
            <AnimatedNumber value={8} pad={2} />
            <span>Projects listed</span>
          </div>
          <div className="legacyItem">
            <AnimatedNumber value={2} pad={2} />
            <span>Prime locations</span>
          </div>
          <div className="legacyItem">
            <AnimatedNumber value={2015} />
            <span>Journey began</span>
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="experienceImage">
          <Image
            src="/assets/dream-valley-banner-1.webp"
            alt="Dream Valley entrance at sunset"
            fill
            sizes="100vw"
          />
        </div>
        <div className="experiencePanel">
          <p className="eyebrow light">
            <span /> The Vedmaan experience
          </p>
          <h2>
            Built around the way
            <br />
            <em>life should feel.</em>
          </h2>
          <div className="featureGrid">
            <div>
              <Trees />
              <b>Green by design</b>
              <span>Parks, tree-lined streets and breathing space.</span>
            </div>
            <div>
              <Compass />
              <b>Connected living</b>
              <span>Close to highways, work hubs and essentials.</span>
            </div>
            <div>
              <Building2 />
              <b>Planned infrastructure</b>
              <span>Wide roads, utilities and community spaces.</span>
            </div>
            <div>
              <ShieldCheck />
              <b>Secure investment</b>
              <span>RERA-registered developments with clarity.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="locationEditorial section">
        <div className="locationEditorialVisual" onMouseEnter={() => setLocationPaused(true)} onMouseLeave={() => setLocationPaused(false)}>
          <div className={`locationEditorialImage locationSlider${locationPaused ? " isPaused" : ""}`}>
            {locationSlides.map((slide, index) => (
              <Image
                key={slide.image}
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(max-width: 900px) 88vw, 52vw"
                className={`locationSlide${locationSlide === index ? " isActive" : ""}`}
              />
            ))}
            <div className="locationSliderMeta" aria-live="polite">
              <span>0{locationSlide + 1} / 0{locationSlides.length}</span>
              <strong>{locationSlides[locationSlide].caption}</strong>
            </div>
            <div className="locationSliderProgress" aria-hidden="true"><span key={locationSlide} /></div>
          </div>
          <p className="locationVisualNote"><span /> Close to the city. Closer to calm.</p>
        </div>
        <div className="locationEditorialCopy">
          <p className="eyebrow">
            <span /> Strategically located
          </p>
          <h2>
            Strategically located.
            <br />
            <em>Peacefully connected.</em>
          </h2>
          <p className="liveLocationCopy">
            Our projects are strategically located to offer seamless connectivity
            to major urban centers like Gurugram, yet far enough from the chaos to
            provide a peaceful, pollution-free environment.
          </p>
          <p>
            Positioned in Jhajjar’s growing urban corridor, our communities keep
            Gurugram, major highways, industrial hubs and everyday conveniences
            within easy reach.
          </p>
          <div className="locationRows" aria-label="Connectivity highlights from Vedmaan">
            <div><b>01</b><Building2 /><strong>Gurugram</strong><i>Major urban centre</i></div>
            <div><b>02</b><TrainFront /><strong>Metro Links</strong><i>Easy everyday access</i></div>
            <div><b>03</b><School /><strong>Schools &amp; Workplaces</strong><i>Thoughtfully connected</i></div>
            <div><b>04</b><Route /><strong>Major Highways</strong><i>Seamless connectivity</i></div>
          </div>
          <a className="button gold locationCta" href="#contact">
            Schedule a private site visit <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="videoStory section" aria-labelledby="video-story-title">
        <div className="videoStoryHead">
          <div>
            <p className="eyebrow"><span /> The Vedmaan story</p>
            <h2 id="video-story-title">See the vision.<br /><em>Feel the difference.</em></h2>
          </div>
          <p>Take a closer look at the people, places and purpose shaping every Vedmaan community.</p>
        </div>
        <div className="videoStoryFrame">
          <video ref={storyVideoRef} controls preload="metadata" poster="/assets/vedmaan-story-poster.webp" playsInline onPlay={() => setStoryPlaying(true)} onPause={() => setStoryPlaying(false)} onEnded={() => setStoryPlaying(false)}>
            <source src="/assets/vedmaan-story-web.mp4" type="video/mp4" />
            Your browser does not support the video element.
          </video>
          {!storyPlaying && (
            <button className="videoStoryPlay" type="button" aria-label="Play the Vedmaan story" onClick={() => storyVideoRef.current?.play()}>
              <span />
            </button>
          )}
          <span className="videoStoryIndex">Vedmaan Group&nbsp;&nbsp; / &nbsp;&nbsp;Film 01</span>
        </div>
      </section>

      <section className="insights section" aria-labelledby="insights-title">
        <div className="insightsHead">
          <div>
            <p className="eyebrow"><span /> Journal</p>
            <h2 id="insights-title">Ideas for better<br /><em>places to belong.</em></h2>
          </div>
          <p>Useful perspectives on plotted developments, location decisions and building long-term value.</p>
        </div>
        <div className="insightsGrid">
          {[
            { image: "/assets/news/ddjay.jpeg", category: "Housing policy", title: "What is Deen Dayal Jan Awas Yojna?", description: "An overview of Haryana's affordable plotted housing policy and its role in planned low- and medium-density colonies.", detail: "6 min read", href: "/news/deen-dayal-jan-awas-yojna" },
            { image: "/assets/news/haryana-film-city.jpeg", category: "Regional development", title: "Haryana Film City – India’s New Cinema Destination in the Making", description: "A look at the proposed Film City initiative and the new development opportunities it may bring to Haryana.", detail: "5 min read", href: "/news/haryana-film-city" },
            { image: "/assets/news/haryana-plot-schemes.jpeg", category: "Government schemes", title: "Haryana Government Plot Schemes 2025 – Apply for Legal Residential Plots in Prime Towns", description: "A guide to key government plot schemes and the affordable housing opportunities available to eligible buyers.", detail: "7 min read", href: "/news/haryana-government-plot-schemes-2025" },
          ].map((post, index) => (
            <article className="insightCard" key={post.title}>
              <a href={post.href} aria-label={`Read ${post.title}`}>
                <div className="insightImage">
                  <Image src={post.image} alt="" fill sizes="(max-width: 760px) 88vw, 31vw" />
                  <span>0{index + 1}</span>
                </div>
                <div className="insightMeta"><span>{post.category}</span><span>{post.detail}</span></div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="insightLink">Read insight <ArrowRight size={17} /></div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery section" id="gallery">
        <div className="galleryHead">
          <div>
            <p className="eyebrow">
              <span /> Life at Vedmaan
            </p>
            <h2>
              A glimpse of what
              <br />
              <em>we’re building.</em>
            </h2>
          </div>
          <a className="textLink" href="/gallery">
            Explore the gallery <ArrowRight size={17} />
          </a>
        </div>
        <div className="galleryGrid">
          {gallery.map((image, index) => (
            <div className={`galleryItem g${index + 1}`} key={image}>
              <Image
                src={`/assets/${image}`}
                alt={`Vedmaan community view ${index + 1}`}
                fill
                loading="eager"
                sizes="(max-width: 700px) 90vw, 45vw"
              />
              <span>0{index + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`testimony${testimonials.length === 1 ? " singleTestimony" : ""}`} aria-labelledby="testimony-title">
        <div className="testimonyHead">
          <p className="eyebrow light"><span /> Testimonials</p>
          <h2 id="testimony-title">What our<br /><em>community says.</em></h2>
          <p className="testimonyIntro">Real experiences from families and investors who chose Vedmaan communities.</p>
        </div>
        <div className="testimonyCarousel">
          <button className="testimonyArrow previous" type="button" aria-label="Previous testimonials" onClick={() => setTestimonialSlide((current) => (current - 1 + testimonials.length) % testimonials.length)}><ChevronRight /></button>
          <div className="testimonyViewport">
            <div className="testimonyTrack" style={{
              "--testimony-desktop-shift": `calc(-${testimonialSlide * 33.333333}% - ${testimonialSlide * 8}px)`,
              "--testimony-mobile-shift": `calc(-${testimonialSlide * 100}% - ${testimonialSlide * 24}px)`,
            } as CSSProperties}>
              {(testimonials.length === 1 ? testimonials : [...testimonials, ...testimonials.slice(0, 2)]).map((item, itemIndex) => {
                const index = itemIndex % testimonials.length;
                return (
                  <article className={itemIndex === testimonialSlide ? "isFeatured" : ""} key={`${item.name}-${itemIndex}`}>
                    <div className="testimonyCardTop"><Quote aria-hidden="true" /></div>
                    <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                    <div className="testimonyProfile">
                      {item.image && <div className="testimonyAvatar"><Image src={item.image} alt="" fill sizes="46px" /></div>}
                      <p><b>{item.name}</b><span>{item.details}</span></p>
                      <small aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</small>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <button className="testimonyArrow next" type="button" aria-label="Next testimonials" onClick={() => setTestimonialSlide((current) => (current + 1) % testimonials.length)}><ChevronRight /></button>
        </div>
        <div className="testimonyDots" aria-label="Choose a statement">
          {testimonials.map((item, index) => (
            <button key={`${item.name}-${index}`} type="button" className={testimonialSlide === index ? "isActive" : ""} aria-label={`Show statement ${index + 1}`} aria-pressed={testimonialSlide === index} onClick={() => setTestimonialSlide(index)} />
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contactCopy">
          <p className="eyebrow light">
            <span /> Begin your journey
          </p>
          <h2>
            Your future has
            <br />
            <em>a beautiful address.</em>
          </h2>
          <p>
            Tell us what you’re looking for. Our property advisor will help you
            find the right plot and arrange a personalised site visit.
          </p>
          <div className="contactDetails">
            <a href="tel:+918383953751">
              <span>
                <Phone />
              </span>
              <small>
                Call our property desk<b>+91 83839 53751</b>
              </small>
            </a>
            <div>
              <span>
                <MapPin />
              </span>
              <small>
                Visit our office<b>Jhajjar, Haryana</b>
              </small>
            </div>
          </div>
        </div>
        <form className="leadForm" onSubmit={submit}>
          {submitted ? (
            <div className="success">
              <span>
                <Check />
              </span>
              <h3>Thank you!</h3>
              <p>
                Your request has been noted in this preview. Live CRM
                integration will be connected before launch.
              </p>
              <button type="button" onClick={() => setSubmitted(false)}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <div className="formHeading">
                <span>Book a private site visit</span>
                <p>Our team will call you shortly.</p>
              </div>
              <label>
                Full name
                <input required name="name" placeholder="Enter your name" />
              </label>
              <div className="formRow">
                <label>
                  Phone number
                  <input
                    required
                    name="phone"
                    inputMode="numeric"
                    placeholder="+91 98765 43210"
                  />
                </label>
                <label>
                  Email address
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                  />
                </label>
              </div>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell us how we can help"
                  rows={3}
                />
              </label>
              <button className="button gold formButton">
                Request a callback <ArrowRight size={18} />
              </button>
              <small className="consent">
                <Check size={13} /> By submitting, you agree to receive project
                updates from Vedmaan Group.
              </small>
            </>
          )}
        </form>
      </section>

      <button
        className={`backToTop${headerState === "top" ? "" : " isVisible"}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}
      >
        <ArrowUp />
      </button>
      <a className="floatingCall" href="tel:+918383953751" aria-label="Call Vedmaan Group">
        <span><Phone /></span>
      </a>

      <SiteFooter />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Baby, Building2, BusFront, CarFront, ChartNoAxesCombined, Check, Download, Droplets, Dumbbell, Fence, Flower2, Footprints, GraduationCap, HeartPulse, House, Landmark, Leaf, MapPin, Plane, Route, ShieldCheck, TrainFront, Trees, Trophy, UsersRound, Waves, Waypoints } from "lucide-react";
import { notFound } from "next/navigation";
import FloatingActions from "../../components/FloatingActions";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ProjectPlanning from "../../components/ProjectPlanning";
import ProjectGallery from "../../components/ProjectGallery";
import ProjectScrollMotion from "../../components/ProjectScrollMotion";
import ProjectTestimonials from "../../components/ProjectTestimonials";

const properties = {
  "south-city-greens": { name: "South City Greens", location: "Sector 36, Jhajjar", status: "Upcoming", type: "Residential Plots", image: "/assets/south-city-greens/hero-community.webp", secondary: "/assets/south-city-greens/green-overview.webp", rera: "HRERA-PKL-JJR-949-2026", line: "Your legacy begins here.", description: "The largest single-licence plotted development in the district. Developed under the Deen Dayal Jan Awas Yojana (DDJAY) with DTCP Licence No. 84 of 2026." },
  "south-city-1": { name: "South City 1", location: "Sector 36, Jhajjar", status: "Completed", type: "Residential Plots", image: "/assets/south-city.webp", secondary: "/assets/gallery-3.webp", rera: "HRERA-PKL-JJR-572-2024", line: "Where your legacy begins.", description: "South City 1 is a delivered plotted community in Sector 36, Jhajjar, presented under the Deen Dayal Jan Awas Yojna." },
  "south-city-2": { name: "South City 2", location: "Sector 37, Jhajjar", status: "Completed", type: "Affordable Residential Plotted Colony", image: "/assets/south-city-2-source/sc-2.jpg", secondary: "/assets/south-city-2-source/sc-5.jpg", rera: "HRERA-PKL-JJR-637-2024", line: "A gated affordable plotted colony under DDJAY.", description: "South City 2 is an affordable residential plotted colony under DDJAY-2016 in Sector 37, Jhajjar." },
  "dream-valley": { name: "Dream Valley", location: "Sector 7, Jhajjar", status: "Ongoing", type: "Premium Residential Plots", image: "/assets/dream-valley-source/dream-valley-banner-1.png", secondary: "/assets/dream-valley-source/dream-valley-banner-2.png", rera: "HRERA-PKL-JJR-940-2026", line: "A Valley of Dreams and Serenity.", description: "More than just a plotted development, Dream Valley is a thoughtfully planned community designed for those who aspire to a better lifestyle." },
  "sector-27": { name: "Sector 27", location: "Sector 27, Jhajjar", status: "Upcoming", type: "Residential", image: "/assets/gallery-1.webp", secondary: "/assets/gallery-3.webp", rera: "Details on request", line: "A new address taking shape.", description: "An upcoming Vedmaan community envisioned around access, practical planning and enduring value." },
  "south-city-3": { name: "South City 3", location: "Jhajjar, Haryana", status: "Upcoming", type: "Residential Plots", image: "/assets/gallery-6.webp", secondary: "/assets/gallery-4.webp", rera: "Details on request", line: "The next chapter of South City.", description: "A future plotted destination designed to continue the trusted South City story in Jhajjar." },
  "south-city-1-extension": { name: "South City 1 Extension", location: "Jhajjar, Haryana", status: "Upcoming", type: "Residential", image: "/assets/story-main.webp", secondary: "/assets/gallery-3.webp", rera: "Details on request", line: "More possibilities. Same trusted vision.", description: "A considered extension of an established community, bringing new residential opportunities to a familiar address." },
  "sector-1-pataudi": { name: "Sector 1", location: "Sector 1, Pataudi", status: "Upcoming", type: "Residential Plots", image: "/assets/gallery-2.webp", secondary: "/assets/gallery-5.webp", rera: "Details on request", line: "A promising new destination.", description: "A plotted opportunity in Pataudi planned around future connectivity, open space and long-term potential." },
  "sector-4-pataudi": { name: "Sector 4", location: "Sector 4, Pataudi", status: "Upcoming", type: "Residential", image: "/assets/gallery-5.webp", secondary: "/assets/gallery-6.webp", rera: "Details on request", line: "Designed for tomorrow.", description: "A future-focused residential community conceived for peaceful living with easy access to the places that matter." },
} as const;

const projectGallery = [
  "/assets/gallery-1.webp",
  "/assets/gallery-2.webp",
  "/assets/gallery-3.webp",
  "/assets/gallery-4.webp",
  "/assets/gallery-5.webp",
  "/assets/gallery-6.webp",
  "/assets/dream-valley-banner-1.webp",
  "/assets/story-main.webp",
];

type PropertySlug = keyof typeof properties;

function getConnectivityIcon(place: string) {
  if (/airport/i.test(place)) return Plane;
  if (/railway/i.test(place)) return TrainFront;
  if (/bus stand/i.test(place)) return BusFront;
  if (/aiims|hospital|wcmsrh/i.test(place)) return HeartPulse;
  if (/school|college|institute|university|xlri|ganga institute/i.test(place)) return GraduationCap;
  if (/sanctuary/i.test(place)) return Trees;
  if (/expressway|highway|corridor|bypass/i.test(place)) return Route;
  if (/city|gurugram|bahadurgarh|rohtak|sonipat|manesar|industrial|met/i.test(place)) return Building2;
  return MapPin;
}

export function generateStaticParams() {
  return Object.keys(properties).map((slug) => ({ slug }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in properties)) notFound();
  const property = properties[slug as PropertySlug];
  const gallery = Array.from(new Set([property.image, property.secondary, ...projectGallery]));
  const heroSlides = [property.image, ...gallery.filter((image) => image !== property.image)].slice(0, 3);
  const isDreamValley = slug === "dream-valley";
  const isSouthCityGreens = slug === "south-city-greens" || slug === "south-city-1";
  const isSouthCity2 = slug === "south-city-2";

  if (property.status === "Upcoming") return <main className="propertyPage upcomingProjectPage">
    <SiteHeader />
    <section className="upcomingProjectHero">
      <div className="upcomingProjectGlow" />
      <p className="eyebrow light"><span /> Vedmaan Group</p>
      <h1>{property.name}</h1>
      <strong>Upcoming</strong>
      <Link href="/projects">Back to projects <ArrowRight /></Link>
    </section>
    <FloatingActions />
    <SiteFooter />
  </main>;
  const southCityGreensGallery = [
    "/assets/south-city-greens/official-park-play-area.webp",
    "/assets/south-city-greens/official-sports-court.webp",
    "/assets/south-city-greens/community-centre.webp",
    "/assets/south-city-greens/family-green.webp",
  ];
  const dreamValleyGallery = [
    "/assets/dream-valley-source/sector-gallery-1.png",
    "/assets/dream-valley-source/sector-gallery-2.png",
    "/assets/dream-valley-source/sector-gallery-3.png",
    "/assets/dream-valley-source/sector-gallery-4.png",
    "/assets/dream-valley-source/sector-gallery-5.png",
    "/assets/dream-valley-source/sector-gallery-6.png",
  ];
  const southCity2Gallery = Array.from({ length: 8 }, (_, index) => `/assets/south-city-2-source/sc-${index + 1}.jpg`);
  const propertyGalleryImages = isSouthCityGreens ? southCityGreensGallery : isDreamValley ? dreamValleyGallery : isSouthCity2 ? southCity2Gallery : gallery;
  const propertyHeroSlides = isSouthCityGreens ? [
    "/assets/south-city-greens/official-entrance.webp",
    "/assets/south-city-greens/green-overview.webp",
    "/assets/south-city-greens/green-walkway.webp",
  ] : isDreamValley ? [
    "/assets/dream-valley-source/dream-valley-banner-1.png",
    "/assets/dream-valley-source/dream-valley-banner-2.png",
    "/assets/dream-valley-source/banner-jhajjar-1.png",
  ] : isSouthCity2 ? [
    "/assets/south-city-2-source/sc-2.jpg",
    "/assets/south-city-2-source/sc-5.jpg",
    "/assets/south-city-2-source/sc-6.jpg",
  ] : heroSlides;
  const amenities = isSouthCityGreens ? [
    { title: "24/7 security", detail: "Round-the-clock vigilance", Icon: ShieldCheck },
    { title: "Wide roads", detail: "Comfortable internal movement", Icon: Waypoints },
    { title: "Water supply", detail: "Planned everyday water access", Icon: Droplets },
    { title: "Sewerage system", detail: "Essential underground infrastructure", Icon: Waves },
    { title: "Street lights", detail: "Well-lit community roads", Icon: Check },
    { title: "Parks & green area", detail: "Landscaped outdoor spaces", Icon: Trees },
    { title: "Electricity", detail: "Planned power infrastructure", Icon: Check },
    { title: "Gated community", detail: "Secure, self-contained living", Icon: Fence },
    { title: "Children play area", detail: "Dedicated space for young residents", Icon: Baby },
    { title: "CCTV surveillance", detail: "Additional community monitoring", Icon: ShieldCheck },
  ] : isDreamValley ? [
    { title: "Lush green parks", detail: "Open spaces to pause and breathe", Icon: Trees },
    { title: "24/7 security", detail: "Peace of mind around the clock", Icon: ShieldCheck },
    { title: "Kids play area", detail: "A joyful space for young explorers", Icon: Baby },
    { title: "Open gym", detail: "Everyday fitness in fresh air", Icon: Dumbbell },
    { title: "Park, Yoga & Meditation Garden", detail: "Open green space for wellness", Icon: Flower2 },
    { title: "Common facility area", detail: "A place for neighbours to connect", Icon: UsersRound },
    { title: "Sports court", detail: "Active recreation within the community", Icon: Trophy },
    { title: "Badminton court", detail: "Active recreation close to home", Icon: Trophy },
    { title: "Fresh water supply", detail: "Essential comfort, thoughtfully planned", Icon: Droplets },
    { title: "Jogging track", detail: "A healthier rhythm for every day", Icon: Footprints },
    { title: "Storm water & sewage system", detail: "Infrastructure made for every season", Icon: Waves },
    { title: "Gated complex", detail: "A private and considered community", Icon: Fence },
  ] : isSouthCity2 ? [
    { title: "Gated complex/community", detail: "", Icon: Fence },
    { title: "24×7 security", detail: "", Icon: ShieldCheck },
    { title: "Yoga and central lawn", detail: "", Icon: Flower2 },
    { title: "Jogging track", detail: "", Icon: Footprints },
    { title: "Kids play area", detail: "", Icon: Baby },
    { title: "Commercial space", detail: "", Icon: Building2 },
    { title: "Milk and vegetable booth", detail: "", Icon: House },
    { title: "Fresh water supply", detail: "", Icon: Droplets },
    { title: "Lush green multiple pockets", detail: "", Icon: Trees },
    { title: "Underground electricity lines", detail: "", Icon: Check },
    { title: "Wide internal roads", detail: "", Icon: Waypoints },
  ] : [
    { title: "Landscaped greens", detail: "Nature woven into everyday life", Icon: Trees },
    { title: "Walking spaces", detail: "Comfortable movement within the community", Icon: Footprints },
    { title: "Community areas", detail: "Places designed to bring people together", Icon: UsersRound },
    { title: "Street lighting", detail: "Well-lit surroundings after sunset", Icon: Check },
    { title: "Planned roads", detail: "Clear and convenient internal access", Icon: Waypoints },
    { title: "Secure environment", detail: "A considered setting for every family", Icon: ShieldCheck },
  ];

  return <main className="propertyPage">
    <ProjectScrollMotion />
    <SiteHeader />

    <section className="propertyDetailHero">
      <div className="propertyHeroSlides" aria-hidden="true">
        {propertyHeroSlides.map((image, index) => <Image key={image} src={image} alt="" fill priority={index === 0} loading={index === 0 ? undefined : "eager"} sizes="100vw" />)}
      </div>
      <div className="propertyDetailShade" />
      <div className="propertyDetailHeroCopy">
        <p className="propertyHeroLocation"><MapPin /> {property.location}</p>
        <h1>{property.name}</h1>
        <em>{property.line}</em>
        <p className="propertyHeroDescription">{property.description}</p>
        <div className="propertyHeroActions"><Link className="button gold" href="/contact#enquiry">Enquire now <ArrowRight /></Link>{(isDreamValley || isSouthCityGreens || isSouthCity2) && <a href={isSouthCityGreens ? "/brochures/south-city-greens-brochure.pdf" : isSouthCity2 ? "/brochures/south-city-2-documents/south-city-2-brochure.pdf" : "/brochures/dream-valley-brochure.pdf"} download>Brochure <Download /></a>}</div>
      </div>
      <div className="propertyHeroFacts">
        <span><MapPin /><small>Prime location</small><b>{property.location}</b></span>
        <span><Waypoints /><small>{isDreamValley || isSouthCityGreens || isSouthCity2 ? "Total land area" : "Project type"}</small><b>{isSouthCityGreens ? "19.99375 Acres" : isDreamValley ? "5.49375 Acres" : isSouthCity2 ? "10.681 Acres" : property.type}</b></span>
        <span><ShieldCheck /><small>{isDreamValley || isSouthCityGreens || isSouthCity2 ? "Residential plots" : "RERA status"}</small><b>{isSouthCityGreens ? "380 Plots" : isDreamValley ? "92 Plots" : isSouthCity2 ? "210 Plots" : property.rera}</b></span>
        <span><Check /><small>{isDreamValley || isSouthCityGreens || isSouthCity2 ? "Plot sizes" : "Current status"}</small><b>{isSouthCityGreens ? "90–180 sq. yd." : isDreamValley ? "87.048–145.623 sq. m." : isSouthCity2 ? "90–180 sq. yd." : property.status}</b></span>
      </div>
      <a href="#overview" className="propertyExplore">Explore the community <span>↓</span></a>
    </section>

    <section className="propertyOverview" id="overview">
      <div className="propertyOverviewIntro">
        <p className="eyebrow"><span /> About {property.name}</p>
        <h2>{isSouthCityGreens ? <>A foundation<br /><em>beyond question.</em></> : isDreamValley ? <>Welcome to<br /><em>Dream Valley.</em></> : isSouthCity2 ? <>About<br /><em>South City 2.</em></> : <>A community designed<br />for <em>a brighter tomorrow.</em></>}</h2>
        <div className="propertyOverviewCopy"><p>{property.description}</p><p>{isSouthCityGreens ? "South City Greens is twenty acres of that patience, laid out across Sector 36, Jhajjar: open space, real infrastructure, and a plotted community shaped for the long run." : isDreamValley ? "Located in the promising surroundings of Sector 7, Jhajjar, Dream Valley offers premium residential plots in a peaceful and well-connected location. Surrounded by open spaces and a serene environment, it combines comfort, convenience, and future growth." : isSouthCity2 ? "The experienced team understands the details involved in turning the dream of owning a plot into reality with comfort, creativity and originality. South City 2 is presented as an example of art and architecture with accuracy and perfection." : "Every detail reflects Vedmaan's focus on clear planning, connected locations and communities people can feel proud to call their own."}</p></div>
        <Link className="button gold propertyOverviewCtaDesktop" href="/contact#enquiry">Know more <ArrowRight /></Link>
      </div>
      <div className="propertyOverviewVisual"><Image src={property.secondary} alt={`${property.name} project view`} fill sizes="(max-width: 900px) 100vw, 38vw" /><span>{isSouthCityGreens ? <>Secure investment.<br /><em>Prime location.</em></> : isDreamValley ? <>Prime location.<br /><em>Well connected.</em></> : isSouthCity2 ? <>Gated community.<br /><em>Under DDJAY-2016.</em></> : <>Well planned.<br /><em>Better living.</em></>}</span></div>
      <div className="propertyOverviewBenefits">{isSouthCityGreens ? <><span><ShieldCheck /><b>Secure investment</b></span><span><Check /><b>Transparent process</b></span><span><ShieldCheck /><b>Government approved</b></span><span><MapPin /><b>Prime location</b></span><span><Waypoints /><b>Wide roads</b></span></> : isDreamValley ? <><span><ShieldCheck /><b>RERA approved</b></span><span><MapPin /><b>Bang on NH-352</b></span><span><Waypoints /><b>Well connected to major highways</b></span><span><Leaf /><b>Peaceful and serene environment</b></span><span><ChartNoAxesCombined /><b>Future growth</b></span></> : isSouthCity2 ? <><span><ShieldCheck /><b>RERA registered</b></span><span><MapPin /><b>Sector 37, Jhajjar</b></span><span><Waypoints /><b>State &amp; National Highways</b></span><span><Fence /><b>Gated plotted colony</b></span><span><House /><b>DDJAY-2016</b></span></> : <><span><Leaf /><b>A green &amp; healthy environment</b></span><span><House /><b>Modern infrastructure</b></span><span><ShieldCheck /><b>Secure gated community</b></span><span><MapPin /><b>Excellent connectivity</b></span><span><ChartNoAxesCombined /><b>High investment potential</b></span></>}</div>
      <Link className="button gold propertyOverviewMobileCta" href="/contact#enquiry">Know more <ArrowRight /></Link>
    </section>

    {isSouthCityGreens && <section className="southCityDevelopers" aria-labelledby="south-city-developers-title">
      <div className="southCityDevelopersIntro">
        <p className="eyebrow"><span /> A developer who delivers</p>
        <h2 id="south-city-developers-title">A legacy built,<br /><em>community by community.</em></h2>
        <div className="southCityDeveloperCopy">
          <p>Since 2005, the group behind South City Greens has grown from an infrastructure and logistics foundation into one of Delhi NCR&apos;s most trusted names in plotted development.</p>
          <p>Every address carries the same discipline: DTCP compliance, engineered infrastructure, and a handover that keeps its word.</p>
          <p>A portfolio built on roads, trunk infrastructure and institutional construction for names like NBCC, PWD Haryana, and East Coast Railway, brought home into every community the group builds.</p>
          <p>A track record built where South City Greens begins its next chapter.</p>
        </div>
        <div className="southCityDeveloperBrands">
          <div><Image src="/assets/south-city-greens/cellular-logo-black.png" alt="Cellular Realty" fill sizes="190px" /></div>
          <div><Image src="/assets/south-city-greens/vedmaan-logo-black.png" alt="Vedmaan Group" fill sizes="145px" /></div>
        </div>
      </div>
      <div className="southCityDeveloperTrack">
        <article><span>Delivered</span><div><h3>South City 1, Sector 36, Jhajjar</h3><p>172 plots · 9.6 acres</p></div></article>
        <article><span>Delivered</span><div><h3>Maruti Kunj, Sector 3, Farrukhnagar</h3><p>242 plots · 12.86 acres</p></div></article>
        <article><span>Ongoing</span><div><h3>South City 2, Sector 37, Jhajjar</h3><p>210 plots · 10.6 acres</p></div></article>
        <article><span>Upcoming</span><div><h3>South City Green, Sector 36, Jhajjar</h3><p>380 plots · 19.99 acres</p></div></article>
      </div>
    </section>}

    <section className="propertyHighlightsBand">
      <div><p className="eyebrow light"><span /> {isSouthCityGreens ? "Lifestyle" : "Highlights"}</p><h2>{isSouthCityGreens ? <>World-class<br /><em>amenities.</em></> : isDreamValley ? <>Strategic location.<br /><em>High growth corridor.</em></> : isSouthCity2 ? <>Thoughtfully planned.<br /><em>Essential amenities.</em></> : <>Better living.<br /><em>Well planned.</em></>}</h2></div>
      <div className="propertyHighlightTiles"><div className="propertyHighlightTrack">{[0, 1].map((copy) => <div className="propertyHighlightSet" aria-hidden={copy === 1} key={copy}>{isSouthCityGreens ? <><span><Fence /><b>Gated complex &amp; community</b></span><span><Waypoints /><b>Wide internal roads</b></span><span><Trees /><b>Lush green pockets</b></span><span><Baby /><b>Kids play area</b></span><span><ShieldCheck /><b>24×7 security</b></span></> : isDreamValley ? <><span><House /><b>Provides affordable residential plots</b></span><span><Trees /><b>Improves quality urban living</b></span><span><UsersRound /><b>Encourages private sector participation</b></span><span><Waypoints /><b>Controls unauthorized urban expansion</b></span><span><MapPin /><b>Strategic location, high growth corridor</b></span><span><ShieldCheck /><b>Secure &amp; smart future investment</b></span></> : isSouthCity2 ? <><span><Fence /><b>Gated complex/community</b></span><span><ShieldCheck /><b>24×7 security</b></span><span><Flower2 /><b>Yoga and central lawn</b></span><span><Footprints /><b>Jogging track</b></span><span><Trees /><b>Lush green multiple pockets</b></span><span><Waypoints /><b>Wide internal roads</b></span></> : <><span><Waypoints /><b>Wide internal roads</b><small>Easy everyday movement</small></span><span><Trees /><b>Lush green spaces</b><small>Calmer surroundings</small></span><span><ShieldCheck /><b>Gated planning</b><small>A considered community</small></span><span><Check /><b>Modern infrastructure</b><small>Made for daily life</small></span><span><MapPin /><b>Strategic location</b><small>Practical connectivity</small></span></>}</div>)}</div></div>
    </section>

    <ProjectPlanning name={property.name} location={property.location} status={property.status} type={property.type} rera={property.rera} image={property.image} secondary={property.secondary} isDreamValley={isDreamValley} isSouthCityGreens={isSouthCityGreens} isSouthCity2={isSouthCity2} />

    <section className="propertyPlotOptions">
      <div className="propertySectionHead"><p className="eyebrow"><span /> {isSouthCityGreens ? "South City Greens" : isDreamValley || isSouthCity2 ? "Project details" : "Plot options"}</p><h2>{isSouthCityGreens ? <>20 acres.<br /><em>380 exclusive plots.</em></> : isDreamValley ? <>5.49375 acres.<br /><em>92 residential plots.</em></> : isSouthCity2 ? <>10.681 acres.<br /><em>210 residential plots.</em></> : <>Choose the space<br /><em>that fits your future.</em></>}</h2></div>
      <div className="propertyPlotOptionGrid">
        <article><small>Starting plot size</small><b>{isSouthCityGreens || isSouthCity2 ? "90" : isDreamValley ? "87.048" : "On request"}</b><span>{isSouthCityGreens || isSouthCity2 ? "sq. yd." : isDreamValley ? "sq. m." : "Project details"}</span></article>
        <article><small>Largest plot size</small><b>{isSouthCityGreens || isSouthCity2 ? "180" : isDreamValley ? "145.623" : "On request"}</b><span>{isSouthCityGreens || isSouthCity2 ? "sq. yd." : isDreamValley ? "sq. m." : "Project details"}</span></article>
        <article><small>Development type</small><b>{property.type}</b><span>{isSouthCityGreens ? "DDJAY" : "Thoughtfully planned"}</span></article>
        <article className="propertyAvailability"><small>{isSouthCityGreens || isDreamValley || isSouthCity2 ? "Project status" : "Current availability"}</small><b>{isSouthCityGreens ? "Upcoming" : isDreamValley ? "Ongoing" : isSouthCity2 ? "RERA Registered" : "On request"}</b><span>{isSouthCityGreens ? "Sector 36, Jhajjar" : isDreamValley ? "Sector 7, Jhajjar" : isSouthCity2 ? "Sector 37, Jhajjar" : "Speak with our project team"}</span><Link href="/contact#enquiry">{isSouthCityGreens || isDreamValley || isSouthCity2 ? "Enquire now" : "Check availability"} <ArrowRight /></Link></article>
      </div>
    </section>

    <section className="propertyDocuments">
      <div className="propertyDocumentsIntro"><p className="eyebrow light"><span /> {isDreamValley ? "Download section" : "Project documents"}</p><h2>{isSouthCityGreens ? <>Project<br /><em>documents.</em></> : isDreamValley ? <>Approved scheme<br /><em>documents.</em></> : isSouthCity2 ? <>South City 2<br /><em>documents.</em></> : <>Clear details.<br /><em>Confident decisions.</em></>}</h2><p>{isSouthCityGreens ? "Project RERA, Project Licence, Project Brochure, Payment Plan and Site Layout Plan." : isDreamValley ? "Scheme Brochure, Scheme RERA, Scheme Licence, Payment Plan and Site Plan." : isSouthCity2 ? "Project Brochure, RERA Certificate, Site Plan and Payment Plan supplied for South City 2." : "Review the essential approvals and project information before you plan your visit."}</p></div>
      <div className={`propertyDocumentGrid${isSouthCityGreens || isDreamValley ? " propertyDocumentGridFive" : ""}`}>
        {isSouthCityGreens ? <>
          <article><ShieldCheck /><span><small>Project document</small><b>Project RERA</b></span><a href="/brochures/south-city-greens-documents/rera-certificate.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Check /><span><small>Project document</small><b>Project Licence</b></span><a href="/brochures/south-city-greens-documents/tcp-license.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Download /><span><small>Project document</small><b>Project Brochure</b></span><a href="/brochures/south-city-greens-documents/project-brochure.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Download /><span><small>Project document</small><b>Payment Plan</b></span><a href="/brochures/south-city-greens-documents/payment-plan.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Waypoints /><span><small>Project document</small><b>Site Layout Plan</b></span><a href="/brochures/south-city-greens-documents/site-layout.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
        </> : isDreamValley ? <>
          <article><Download /><span><small>Approved</small><b>Scheme Brochure</b></span><a href="/brochures/dream-valley-brochure.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><ShieldCheck /><span><small>Approved</small><b>Scheme RERA</b></span><a href="/brochures/dream-valley-documents/dream-valley-RERA.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Check /><span><small>Approved</small><b>Scheme Licence</b></span><a href="/brochures/dream-valley-documents/dream-valley-liscense.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Download /><span><small>Approved</small><b>Payment Plan</b></span><a href="/brochures/dream-valley-documents/dream-valley-payment-plan.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Waypoints /><span><small>Approved</small><b>Site Plan</b></span><a href="/brochures/dream-valley-documents/dream-valley-site-layout.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
        </> : isSouthCity2 ? <>
          <article><Download /><span><small>Supplied document</small><b>Project Brochure</b></span><a href="/brochures/south-city-2-documents/south-city-2-brochure.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><ShieldCheck /><span><small>Supplied document</small><b>Project RERA</b></span><a href="/brochures/south-city-2-documents/south-city-2-rera.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Waypoints /><span><small>Supplied document</small><b>Site Plan</b></span><a href="/brochures/south-city-2-documents/south-city-2-site-plan.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
          <article><Download /><span><small>Supplied document</small><b>Payment Plan</b></span><a href="/brochures/south-city-2-documents/south-city-2-payment-plan.pdf" target="_blank" rel="noreferrer">View <ArrowRight /></a></article>
        </> : <>
          <article><ShieldCheck /><span><small>RERA registration</small><b>{property.rera}</b></span></article>
          <article><Check /><span><small>Licence</small><b>{isDreamValley ? "21 of 2026" : "Details on request"}</b></span></article>
          <article><Waypoints /><span><small>Project plan</small><b>{isDreamValley ? "Approved layout views" : "Available on request"}</b></span><a href={isDreamValley ? "/assets/dream-valley-site-layout.webp" : "/contact#enquiry"} download={isDreamValley || undefined}>View <ArrowRight /></a></article>
          <article><Download /><span><small>Project brochure</small><b>{isDreamValley ? "Dream Valley brochure" : "Request details"}</b></span><a href={isDreamValley ? "/brochures/dream-valley-brochure.pdf" : "/contact#enquiry"} download={isDreamValley || undefined}>{isDreamValley ? "Download" : "Request"} <ArrowRight /></a></article>
        </>}
      </div>
    </section>

    <section className="propertyAmenitiesBand" id="amenities">
      <div className="propertyAmenitiesIntro">
        <p className="eyebrow light"><span /> {isSouthCityGreens ? "Lifestyle" : isDreamValley || isSouthCity2 ? "Amenities" : "Everyday experience"}</p>
        <h2>{isSouthCityGreens ? <>World-class<br /><em>amenities.</em></> : isDreamValley ? <>Luxury amenities<br /><em>that redefine comfort.</em></> : isSouthCity2 ? <>Amenities at<br /><em>South City 2.</em></> : <>Spaces for<br /><em>a better everyday.</em></>}</h2>
        <p>{isSouthCityGreens ? "Every detail here is designed to disappear into the ease of daily life." : isDreamValley ? "Thoughtfully planned amenities for a superior living experience." : isSouthCity2 ? "Gated planning, green pockets and essential infrastructure listed in the supplied project brochure." : "Thoughtful amenities that make daily life healthier, easier and more connected."}</p>
      </div>
      <div className="propertyAmenitiesCollection">
        {amenities.map(({ title, detail, Icon }) => <article key={title}>
          <i><Icon /></i>
          <div><b>{title}</b>{!isSouthCityGreens && !isDreamValley && !isSouthCity2 && <small>{detail}</small>}</div>
        </article>)}
      </div>
    </section>

    <section className="propertyProgress">
      <div className="propertySectionHead propertyProgressHead"><p className="eyebrow"><span /> {isSouthCityGreens ? "South City Greens" : isDreamValley ? "Dream Valley" : isSouthCity2 ? "South City 2" : "Development progress"}</p><h2>{isSouthCityGreens ? <>An endless<br /><em>unfolding green.</em></> : isDreamValley ? <>Connected to growth.<br /><em>Designed for the future.</em></> : isSouthCity2 ? <>Project<br /><em>gallery views.</em></> : <>A community<br /><em>taking shape.</em></>}</h2><p>{isSouthCityGreens ? "Twenty acres, and greenery threaded through every one of them—not fenced off as a feature, but woven in as a way of life." : isDreamValley ? "Experience the advantage of a well-planned and fast-growing corridor." : isSouthCity2 ? "Current South City 2 photographs supplied in the project gallery folder." : "Current views from the community, bringing the project's planning and progress into focus."}</p></div>
      <div className="propertyProgressGrid">
        {(isSouthCityGreens ? [
          "/assets/south-city-greens/green-overview.webp",
          "/assets/south-city-greens/green-walkway.webp",
          "/assets/south-city-greens/infrastructure-aerial.webp",
        ] : isDreamValley ? [
          "/assets/dream-valley-source/sector-gallery-1.png",
          "/assets/dream-valley-source/sector-gallery-2.png",
          "/assets/dream-valley-source/sector-gallery-3.png",
        ] : isSouthCity2 ? ["/assets/south-city-2-source/sc-2.jpg", "/assets/south-city-2-source/sc-5.jpg", "/assets/south-city-2-source/sc-6.jpg"] : [property.secondary, propertyGalleryImages[2], propertyGalleryImages[3]]).map((image, index) => <article key={`${image}-${index}`}><div><Image src={image} alt={`${property.name} ${isSouthCityGreens || isDreamValley || isSouthCity2 ? "project view" : "development view"} ${index + 1}`} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><span><small>0{index + 1}</small><b>{isSouthCityGreens ? (index === 0 ? "An endless unfolding green" : index === 1 ? "Where grandeur meets infrastructure" : "A life woven with togetherness") : isDreamValley ? (index === 0 ? "Peaceful living" : index === 1 ? "Urban accessibility" : "Modern lifestyles") : isSouthCity2 ? (index === 0 ? "Project entrance" : index === 1 ? "Landscaped green" : "Central lawn") : (index === 0 ? "Community entrance" : index === 1 ? "Internal development" : "Planned surroundings")}</b>{!isSouthCityGreens && !isDreamValley && !isSouthCity2 && <em>{property.status}</em>}</span></article>)}
      </div>
      <p className="propertyProgressNote">{isSouthCityGreens ? "Open space, real infrastructure, and a plotted community shaped for the long run." : isDreamValley ? "Positioned near the growth hubs of Jhajjar, this thoughtfully planned development offers the perfect blend of peaceful living and urban accessibility." : isSouthCity2 ? "Project photographs supplied for South City 2, Sector 37, Jhajjar." : "For the latest on-ground progress and availability, schedule a guided site visit with our project team."}</p>
    </section>

    <section className="propertyGallery" id="gallery">
      <div className="propertyGalleryHead">
        <div><p className="eyebrow"><span /> Gallery</p><h2 className={isDreamValley ? "dreamValleyGalleryTitle" : undefined}>{isSouthCityGreens ? <>South City<br /><em>Greens.</em></> : isDreamValley ? <>Dream <em>Valley.</em></> : isSouthCity2 ? <>South City <em>2.</em></> : <>A closer look at<br /><em>{property.name}.</em></>}</h2></div>
      </div>
      <ProjectGallery images={propertyGalleryImages} projectName={property.name} />
    </section>

    <section className="propertyConnectivity" id="location">
      <div className="propertyConnectivityCopy">
        <p className="eyebrow"><span /> Location advantage</p>
        <h2>{isSouthCityGreens ? <>Positioned at the edge<br /><em>of tomorrow.</em></> : isDreamValley ? <>Everything you need,<br /><em>just minutes away.</em></> : isSouthCity2 ? <>Connected to State<br /><em>&amp; National Highways.</em></> : <>Connected to a brighter<br /><em>tomorrow.</em></>}</h2>
        <p>{isSouthCityGreens ? "Sector 36 sits at the very centre of that promise, minutes from Reliance MET City and the Indospace Industrial Park, with direct reach to the KMP Expressway and the proposed Green Corridor beyond." : isDreamValley ? "Situated in a prime location, well connected to major highways." : isSouthCity2 ? "South City 2 is strategically placed in Sector 37, Jhajjar, near Pratapgarh Farms." : `${property.location} keeps everyday needs and important urban destinations within convenient reach.`}</p>
        {isSouthCity2 ? <a className="button gold" href="https://www.google.com/maps?q=28.5965833,76.62775" target="_blank" rel="noreferrer">Explore location <ArrowRight /></a> : <Link className="button gold" href="#visit">Explore location <ArrowRight /></Link>}
        <div className="propertyConnectivityBenefits">{isSouthCityGreens ? <><span><Waypoints />Proposed<br />Green Corridor</span><span><MapPin />Reliance MET<br />City</span><span><CarFront />KMP<br />Expressway</span></> : isDreamValley ? <><span><HeartPulse />Healthcare<br />facilities</span><span><GraduationCap />Educational<br />facilities</span><span><Building2 />Business<br />hubs</span></> : isSouthCity2 ? <><span><Building2 />Business<br />hubs</span><span><HeartPulse />Health<br />care</span><span><GraduationCap />Education<br />facilities</span></> : <><span><Leaf />Greener<br />surroundings</span><span><UsersRound />Growing<br />community</span><span><ChartNoAxesCombined />Higher<br />future value</span></>}</div>
      </div>
      <div className="propertyConnectivityVisual"><Image src={property.image} alt={`${property.name} entrance and surroundings`} fill sizes="(max-width: 900px) 100vw, 40vw" /><strong>{isSouthCityGreens ? <>A prestigious address<br /><em>delivers value twice.</em></> : isDreamValley ? <>Connected to growth.<br /><em>Designed for the future.</em></> : isSouthCity2 ? <>Walking distance from<br /><em>Pratapgarh Farms.</em></> : <>More than a location,<br /><em>a brighter future.</em></>}</strong></div>
      <div className="propertyConnectivityFacts">{isSouthCityGreens ? <>
        <article><div><Image src="/assets/dream-valley-railway.png" alt="Jhajjar Railway Station connectivity" fill sizes="22vw" /></div><span><TrainFront /><b>2 km</b><strong>Jhajjar Railway Station</strong></span></article>
        <article><div><Image src="/assets/south-city-greens/reliance-met-city-real.webp" alt="Reliance Model Economic Township entrance in Jhajjar" fill sizes="22vw" /></div><span><CarFront /><b>17 km</b><strong>Reliance MET City</strong></span></article>
        <article><div><Image src="/assets/south-city-greens/gurugram-real.webp" alt="DLF Cyber City in Gurugram, Haryana" fill sizes="22vw" /></div><span><Waypoints /><b>37 km</b><strong>Gurugram</strong><small>DLF Cyber City photo · Tarun4u/Wikimedia Commons, CC BY-SA 4.0.</small></span></article>
      </> : isDreamValley ? <>
        <article><div><Image src="/assets/dream-valley-railway.png" alt="Railway connectivity near Dream Valley" fill sizes="22vw" /></div><span><TrainFront /><b>12–15 mins</b><strong>Jhajjar Railway Station</strong></span></article>
        <article><div><Image src="/assets/generated-major-highway.webp" alt="Illustrative highway connectivity" fill sizes="22vw" /></div><span><CarFront /><b>20 mins</b><strong>KMP Expressway Entry</strong></span></article>
        <article><div><Image src="/assets/dream-valley-airport.png" alt="Illustrative airport connectivity" fill sizes="22vw" /></div><span><Plane /><b>1 hr 10 mins</b><strong>IGI Airport (T3), Delhi</strong></span></article>
      </> : isSouthCity2 ? <>
        <article><div><Image src="/assets/south-city-2-source/nh71-indiaonline.jpg" alt="NH-71 Rewari Rohtak Highway" fill sizes="22vw" /></div><span><CarFront /><b>2–5 mins</b><strong>NH-71 Rewari Rohtak Highway</strong></span></article>
        <article><div><Image src="/assets/dream-valley-railway.png" alt="Jhajjar Railway Station connectivity" fill sizes="22vw" /></div><span><TrainFront /><b>2–5 mins</b><strong>Jhajjar Railway Station</strong></span></article>
        <article><div><Image src="/assets/dream-valley-airport.png" alt="IGI Airport Terminal 3 connectivity" fill sizes="22vw" /></div><span><Plane /><b>50–55 mins</b><strong>IGI Airport</strong></span></article>
      </> : <>
        <article><div><Image src={property.secondary} alt={`${property.name} location`} fill sizes="22vw" /></div><span><MapPin /><b>{property.location}</b><strong>Project location</strong><small>Placed close to everyday needs.</small></span></article>
        <article><div><Image src="/assets/generated-major-highway.webp" alt="Connected roads" fill sizes="22vw" /></div><span><CarFront /><b>Connected roads</b><strong>Practical access</strong><small>Easy movement to nearby destinations.</small></span></article>
        <article><div><Image src="/assets/generated-connectivity-overview.webp" alt="Urban connectivity" fill sizes="22vw" /></div><span><Waypoints /><b>Daily essentials</b><strong>Conveniently close</strong><small>Key destinations remain within reach.</small></span></article>
      </>}</div>
      {isSouthCityGreens && <div className="southCityConnectivityList projectDestinationGrid" aria-label="Complete South City Greens key connectivity">
        <header><strong>Key destinations near South City 1</strong><span>Well connected for a brighter tomorrow</span></header>
        {[['Met City','17 km'],['AIIMS Jhajjar','30 km'],['IGI Airport, Delhi','49 km'],['Bahadurgarh','25 km'],['Rohtak','27 km'],['Sonipat','38 km'],['Delhi (Dwarka)','45 km'],['Gurugram','37 km'],['Jhajjar Railway Station','2 km'],['Bus Stand, Jhajjar','3 km']].map(([place, distance]) => { const Icon = getConnectivityIcon(place); return <span key={place}><Icon /><b>{place}</b><em>{distance}</em></span>; })}
      </div>}
      {isDreamValley && <div className="southCityConnectivityList projectDestinationGrid" aria-label="Complete Dream Valley location highlights">
        <header><strong>Key destinations near Dream Valley</strong><span>Well connected for a brighter tomorrow</span></header>
        {[['Civil Hospital, Jhajjar','8–10 mins'],['AIIMS-II (Badsa Campus)','20–25 mins'],['WCMSRH','20 mins'],['PG Nehru Govt. College','10–12 mins'],['Sehwag International School','10 mins'],['Ch. Ranbir Singh State Inst.','20 mins'],['Ganga Institute of Tech.','20 mins'],['XLRI Delhi-NCR Campus','12 mins'],['Reliance MET City (Jhajjar)','10 mins'],['IMT Manesar','50 mins'],['Bahadurgarh Industrial Area','45 mins'],['Jhajjar Railway Station','12–15 mins'],['KMP Expressway Entry','20 mins'],['Gurugram (Cyber City)','1 hr 15 mins'],['IGI Airport (T3), Delhi','1 hr 10 mins'],['Sultanpur Bird Sanctuary','30 mins'],['Dwarka Expressway','45 mins']].map(([place, distance]) => { const Icon = getConnectivityIcon(place); return <span key={place}><Icon /><b>{place}</b><em>{distance}</em></span>; })}
      </div>}
      {isSouthCity2 && <div className="southCityConnectivityList projectDestinationGrid" aria-label="Complete South City 2 connectivity">
        <header><strong>Key destinations near South City 02</strong><span>Well connected for a brighter tomorrow</span></header>
        {[['NH-71 Rewari Rohtak Highway','2–5 mins'],['Jhajjar City','2–5 mins'],['Jhajjar Railway Station','2–5 mins'],['Jhajjar Bus Stand','2–5 mins'],['Indospace Industrial Park Badli','10–15 mins'],['Reliance MET City','10–15 mins'],['KMP Expressway','10–15 mins'],['AIIMS NCI at Badsa, Jhajjar','15–20 mins'],['Sultanpur Bird Sanctuary','20–25 mins'],['Dwarka Expressway','30–35 mins'],['Gurugram','40–45 mins'],['IGI Airport','50–55 mins']].map(([place, distance]) => { const Icon = getConnectivityIcon(place); return <span key={place}><Icon /><b>{place}</b><em>{distance}</em></span>; })}
      </div>}
    </section>

    <section className={`propertyInvestment${isDreamValley ? " dreamValleyInvestment" : ""}`}>
      <div className="propertyInvestmentIntro"><p className="eyebrow light"><span /> {isSouthCityGreens ? "Why South City Green?" : isDreamValley ? "Why ROOF & VEDMAAN in Jhajjar?" : isSouthCity2 ? "South City 2 vicinity" : "Why invest here"}</p><h2>{isSouthCityGreens ? <>Secure investment.<br /><em>Golden future.</em></> : isDreamValley ? <>Invest with confidence.<br /><em>Grow with ROOF &amp; VEDMAAN.</em></> : isSouthCity2 ? <>Business, healthcare<br /><em>&amp; education nearby.</em></> : <>Built around value.<br /><em>Planned for growth.</em></>}</h2><p>{isSouthCityGreens ? "Strategic location in fast-developing Sector 36, surrounded by residential hubs and infrastructure." : isDreamValley ? "The next growth hub of Delhi–NCR, offering connectivity, affordability and long-term growth." : isSouthCity2 ? "Key destinations listed in the supplied South City 2 brochure." : "A plotted address backed by clear planning, practical connectivity and the long-term promise of an emerging location."}</p>{isDreamValley && <div className="dreamValleyBrandRow"><div><Image src="/assets/dream-valley-source/roof-logo.png" alt="ROOF" fill sizes="150px" /></div><div><Image src="/assets/dream-valley-source/vedmaan-log-black.png" alt="Vedmaan Group" fill sizes="110px" /></div></div>}</div>
      <div className="propertyInvestmentGrid">{(isSouthCityGreens ? [
        [MapPin, "Located on 75 Meter Wide Road", ""],
        [ChartNoAxesCombined, "Strategic Location in Fast Developing Sector 36", ""],
        [Waypoints, "Excellent Connectivity to NH-334B, KMP Expressway", ""],
        [House, "Surrounded by Residential Hubs & Infrastructure", ""],
        [ShieldCheck, "Secure Gated Community with Modern Planning", ""],
        [ChartNoAxesCombined, "High Appreciation & Excellent Rental Potential", ""],
      ] as const : isDreamValley ? [
        [MapPin, "Largest Land Bank in Jhajjar", "One of the largest land holdings among real estate developers in Jhajjar, offering long-term growth potential and planned development."],
        [ShieldCheck, "Trusted & Established Brand", "A well-recognized name with a strong reputation built on trust, quality, and customer satisfaction."],
        [Check, "Proven Track Record", "Successfully delivered multiple residential developments, reflecting commitment and reliability."],
        [ChartNoAxesCombined, "Multiple Investment Opportunities", "Offering a diverse portfolio of projects across prime sectors of Jhajjar to suit different investment and lifestyle needs."],
        [Building2, "Premium Quality Development", "Designed with superior planning, modern infrastructure, and high construction standards for a better living experience."],
      ] as const : isSouthCity2 ? [
        [Building2, "Reliance MET", "Business hub listed in the South City 2 brochure."],
        [Building2, "Indospace Industrial Park Badli", "Business hub listed in the South City 2 brochure."],
        [HeartPulse, "AIIMS, Badsa Jhajjar", "Healthcare destination listed in the South City 2 brochure."],
        [GraduationCap, "K.R. Mangalam University", "Education destination listed in the South City 2 brochure."],
        [GraduationCap, "G.D. Goenka Public School", "Education destination listed in the South City 2 brochure."],
      ] as const : [
        [MapPin, "Growth location", "Positioned within Jhajjar's expanding Delhi–NCR corridor."],
        [ShieldCheck, "Clear credentials", "Project information supported by documented approvals."],
        [Waypoints, "Planned infrastructure", "Internal roads, green spaces and essential services considered together."],
        [ChartNoAxesCombined, "Enduring potential", "Land ownership with flexibility for today and value for tomorrow."],
      ] as const).map(([Icon, title, copy], index) => <article key={title}><Icon /><small>{String(index + 1).padStart(2, "0")}</small><h3>{title}</h3>{copy && <p>{copy}</p>}</article>)}</div>
    </section>

    {isDreamValley && <section className="dreamValleyDdjay">
      <div className="dreamValleyDdjayHead">
        <p className="eyebrow light"><span /> Deen Dayal Jan Awas Yojana</p>
        <h2>Why <em>DDJAY?</em></h2>
        <p>Benefits of DDJAY plots as presented on the Dream Valley project website.</p>
      </div>
      <div className="dreamValleyDdjayGrid">
        {([
          [ShieldCheck, "Secure Investment With Low Risk", "DDJAY plots are government-backed, so you can be sure that your investment is secure. The government also provides a number of incentives to developers, which helps to keep prices low."],
          [House, "Attractive Amenities", "DDJAY plots are located in well-developed areas with access to a variety of amenities, such as schools, hospitals, parks, and shopping malls. This makes them a great place to live, work, or raise a family."],
          [Building2, "Easy Process For Building Additional Floors", "The DDJAY policy allows for separate registration of each floor, which makes it easy to build additional floors if you need more space. This can be a great way to increase the value of your investment."],
          [ChartNoAxesCombined, "Potential For High Returns", "The real estate market in Haryana is growing rapidly, so there is a good chance that your DDJAY plot will appreciate in value over time. This means that you could potentially make a significant profit if you decide to sell your plot in the future."],
          [MapPin, "Affordable Prices", "DDJAY plots are priced very affordably, making them a great option for first-time homebuyers or investors."],
          [Check, "Flexible Payment Options", "The Haryana government offers a variety of flexible payment options for DDJAY plots, which makes it easy to finance your purchase."],
          [Landmark, "Government Subsidies Pricing", "The Haryana government also offers a number of subsidies for DDJAY plots, which can help to reduce the cost of your purchase."],
          [Trophy, "Good Resale Value", "DDJAY plots are in high demand, so you can be sure that you will be able to sell your plot for a good price if you decide to do so in the future."],
        ] as const).map(([Icon, title, copy], index) => <article key={title}><span><Icon /></span><small>{String(index + 1).padStart(2, "0")}</small><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>}

    <section className={`propertyFaq${isDreamValley ? " dreamValleyFaq" : ""}`}>
      <div className="propertyFaqIntro"><p className="eyebrow"><span /> Frequently asked questions</p><h2>Everything you<br /><em>need to know.</em></h2><p>Quick answers to the questions buyers commonly ask before planning a visit.</p></div>
      <div className="propertyFaqList">
        <details name="project-faq" open><summary>Where is {property.name} located?<span>+</span></summary><p>{isSouthCity2 ? "South City 2 is located in Sector 37, Jhajjar, Haryana, near Pratapgarh Farms." : `${property.name} is located in ${property.location}, with access to Jhajjar and important regional road connections.`}</p></details>
        <details name="project-faq"><summary>What plot sizes are available?<span>+</span></summary><p>{isSouthCityGreens ? "The brochure lists residential plots from 90 to 180 sq. yd. Current inventory can be confirmed with the project team." : isDreamValley ? "The planned residential plots range from 87.048 to 145.623 sq. m. Current inventory can be confirmed with the project team." : isSouthCity2 ? "The supplied brochure lists 210 residential plots with sizes from 90 to 180 sq. yd." : "Plot sizes and current inventory are available from the project team on request."}</p></details>
        <details name="project-faq"><summary>Is the project RERA registered?<span>+</span></summary><p>Yes. The listed RERA registration number is {property.rera}.</p></details>
        <details name="project-faq"><summary>Can I download the brochure and layout?<span>+</span></summary><p>{isDreamValley || isSouthCityGreens || isSouthCity2 ? "Yes. The brochure and layout plan are available on this page in the Project Documents and Planning sections." : "Please contact the project team for the latest brochure and approved planning documents."}</p></details>
        <details name="project-faq"><summary>How can I check availability or book a site visit?<span>+</span></summary><p>Use the enquiry button or call our property team. They will confirm current availability and arrange a guided site visit.</p></details>
      </div>
    </section>

    <ProjectTestimonials />

    <section className="projectsClosingCta" id="visit">
      <Image src="/assets/projects-family-cta.webp" alt="A family walking through a green Vedmaan community" fill sizes="100vw" />
      <div className="projectsClosingCopy"><h2>{isSouthCityGreens ? <>Ready<br /><em>to invest?</em></> : isDreamValley ? <>Welcome to<br /><em>Dream Valley.</em></> : isSouthCity2 ? <>Explore<br /><em>South City 2.</em></> : <>A brighter future<br />is <em>closer than you think.</em></>}</h2><p>{isSouthCityGreens ? "Limited plots available. Apply today and secure your future in Jhajjar." : isDreamValley ? "The perfect foundation for a future of comfort, growth and prosperity." : isSouthCity2 ? "Plan a visit to the gated affordable plotted colony in Sector 37, Jhajjar." : "Schedule a private site visit and experience our communities firsthand."}</p></div>
      <Link className="button gold" href="/contact#enquiry">{isSouthCityGreens || isDreamValley ? "Apply Now" : "Book a Site Visit"} <ArrowRight /></Link>
    </section>


    <FloatingActions />
    <SiteFooter />
  </main>;
}

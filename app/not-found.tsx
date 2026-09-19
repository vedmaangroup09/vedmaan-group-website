import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function NotFound() {
  return <main className="notFoundPage"><SiteHeader /><section className="notFound"><div className="notFoundVisual" aria-hidden="true"><strong>404</strong><span>Page unavailable</span></div><div className="notFoundCopy"><p className="eyebrow light"><span /> Page not found</p><h1>This address doesn&apos;t <em>lead home.</em></h1><p>The page may have moved or the link may be incorrect. Explore our communities or return to the homepage.</p><div className="notFoundActions"><Link className="button gold" href="/">Back to home <ArrowRight /></Link><Link href="/projects">Explore projects <ArrowRight /></Link></div></div></section><SiteFooter /></main>;
}

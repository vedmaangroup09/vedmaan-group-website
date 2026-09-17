import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function NotFound() {
  return <main className="notFoundPage"><SiteHeader /><section className="notFound"><div className="notFoundNumber">404</div><div><p className="eyebrow light"><span /> Page not found</p><h1>This address doesn&apos;t<br /><em>lead home.</em></h1><p>The page may have moved or the link may be incorrect. Explore our communities or return to the homepage.</p><div><Link className="button gold" href="/">Back to home <Home /></Link><Link href="/projects">Explore projects <ArrowLeft /></Link></div></div></section><SiteFooter /></main>;
}

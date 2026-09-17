import type { Metadata } from "next";
import { Dancing_Script, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteScrollMotion from "./components/SiteScrollMotion";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});
const script = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vedmaan Group | Plotted Developments in Jhajjar",
  description:
    "Discover thoughtfully planned, RERA-registered communities by Vedmaan Group in Jhajjar, Haryana.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${script.variable}`}><SiteScrollMotion />{children}</body>
    </html>
  );
}

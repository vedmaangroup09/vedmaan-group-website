"use client";

import Image from "next/image";
import { ChevronRight, Quote } from "lucide-react";
import { type CSSProperties, useEffect, useState } from "react";

const testimonials = [
  { quote: "A truly impressive plotting project with a very promising location. The team explained everything clearly and patiently.", name: "Sukanya Yadav", details: "Google Review · 5 stars", image: "/assets/reviewer-sukanya-yadav.webp", rating: 5 },
  { quote: "The location is good and development around the project is clearly taking shape. Our site visit experience was excellent.", name: "Akash Awana", details: "Google Review · 5 stars", image: "/assets/reviewer-akash-awana.webp", rating: 5 },
  { quote: "I invested in this project and the developer service has been very good. My plot was allotted on time.", name: "Aman Tanwar", details: "Google Review · 5 stars", image: "/assets/reviewer-aman-tanwar.webp", rating: 5 },
  { quote: "Excellent project for investment in Sector 7, Jhajjar.", name: "Deep Thakur", details: "Google Review · 5 stars", image: "/assets/reviewer-deep-thakur.webp", rating: 5 },
  { quote: "Nice service, a well-planned township and guidance that felt like family.", name: "Verified Customer", details: "Google Review · 5 stars", image: "/assets/reviewer-google-1.webp", rating: 5 },
  { quote: "The project is well maintained, spacious and located in a promising area.", name: "Verified Customer", details: "Google Review · 5 stars", image: "/assets/reviewer-google-2.webp", rating: 5 },
  { quote: "I truly appreciate their customer service and attention to detail.", name: "Verified Customer", details: "Google Review · 5 stars", image: "/assets/reviewer-google-3.webp", rating: 5 },
  { quote: "Vedmaan Group is a trusted developer with a professional and supportive team.", name: "Ravi Kumar", details: "Google Review · 4 stars", image: "/assets/reviewer-ravi-kumar.webp", rating: 4 },
];

export default function ProjectTestimonials() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % testimonials.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  return <section className="testimony projectsTestimony" aria-labelledby="property-testimony-title">
    <div className="testimonyHead">
      <p className="eyebrow light"><span /> Testimonials</p>
      <h2 id="property-testimony-title">What our<br /><em>community says.</em></h2>
      <p className="testimonyIntro">Real experiences from families and investors who chose Vedmaan communities.</p>
    </div>
    <div className="testimonyCarousel">
      <button className="testimonyArrow previous" type="button" aria-label="Previous testimonials" onClick={() => setSlide((current) => (current - 1 + testimonials.length) % testimonials.length)}><ChevronRight /></button>
      <div className="testimonyViewport">
        <div className="testimonyTrack" style={{ "--testimony-desktop-shift": `calc(-${slide * 33.333333}% - ${slide * 6}px)`, "--testimony-mobile-shift": `calc(-${slide * 100}% - ${slide * 24}px)` } as CSSProperties}>
          {[...testimonials, ...testimonials.slice(0, 2)].map((item, itemIndex) => <article className={itemIndex === slide ? "isFeatured" : ""} key={`${item.name}-${itemIndex}`}>
            <div className="testimonyCardTop"><Quote aria-hidden="true" /></div>
            <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
            <div className="testimonyProfile"><div className="testimonyAvatar"><Image src={item.image} alt="" fill sizes="46px" /></div><p><b>{item.name}</b><span>{item.details}</span></p><small aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</small></div>
          </article>)}
        </div>
      </div>
      <button className="testimonyArrow next" type="button" aria-label="Next testimonials" onClick={() => setSlide((current) => (current + 1) % testimonials.length)}><ChevronRight /></button>
    </div>
    <div className="testimonyDots" aria-label="Choose a testimonial">{testimonials.map((item, index) => <button key={`${item.name}-${index}`} type="button" className={slide === index ? "isActive" : ""} aria-label={`Show testimonial ${index + 1}`} onClick={() => setSlide(index)} />)}</div>
  </section>;
}

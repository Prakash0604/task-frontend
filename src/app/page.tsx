"use client";
import CtaSection from "@/Components/Dashboard/cta-section";
import FaqSection from "@/Components/Dashboard/faq-section";
import FeaturesSection from "@/Components/Dashboard/features-section";
import Footer from "@/Components/Dashboard/footer";
import HeroSection from "@/Components/Dashboard/hero-section";
import Navigation from "@/Components/Dashboard/navigation";
import PricingSection from "@/Components/Dashboard/pricing-section";
import TestimonialsSection from "@/Components/Dashboard/testimonials";
import { useState } from "react";


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

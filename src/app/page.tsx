"use client";
import { useState } from "react";
import Navigation from "@/Components/navigation";
import HeroSection from "@/Components/hero-section";
import FeaturesSection from "@/Components/features-section";
import TestimonialsSection from "@/Components/testimonials";
import PricingSection from "@/Components/pricing-section";
import FaqSection from "@/Components/faq-section";
import CtaSection from "@/Components/cta-section";
import Footer from "@/Components/footer";

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

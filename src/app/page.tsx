"use client";
import { useState } from "react";
import Navigation from "@/components/Dashboard/navigation";
import HeroSection from "@/components/Dashboard/hero-section";
import FeaturesSection from "@/components/Dashboard/features-section";
import TestimonialsSection from "@/components/Dashboard/testimonials";
import PricingSection from "@/components/Dashboard/pricing-section";
import FaqSection from "@/components/Dashboard/faq-section";
import CtaSection from "@/components/Dashboard/cta-section";
import Footer from "@/components/Dashboard/footer";

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

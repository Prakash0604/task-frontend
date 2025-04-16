"use client";
import { useState } from "react";
import Navigation from "@/Components/Dashboard/navigation";
import HeroSection from "@/Components/Dashboard/hero-section";
import FeaturesSection from "@/Components/Dashboard/features-section";
import TestimonialsSection from "@/Components/Dashboard/testimonials";
import PricingSection from "@/Components/Dashboard/pricing-section";
import FaqSection from "@/Components/Dashboard/faq-section";
import CtaSection from "@/Components/Dashboard/cta-section";
import Footer from "@/Components/Dashboard/footer";

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

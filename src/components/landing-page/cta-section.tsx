import React from "react";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section className="py-12 md:py-16 bg-[var(--taskmandu-primary)]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-base sm:text-lg text-[rgba(255,255,255,0.9)] mb-8 max-w-2xl mx-auto">
          Join thousands of teams already using Taskmandu to streamline their
          work and boost productivity.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-[var(--taskmandu-primary)] hover:bg-white/90"
        >
          Get Started Now
        </Button>
      </div>
    </section>
  );
};

export default CTASection;

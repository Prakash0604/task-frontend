"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Container from "@/Container/container";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "TaskFlow transformed our team's productivity. We're completing projects 30% faster than before.",
      author: "Sarah Johnson",
      role: "Product Manager, Acme Inc.",
    },
    {
      text: "The interface is intuitive and the analytics provide invaluable insights into our workflow.",
      author: "Michael Chen",
      role: "CTO, TechSavvy",
    },
    {
      text: "We've reduced meeting time by 40% since implementing TaskFlow across our organization.",
      author: "Emily Rodriguez",
      role: "Director of Operations, Quantum Solutions",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentTestimonial, testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-indigo-50">
      <Container className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Teams Everywhere
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say about how TaskFlow has
            transformed their workflow.
          </p>
        </motion.div>

        <Container className="max-w-3xl mx-auto">
          <Container className="bg-white rounded-xl shadow-md p-8 relative">
            <Container className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white p-3 rounded-full">
              <Star size={24} />
            </Container>
            <Container className="h-48">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: currentTestimonial === index ? 1 : 0,
                    x: currentTestimonial === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full"
                  style={{
                    display: currentTestimonial === index ? "block" : "none",
                  }}
                >
                  <p className="text-lg text-gray-700 italic mb-6">
                    {testimonial.text}
                  </p>
                  <Container>
                    <p className="font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </Container>
                </motion.div>
              ))}
            </Container>
            <Container className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentTestimonial === index
                      ? "bg-indigo-600"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </Container>
          </Container>
        </Container>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Container className="flex flex-wrap justify-center items-center gap-8">
            {[
              "Company A",
              "Company B",
              "Company C",
              "Company D",
              "Company E",
            ].map((company, i) => (
              <div
                key={i}
                className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </Container>
        </motion.div>
      </Container>
    </section>
  );
}

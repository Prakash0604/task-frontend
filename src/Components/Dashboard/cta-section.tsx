"use client";
import Container from "@/Container/container";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-indigo-600">
      <Container className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of teams using TaskFlow to achieve more, with less
            effort.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="bg-white text-indigo-600 px-8 py-4 rounded-md inline-flex items-center space-x-2 font-medium shadow-md hover:bg-indigo-50 transition-colors"
            >
              <span>Start your free trial</span>
              <ChevronRight size={18} />
            </Link>
          </motion.div>
          <p className="text-indigo-200 mt-4">
            No credit card required • 14-day free trial
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default CtaSection;

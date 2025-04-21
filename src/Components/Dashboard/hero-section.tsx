"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/Container/container";
import DailyFlowChart from "./daily-flow-chart";
export default function HeroSection() {
  return (
    <section className="pt-32 pb-20">
      <Container className="container mx-auto px-4 md:px-6">
        <Container className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Manage Tasks <span className="text-indigo-600">Effortlessly</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              TaskFlow helps teams organize, track, and manage their work with
              powerful features designed for productivity and collaboration.
            </p>
            <Container className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                href="/signup"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md text-center flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start for free</span>
                <ArrowRight size={18} />
              </motion.a>
              <Link
                href="#demo"
                className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-md text-center hover:bg-gray-50 transition-colors"
              >
                Watch demo
              </Link>
            </Container>
            <Container className="mt-8 flex items-center text-sm text-gray-500">
              <p>No credit card required • Free 14-day trial</p>
            </Container>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Container className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <Container className="bg-gray-800 h-8 flex items-center px-4">
                <Container className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </Container>
              </Container>
              <Container className="p-6">
                <DailyFlowChart />
              </Container>
            </Container>
          </motion.div>
        </Container>
      </Container>
    </section>
  );
}

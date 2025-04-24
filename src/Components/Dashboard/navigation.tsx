"use client";

import Container from "@/Container/container";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../darkMode/toggleButton";

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navigation({
  isMenuOpen,
  setIsMenuOpen,
}: NavigationProps) {
  return (
    <nav className="bg-white dark:bg-gray-900 py-4 fixed top-0 w-full z-50 border">
      <Container className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Container className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white p-2 rounded"
          ></motion.div>
          <span className="text-xl font-bold text-[#2596be]  cursor-pointer">
            TaskMandu
          </span>
        </Container>
        {/* Desktop Navigation */}
        <Container className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-600 dark:text-gray-300 hover:text-[#2596be] dark:hover:text-[#2596be] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 dark:text-gray-300 hover:text-[#2596be] dark:hover:text-[#2596be] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 dark:text-gray-300 hover:text-[#2596be] dark:hover:text-[#2596be] transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-gray-600 dark:text-gray-300 hover:text-[#2596be] dark:hover:text-[#2596be]transition-colors"
          >
            FAQ
          </Link>
        </Container>

        <Container className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-100  bg-[#2596be] px-4 py-2 rounded-md  transition-colors"
          >
            Login
          </Link>

          <ModeToggle />
        </Container>
        {/* Mobile Menu Button */}
        <Container className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 border-t border-gray-100 dark:border-gray-700"
        >
          <Container className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              FAQ
            </Link>
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <Link
                href="/login"
                className="block text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center mt-2"
              >
                Get Started
              </Link>
              <div className="flex justify-center mt-2">
                <ModeToggle />
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </nav>
  );
}

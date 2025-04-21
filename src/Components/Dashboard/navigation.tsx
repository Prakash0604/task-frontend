"use client";
import Container from "@/Container/container";
import { useThemeStore } from "@/store/theme/theme-store";
import { motion } from "framer-motion";
import { Menu, Moon, X } from "lucide-react";
import Link from "next/link";
interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}
export default function Navigation({
  isMenuOpen,
  setIsMenuOpen,
}: NavigationProps) {
  const { toggleTheme, theme } = useThemeStore()
  return (
    <nav className={`${theme === "light" ? "bg-white" : "bg-red-500"} shadow-sm py-4 fixed top-0 w-full z-50`}>
      <Container className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Container className="flex items-center space-x-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className=" text-white p-2 rounded"
          >
          </motion.div>
          <span className="text-xl font-bold text-gray-900">TaskMandu</span>
        </Container>
        {/* Desktop Navigation */}
        <Container className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            FAQ
          </Link>
        </Container>

        <Container className="hidden md:flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </Link>
        </Container>
        <Moon onClick={toggleTheme} />
        {/* Mobile Menu Button */}
        <Container className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-indigo-600 transition-colors"
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
          className="md:hidden bg-white px-4 py-4 border-t border-gray-100"
        >
          <Container className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              FAQ
            </Link>
            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/login"
                className="block text-gray-600 hover:text-indigo-600 transition-colors py-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center mt-2"
              >
                Get Started
              </Link>
            </div>
          </Container>
        </motion.div>
      )}
    </nav>
  );
}

"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Container from "../containers/main-container"
import { useThemeStore } from "@/store/theme-store/theme-store"
import Link from "next/link"

export default function CTASection() {
  const { theme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const todoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.5,
      },
    },
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Container className="relative py-16 md:py-24 bg-[var(--taskmandu-primary)] overflow-hidden">
      {/* Background elements */}
      <Container className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-white/20 blur-3xl"
        />
      </Container>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Text and Button */}
          <div className="text-center lg:text-left lg:w-1/2">
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
              style={{
                textShadow:
                  theme === "dark" ? "0 4px 12px rgba(0, 0, 0, 0.5)" : "0 4px 12px rgba(255, 255, 255, 0.3)",
              }}
            >
              Ready to <span className="text-[var(--taskmandu-light-icon)]">Transform</span> Your Workflow?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Join thousands of teams already using Taskmandu to streamline their work and boost productivity.
            </motion.p>
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  theme === "dark"
                    ? "0 12px 24px rgba(37, 150, 190, 0.4)"
                    : "0 12px 24px rgba(255, 255, 255, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/login">
                <Button
                  className="bg-white text-[var(--taskmandu-primary)] hover:bg-white/90 px-8 py-6 rounded-lg shadow-lg dark:shadow-white/20 transition-all duration-300 text-lg font-medium flex items-center mx-auto lg:mx-0"
                  style={{
                    boxShadow:
                      theme === "dark"
                        ? "0 8px 20px rgba(255, 255, 255, 0.3)"
                        : "0 8px 16px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* To-Do Preview */}
          <motion.div
            variants={todoVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 mt-8 lg:mt-0"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-taskmandu-primary/20 max-w-md mx-auto"
              style={{
                boxShadow:
                  theme === "dark"
                    ? "0 8px 20px rgba(37, 150, 190, 0.3)"
                    : "0 8px 16px rgba(37, 150, 190, 0.2)",
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-secondary-text)]">
                Task Preview
              </h3>
              <div className="space-y-3">
                <motion.div
                  className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-5 h-5 text-[var(--taskmandu-primary)]" />
                  <span className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)]">
                    Complete project proposal
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-5 h-5 text-[var(--taskmandu-primary)]" />
                  <span className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)]">
                    Schedule team meeting
                  </span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-5 h-5 text-[var(--taskmandu-primary)]" />
                  <span className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)]">
                    Review client feedback
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-0 left-20 bg-white/10 p-3 rounded-lg shadow-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 5,
          }}
        >
          <div className="w-12 h-2 bg-[var(--taskmandu-light-icon)] rounded-full" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-20 bg-white/10 p-3 rounded-lg shadow-lg"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 4,
            delay: 1,
          }}
        >
          <div className="w-10 h-2 bg-[var(--taskmandu-light-icon)] rounded-full" />
        </motion.div>
      </div>
    </Container>
  )
}
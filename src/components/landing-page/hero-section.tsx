"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTypewriter } from "@/hooks/use-typewriter"
import Container from "../containers/main-container"
import heroImage from "@/assets/hero.jpg"
import { useThemeStore } from "@/store/theme-store/theme-store"
import Link from "next/link"

export default function HeroSection() {
        const { theme } = useThemeStore()
        const [mounted, setMounted] = useState(false)
        const benefits = ["Stay Organized", "Boost Productivity", "Achieve More"]
        const { text, isTyping } = useTypewriter(benefits, {
                typingSpeed: 100,
                deletingSpeed: 50,
                delayBetweenWords: 2000,
        })

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



        useEffect(() => {
                setMounted(true)
        }, [])

        if (!mounted) return null

        return (
                <Container className="relative w-full overflow-hidden min-h-[110vh]   flex items-center">
                        {/* Background elements */}
                        <Container className="absolute inset-0 z-0">
                                <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.5 }}
                                        transition={{ duration: 1.5 }}
                                        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[var(--taskmandu-primary)] blur-3xl"
                                />
                                <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.3 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[var(--taskmandu-primary)] blur-3xl"
                                />

                                <Container className="lg:flex items-center  justify-between 2xl:px-48 xl:px-24 px-8 py-4 hidden">
                                        <h1 className="text-[var(--taskmandu-light-icon)] text-xl md:text-2xl lg:text-4xl font-bold ">Taskmandu</h1>
                                        <Link href="/login" className="text-white  shadow-xl shadow-amber-500 bg-[var(--taskmandu-primary)] px-4 py-2 rounded">Login</Link>
                                </Container>
                        </Container>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex flex-col lg:flex-row items-center justify-between gap-12"
                                >
                                        <motion.div variants={itemVariants} className="lg:w-1/2 text-center lg:text-left">
                                                <motion.div
                                                        variants={itemVariants}
                                                        className="inline-block px-4 py-1 mb-4 rounded-full bg-taskmandu-primary/10 dark:bg-taskmandu-primary/20"
                                                >
                                                        <span className="text-[var(--taskmandu-primary)] dark:text-[var(--taskmandu-primary)] font-medium">
                                                                Task Management Reimagined
                                                        </span>
                                                </motion.div>

                                                <motion.h1
                                                        variants={itemVariants}
                                                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-secondary-text)]"
                                                        style={{
                                                                textShadow:
                                                                        theme === "dark" ? "0 4px 12px rgba(37, 150, 190, 0.3)" : "0 2px 8px rgba(66, 66, 66, 0.15)",
                                                        }}
                                                >
                                                        Lead Your<span className="text-[var(--taskmandu-primary)]"> Tasks</span> Live Your {" "}
                                                        <span className="text-[var(--taskmandu-primary)]">Legend!</span>
                                                </motion.h1>

                                                <motion.div
                                                        variants={itemVariants}
                                                        className="text-xl md:text-2xl mb-8 text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)] h-12"
                                                >
                                                        <span className="text-[var(--taskmandu-light-icon)]">
                                                                {text}
                                                                {isTyping && <span className="inline-block w-0.5 h-6 ml-1 bg-[var(--taskmandu-light-icon)] animate-pulse" />}
                                                        </span>
                                                </motion.div>

                                                <motion.div
                                                        variants={itemVariants}
                                                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                                >
                                                        <motion.div
                                                                whileHover={{
                                                                        scale: 1.05,
                                                                        boxShadow:
                                                                                theme === "dark" ? "0 12px 24px rgba(37, 150, 190, 0.4)" : "0 12px 20px rgba(37, 150, 190, 0.3)",
                                                                }}
                                                                whileTap={{ scale: 0.98 }}
                                                        >
                                                                <Link
                                                                        href="/login"
                                                                        className="bg-[var(--taskmandu-primary)]  hover:[var(--taskmandu-primary)] text-white px-4 py-3 rounded-lg shadow-lg dark:shadow-taskmandu-primary/20 transition-all duration-300 text-lg font-medium flex"
                                                                        style={{
                                                                                boxShadow:
                                                                                        theme === "dark" ? "0 8px 20px rgba(37, 150, 190, 0.3)" : "0 8px 16px rgba(37, 150, 190, 0.2)",
                                                                        }}
                                                                >
                                                                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                                                </Link>
                                                        </motion.div>

                                                        <motion.div
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.98 }}
                                                        >
                                                                <Button
                                                                        variant="outline"
                                                                        className="text-[var(--taskmandu-primary)] dark:text-[var(--taskmandu-primary)]  px-8 py-6 rounded-lg transition-all duration-300 text-lg font-medium"
                                                                >
                                                                        Learn More
                                                                </Button>
                                                        </motion.div>
                                                </motion.div>
                                        </motion.div>

                                        {/* Image/Illustration */}
                                        <motion.div
                                                variants={itemVariants}
                                                className="lg:w-1/2"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                        >
                                                <motion.div
                                                        initial={{ opacity: 0, y: 20, rotate: -5 }}
                                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                                        transition={{
                                                                duration: 0.8,
                                                                delay: 0.6,
                                                                type: "spring",
                                                                stiffness: 100,
                                                        }}
                                                        className="relative"
                                                        style={{
                                                                filter: `drop-shadow(0 20px 30px ${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)"})`,
                                                        }}
                                                >
                                                        <Image
                                                                src={heroImage}
                                                                alt="Taskmandu App Interface"
                                                                width={600}
                                                                height={500}
                                                                className="rounded-xl "
                                                        />

                                                        {/* Floating elements for visual interest */}
                                                        <motion.div
                                                                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
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
                                                                <div className="w-16 h-2 bg-green-400 rounded-full mb-2" />
                                                                <div className="w-12 h-2 bg-[var(--taskmandu-primary)] rounded-full" />
                                                        </motion.div>

                                                        <motion.div
                                                                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
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
                                                                <div className="w-14 h-2 bg-yellow-400 rounded-full mb-2" />
                                                                <div className="w-10 h-2 bg-[var(--taskmandu-primary)] rounded-full" />
                                                        </motion.div>
                                                </motion.div>
                                        </motion.div>
                                </motion.div>
                        </div>
                </Container>
        )
}

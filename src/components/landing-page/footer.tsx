"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin } from "lucide-react"
import Container from "../containers/main-container"
import { useThemeStore } from "@/store/theme-store/theme-store"
import Link from "next/link"

export default function Footer() {
        const { theme } = useThemeStore()
        const [mounted, setMounted] = useState(false)

        const containerVariants = {
                hidden: { opacity: 0 },
                visible: {
                        opacity: 1,
                        transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3,
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

        const socialLinks = [
                { icon: <Github className="w-6 h-6" />, href: "https://github.com/taskmandu", label: "GitHub" },
                { icon: <Twitter className="w-6 h-6" />, href: "https://twitter.com/taskmandu", label: "Twitter" },
                { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com/company/taskmandu", label: "LinkedIn" },
        ]

        const navLinks = [
                { href: "/about", label: "About" },
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/contact", label: "Contact" },
        ]

        useEffect(() => {
                setMounted(true)
        }, [])

        if (!mounted) return null

        return (
                <Container className="relative py-12 bg-[var(--taskmandu-background)] dark:bg-[var(--taskmandu-dark-background)] overflow-hidden border-t border-gray-200 dark:border-gray-700">
                        {/* Background elements */}
                        <Container className="absolute inset-0 z-0">
                                <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.4 }}
                                        transition={{ duration: 1.5 }}
                                        className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[var(--taskmandu-primary)] blur-3xl"
                                />
                                <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.3 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[var(--taskmandu-primary)] blur-3xl"
                                />
                        </Container>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
                                >
                                        {/* Brand Section */}
                                        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
                                                <h3 className="text-2xl font-bold text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-secondary-text)] mb-4">
                                                        Taskmandu
                                                </h3>
                                                <p className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)] max-w-xs">
                                                        Lead your tasks, live your legend with Taskmandu&apos;s powerful task management tools.
                                                </p>
                                        </motion.div>

                                        {/* Navigation Links */}
                                        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
                                                <h4 className="text-lg font-semibold text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-secondary-text)] mb-4">
                                                        Quick Links
                                                </h4>
                                                <ul className="space-y-2">
                                                        {navLinks.map((link, index) => (
                                                                <motion.li
                                                                        key={index}
                                                                        whileHover={{ x: 5 }}
                                                                        transition={{ type: "spring", stiffness: 200 }}
                                                                >
                                                                        <Link
                                                                                href={link.href}
                                                                                className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)] hover:text-[var(--taskmandu-primary)] transition-colors duration-300"
                                                                        >
                                                                                {link.label}
                                                                        </Link>
                                                                </motion.li>
                                                        ))}
                                                </ul>
                                        </motion.div>

                                        {/* Social Media and Contact */}
                                        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
                                                <h4 className="text-lg font-semibold text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-secondary-text)] mb-4">
                                                        Connect With Us
                                                </h4>
                                                <div className="flex gap-4 mb-4">
                                                        {socialLinks.map((link, index) => (
                                                                <motion.a
                                                                        key={index}
                                                                        href={link.href}
                                                                        aria-label={link.label}
                                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                                        whileTap={{ scale: 0.9 }}
                                                                        className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)] hover:text-[var(--taskmandu-primary)] transition-colors duration-300"
                                                                        style={{
                                                                                filter: `drop-shadow(0 2px 4px ${theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.15)"})`,
                                                                        }}
                                                                >
                                                                        {link.icon}
                                                                </motion.a>
                                                        ))}
                                                </div>
                                                <p className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)]">
                                                        Email: <a href="mailto:support@taskmandu.com" className="hover:text-[var(--taskmandu-primary)]">support@taskmandu.com</a>
                                                </p>
                                        </motion.div>
                                </motion.div>

                                {/* Copyright Notice */}
                                <motion.div
                                        variants={itemVariants} className="mt-8 text-center text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)] text-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                >
                                        &copy; {new Date().getFullYear()} Taskmandu. All rights reserved.
                                </motion.div>
                        </div>

                        {/* Floating decorative elements */}
                        <motion.div
                                className="absolute top-4 left-20 bg-[var(--taskmandu-primary)]/10 p-2 rounded-lg shadow-lg"
                                animate={{
                                        y: [0, -8, 0],
                                        rotate: [0, 3, 0],
                                }}
                                transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        duration: 4,
                                }}
                        >
                                <div className="w-8 h-2 bg-[var(--taskmandu-light-icon)] rounded-full" />
                        </motion.div>
                        <motion.div
                                className="absolute bottom-4 right-20 bg-[var(--taskmandu-primary)]/10 p-2 rounded-lg shadow-lg"
                                animate={{
                                        y: [0, 8, 0],
                                        rotate: [0, -3, 0],
                                }}
                                transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        duration: 3,
                                        delay: 1,
                                }}
                        >
                                <div className="w-6 h-2 bg-[var(--taskmandu-light-icon)] rounded-full" />
                        </motion.div>
                </Container>
        )
}
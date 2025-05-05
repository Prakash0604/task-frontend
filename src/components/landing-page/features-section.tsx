"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Users, Zap } from "lucide-react"
import Container from "../containers/main-container"
import { useThemeStore } from "@/store/theme-store/theme-store"

export default function FeatureSection() {
        const { theme } = useThemeStore()
        const [mounted, setMounted] = useState(false)

        const features = [
                {
                        icon: <CheckCircle className="w-12 h-12 text-[var(--taskmandu-primary)]" />,
                        title: "Task Management",
                        description: "Organize tasks effortlessly with intuitive tools designed to keep you on track.",
                },
                {
                        icon: <Clock className="w-12 h-12 text-[var(--taskmandu-primary)]" />,
                        title: "Time Tracking",
                        description: "Monitor your time spent on tasks to optimize productivity and meet deadlines.",
                },
                {
                        icon: <Users className="w-12 h-12 text-[var(--taskmandu-primary)]" />,
                        title: "Team Collaboration",
                        description: "Collaborate seamlessly with your team, assigning tasks and sharing progress.",
                },
                {
                        icon: <Zap className="w-12 h-12 text-[var(--taskmandu-primary)]" />,
                        title: "Smart Automation",
                        description: "Automate repetitive tasks to focus on what matters most.",
                },
        ]

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

        useEffect(() => {
                setMounted(true)
        }, [])

        if (!mounted) return null

        return (
                <Container className="relative w-full py-16 overflow-hidden bg-[var(--taskmandu-background)] dark:bg-[var(--taskmandu-dark-background)]">
                        {/* Background elements */}
                        <Container className="absolute inset-0 z-0">
                                <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.4 }}
                                        transition={{ duration: 1.5 }}
                                        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[var(--taskmandu-primary)] blur-3xl"
                                />
                                <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.3 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[var(--taskmandu-primary)] blur-3xl"
                                />
                        </Container>

                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                                <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="text-center mb-12"
                                >
                                        <motion.h2
                                                variants={itemVariants}
                                                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-secondary-text)]"
                                                style={{
                                                        textShadow:
                                                                theme === "dark" ? "0 4px 12px rgba(37, 150, 190, 0.3)" : "0 2px 8px rgba(66, 66, 66, 0.15)",
                                                }}
                                        >
                                                Why Choose <span className="text-[var(--taskmandu-primary)]">Taskmandu</span>?
                                        </motion.h2>
                                        <motion.p
                                                variants={itemVariants}
                                                className="text-lg md:text-xl text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)] max-w-2xl mx-auto"
                                        >
                                                Discover powerful features to streamline your workflow and achieve your goals.
                                        </motion.p>
                                </motion.div>

                                <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                                >
                                        {features.map((feature, index) => (
                                                <motion.div
                                                        key={index}
                                                        variants={itemVariants}
                                                        whileHover={{
                                                                scale: 1.05,
                                                                boxShadow:
                                                                        theme === "dark"
                                                                                ? "0 12px 24px rgba(37, 150, 190, 0.4)"
                                                                                : "0 12px 20px rgba(37, 150, 190, 0.3)",
                                                        }}
                                                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-taskmandu-primary/20 flex flex-col items-center text-center"
                                                        style={{
                                                                boxShadow:
                                                                        theme === "dark"
                                                                                ? "0 8px 20px rgba(37, 150, 190, 0.3)"
                                                                                : "0 8px 16px rgba(37, 150, 190, 0.2)",
                                                        }}
                                                >
                                                        <div className="mb-4">{feature.icon}</div>
                                                        <h3 className="text-xl font-semibold mb-2 text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-secondary-text)]">
                                                                {feature.title}
                                                        </h3>
                                                        <p className="text-[var(--taskmandu-primary-text)] dark:text-[var(--taskmandu-light-text)]">
                                                                {feature.description}
                                                        </p>
                                                </motion.div>
                                        ))}
                                </motion.div>
                        </div>
                </Container>
        )
}
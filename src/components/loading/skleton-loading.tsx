"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const SkeletonLoader = () => {
        const [mounted, setMounted] = useState(false)

        useEffect(() => {
                setMounted(true)
        }, [])

        if (!mounted) return null

        return (
                <div className="w-full min-h-screen bg-white dark:bg-gray-900">
                        {/* Navbar skeleton */}
                        <div className="border-b border-gray-200 dark:border-gray-800">
                                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                                        <motion.div
                                                className="h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                        />
                                        <div className="flex space-x-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                        <motion.div
                                                                key={i}
                                                                className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded"
                                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                                transition={{
                                                                        duration: 1.5,
                                                                        repeat: Number.POSITIVE_INFINITY,
                                                                        ease: "easeInOut",
                                                                        delay: i * 0.1,
                                                                }}
                                                        />
                                                ))}
                                        </div>
                                </div>
                        </div>

                        {/* Hero section skeleton */}
                        <div className="container mx-auto px-4 py-12">
                                <div className="max-w-4xl mx-auto">
                                        <motion.div
                                                className="h-12 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-6"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                        />
                                        <motion.div
                                                className="h-6 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded mb-2"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.1 }}
                                        />
                                        <motion.div
                                                className="h-6 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded mb-2"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
                                        />
                                        <motion.div
                                                className="h-6 w-4/6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded mb-8"
                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.3 }}
                                        />

                                        <motion.div
                                                className="h-10 w-40 bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700 rounded-lg"
                                                animate={{ opacity: [0.6, 0.9, 0.6] }}
                                                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                        />
                                </div>
                        </div>

                        {/* Content section skeleton */}
                        <div className="container mx-auto px-4 py-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                                <div key={i} className="rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                                                        <motion.div
                                                                className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"
                                                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                                transition={{
                                                                        duration: 1.5,
                                                                        repeat: Number.POSITIVE_INFINITY,
                                                                        ease: "easeInOut",
                                                                        delay: (i * 0.1) % 0.5,
                                                                }}
                                                        />
                                                        <div className="p-4">
                                                                <motion.div
                                                                        className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded mb-4"
                                                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                                        transition={{
                                                                                duration: 1.5,
                                                                                repeat: Number.POSITIVE_INFINITY,
                                                                                ease: "easeInOut",
                                                                                delay: (i * 0.1 + 0.1) % 0.5,
                                                                        }}
                                                                />
                                                                <motion.div
                                                                        className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded mb-2"
                                                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                                        transition={{
                                                                                duration: 1.5,
                                                                                repeat: Number.POSITIVE_INFINITY,
                                                                                ease: "easeInOut",
                                                                                delay: (i * 0.1 + 0.2) % 0.5,
                                                                        }}
                                                                />
                                                                <motion.div
                                                                        className="h-4 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded"
                                                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                                        transition={{
                                                                                duration: 1.5,
                                                                                repeat: Number.POSITIVE_INFINITY,
                                                                                ease: "easeInOut",
                                                                                delay: (i * 0.1 + 0.3) % 0.5,
                                                                        }}
                                                                />
                                                        </div>
                                                </div>
                                        ))}
                                </div>
                        </div>

                        {/* Footer skeleton */}
                        <div className="border-t border-gray-200 dark:border-gray-800 mt-12">
                                <div className="container mx-auto px-4 py-8">
                                        <div className="flex flex-col md:flex-row justify-between items-center">
                                                <motion.div
                                                        className="h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded mb-4 md:mb-0"
                                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                                />
                                                <div className="flex space-x-4">
                                                        {[1, 2, 3, 4].map((i) => (
                                                                <motion.div
                                                                        key={i}
                                                                        className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"
                                                                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                                                                        transition={{
                                                                                duration: 1.5,
                                                                                repeat: Number.POSITIVE_INFINITY,
                                                                                ease: "easeInOut",
                                                                                delay: i * 0.1,
                                                                        }}
                                                                />
                                                        ))}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        )
}

export default SkeletonLoader

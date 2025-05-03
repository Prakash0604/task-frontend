import { motion } from "framer-motion";

const NoDataExample = () => {
        return (
                <motion.div
                        className="flex flex-col items-center justify-center py-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                >
                        <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                        >
                                <svg
                                        className="w-20 h-20 text-gray-400 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                >
                                        <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        ></path>
                                </svg>
                        </motion.div>
                        <motion.h3
                                className="text-lg font-medium text-gray-700 dark:text-gray-300"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                        >
                                No data found
                        </motion.h3>
                        <motion.p
                                className="text-gray-500 dark:text-gray-400 mt-1"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                        >
                                There are no records to display at this time.
                        </motion.p>
                </motion.div>
        );
};

export default NoDataExample;
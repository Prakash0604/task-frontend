"use client";
import Container from "@/Container/container";
import { motion } from "framer-motion";
import { Users, Calendar, Clock, Check } from "lucide-react";
import Dashboard from "./chartData";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Users size={24} className="text-indigo-500" />,
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team in real-time with shared workspaces and instant updates.",
    },
    {
      icon: <Calendar size={24} className="text-indigo-500" />,
      title: "Smart Scheduling",
      description:
        "Intelligent deadline management and calendar integration to keep your projects on track.",
    },
    {
      icon: <Clock size={24} className="text-indigo-500" />,
      title: "Time Tracking",
      description:
        "Monitor time spent on tasks and projects with detailed analytics and reporting.",
    },
  ];

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      id="features"
      className="py-20 bg-white dark:bg-gray-900 dark:text-white"
    >
      <Container className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Everything you need to manage projects and boost productivity in one
            intuitive platform.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg"
              variants={fadeIn}
            >
              <Container className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm dark:bg-gray-700 dark:shadow-md dark:text-white">
                {feature.icon}
              </Container>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-white">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <Container className="bg-indigo-50 rounded-2xl p-8 relative overflow-hidden dark:bg-gray-800 dark:text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100 rounded-full -mr-20 -mt-20"></div>
            <Container className="relative">
              <Container className="flex flex-col md:flex-row items-center">
                <Container className="md:w-1/2 mb-8 md:mb-0 dark:text-white">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-600 mb-6 dark:text-white">
                    Gain valuable insights into your teams performance with
                    detailed reports and visualizations.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Task completion trends",
                      "Team productivity metrics",
                      "Time tracking analytics",
                      "Custom reporting",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <Check
                          size={18}
                          className="text-indigo-600 mr-2 dark:text-white"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Container>
                <Container className="md:w-1/2">
                  <Dashboard />
                </Container>
              </Container>
            </Container>
          </Container>
        </motion.div>
      </Container>
    </section>
  );
}

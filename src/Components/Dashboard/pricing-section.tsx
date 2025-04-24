"use client";
import Container from "@/Container/container";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Starter",
      price: "$9",
      description: "Perfect for individuals and small projects",
      features: [
        "5 Projects",
        "10 Team members",
        "Basic analytics",
        "24/7 Support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$29",
      description: "Ideal for growing teams and businesses",
      features: [
        "Unlimited Projects",
        "50 Team members",
        "Advanced analytics",
        "Priority support",
        "Custom integrations",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "Custom onboarding",
        "Advanced security",
        "API access",
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-20 bg-white dark:bg-gray-900 dark:text-white"
    >
      <Container className="container mx-auto px-4 md:px-6 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 "
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Choose the plan that fits your teams needs with no hidden fees or
            surprises.
          </p>
        </motion.div>

        <Container className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto dark:text-white dark:bg-gray-900">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-xl shadow-sm border ${
                plan.popular
                  ? "border-indigo-200 ring-2 ring-indigo-600 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-white relative z-10 scale-105 my-4 md:my-0 dark:bg-gray-800 dark:border-gray-700 dark:ring-2 dark:ring-indigo-600"
                  : "border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <Container className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </Container>
              )}
              <Container className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 dark:text-gray-300">
                  {plan.description}
                </p>
                <Container className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-white">/month</span>
                </Container>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start dark:text-white">
                      <Check
                        size={18}
                        className="text-indigo-600 mt-0.5 mr-2 flex-shrink-0"
                      />
                      <span className="text-gray-600 dark:text-white">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-md font-medium ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                  } transition-colors`}
                >
                  Get started
                </motion.button>
              </Container>
            </motion.div>
          ))}
        </Container>
      </Container>
    </section>
  );
}

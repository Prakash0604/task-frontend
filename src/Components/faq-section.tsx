"use client";
import Container from "@/Container/container";
import { motion } from "framer-motion";

export default function FaqSection() {
  const faqItems = [
    {
      question: "How does the 14-day free trial work?",
      answer:
        "You can sign up for TaskFlow without a credit card and explore all features for 14 days. At the end of your trial, you can choose the plan that works best for your team. If you decide not to continue, your account will automatically switch to the limited free plan.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade, downgrade, or cancel your plan at any time. When you upgrade, you'll get immediate access to the new features. If you downgrade, the changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "Is there a limit to how many tasks I can create?",
      answer:
        "No, all plans include unlimited tasks. The difference between plans is in the number of projects, team members, and access to advanced features.",
    },
    {
      question: "How secure is my data?",
      answer:
        "TaskFlow uses industry-standard encryption and security practices to protect your data. We use SSL/TLS for data transmission and regular security audits to ensure your information is safe and secure.",
    },
    {
      question: "Do you offer discounts for nonprofit organizations?",
      answer:
        "Yes, we offer special pricing for nonprofit organizations, educational institutions, and open-source projects. Please contact our sales team for more information.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <Container className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about TaskFlow and how it can help your
            team.
          </p>
        </motion.div>

        <Container className="space-y-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.question}
              </h3>
              <p className="text-gray-600">{item.answer}</p>
            </motion.div>
          ))}
        </Container>
      </Container>
    </section>
  );
}

"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do I get started with TaskVista?",
    answer:
      "Getting started is easy! Simply click the 'Sign Up Free' button, create your account, and you'll be guided through setting up your first project. Our intuitive onboarding will help you get familiar with the platform quickly.",
  },
  {
    question: "Can I use TaskVista for free?",
    answer:
      "Yes! TaskVista offers a free plan that's perfect for individuals and small teams. You can create up to 5 projects with 20 tasks per project. You can upgrade to our paid plans anytime for more features and capacity.",
  },
  {
    question: "How does team collaboration work?",
    answer:
      "TaskVista makes collaboration seamless. You can invite team members to your workspace, assign tasks to specific people, comment on tasks, and track everyone's progress. All changes are synced in real-time so everyone is always up to date.",
  },
  {
    question: "Can I integrate TaskVista with other tools?",
    answer:
      "Yes! TaskVista integrates with popular tools like Google Calendar, Slack, GitHub, and more. Our Pro and Enterprise plans offer additional integration options, and Enterprise users can request custom integrations.",
  },
  {
    question: "Is my data secure with TaskVista?",
    answer:
      "Absolutely. We take security seriously. TaskVista uses industry-standard encryption for data in transit and at rest. We regularly perform security audits and follow best practices to keep your information safe.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, the change will take effect at the end of your current billing cycle.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We&apos;ve got answers. If you can&apos;t find what
            you&apos;re looking for, feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-bold text-left text-gray-900">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

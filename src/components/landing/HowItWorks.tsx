"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckSquare, ListChecks, Share2 } from "lucide-react";

const steps = [
  {
    icon: ListChecks,
    title: "Create your projects",
    description:
      "Start by setting up your workspace and organizing your tasks into projects.",
    color: "bg-blue-500",
  },
  {
    icon: CheckSquare,
    title: "Add and assign tasks",
    description:
      "Create tasks, add details, set due dates, and assign them to team members.",
    color: "bg-primary",
  },
  {
    icon: Share2,
    title: "Collaborate with your team",
    description:
      "Work together efficiently by sharing updates, commenting, and tracking progress.",
    color: "bg-pink-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-taskpurple-600 uppercase tracking-wider">
            How It Works
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Three simple steps to get started
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            TaskVista is designed to be intuitive and easy to use. Follow these
            simple steps to boost your productivity.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -ml-0.5"></div>

            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:text-right" : ""
                }`}
              >
                <div className="md:flex items-center">
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:order-last md:pl-12"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-xl ${
                        index % 2 === 0 ? "md:ml-auto" : ""
                      } max-w-md bg-white shadow-md border border-gray-100`}
                    >
                      <div
                        className={`h-12 w-12 rounded-full mb-4 flex items-center justify-center ${step.color} text-white md:hidden`}
                      >
                        <step.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Center icon for desktop */}
                  <div className="hidden md:flex w-12 h-12 rounded-full absolute left-1/2 -ml-6 -mt-2 items-center justify-center z-10">
                    <div
                      className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="bg-primary">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

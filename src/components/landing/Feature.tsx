"use client";
import {
  Calendar,
  CheckSquare,
  Clock,
  Filter,
  LineChart,
  List,
  MessageSquare,
  Share2,
  Tag,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CheckSquare,
    title: "Task Management",
    description:
      "Create, assign, and track tasks in a simple and intuitive interface.",
  },
  {
    icon: Calendar,
    title: "Calendar View",
    description:
      "Plan your schedule with a clear calendar view showing all your deadlines.",
  },
  {
    icon: List,
    title: "Custom Lists",
    description:
      "Organize your tasks into lists that match your workflow and projects.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share projects, assign tasks, and collaborate efficiently with your team.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Track time spent on tasks to better understand your productivity.",
  },
  {
    icon: Tag,
    title: "Labels & Tags",
    description:
      "Categorize tasks with custom labels to keep everything organized.",
  },
  {
    icon: Filter,
    title: "Smart Filters",
    description:
      "Quickly find tasks with powerful filtering and sorting options.",
  },
  {
    icon: LineChart,
    title: "Progress Reports",
    description:
      "Get insights into your productivity with detailed reports and analytics.",
  },
  {
    icon: MessageSquare,
    title: "Comments & Notes",
    description:
      "Keep all task-related communication in one place with comments and notes.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share tasks and projects with anyone, even if they don't use TaskVista.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-primary uppercase tracking-wider">
            Features
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Everything you need to stay organized
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            TaskVista combines powerful features with simplicity to help you and
            your team accomplish more, faster.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border hover:border hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6 ">
                <div className="h-12 w-12 rounded-lg border bg-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

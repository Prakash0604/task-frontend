import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingPlans = [
        {
                name: "Free",
                price: "$0",
                description: "Perfect for individuals and small projects",
                features: [
                        "Up to 5 projects",
                        "Up to 20 tasks per project",
                        "Basic task management",
                        "Calendar view",
                        "Mobile app access",
                ],
                cta: "Start for Free",
                popular: false,
        },
        {
                name: "Pro",
                price: "$9",
                period: "per user/month",
                description: "For growing teams that need more power",
                features: [
                        "Unlimited projects",
                        "Unlimited tasks",
                        "Advanced task filters",
                        "Team collaboration",
                        "Time tracking",
                        "Priority support",
                        "Custom labels and tags",
                        "Project templates",
                ],
                cta: "Start 14-Day Free Trial",
                popular: true,
        },
        {
                name: "Enterprise",
                price: "$19",
                period: "per user/month",
                description: "For large organizations with complex needs",
                features: [
                        "Everything in Pro",
                        "Advanced analytics",
                        "Team workload view",
                        "Custom integrations",
                        "Dedicated account manager",
                        "Enhanced security features",
                        "Single sign-on (SSO)",
                        "API access",
                ],
                cta: "Contact Sales",
                popular: false,
        },
];

const Pricing = () => {
        return (
                <section id="pricing" className="py-24 bg-gray-50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                        <p className="text-sm font-medium text-taskpurple-600 uppercase tracking-wider">Pricing</p>
                                        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                                Choose the plan that&apos;s right for you
                                        </h2>
                                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                                Whether you&apos;re an individual or a large team, we have a plan that fits your needs.
                                        </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                        {pricingPlans.map((plan, index) => (
                                                <Card
                                                        key={index}
                                                        className={`relative ${plan.popular
                                                                ? "border-taskpurple-500 shadow-lg"
                                                                : "border-gray-200"
                                                                }`}
                                                >
                                                        {plan.popular && (
                                                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                                        <span className="bg-taskpurple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                                Most Popular
                                                                        </span>
                                                                </div>
                                                        )}
                                                        <CardHeader>
                                                                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                                                                <div className="mt-4">
                                                                        <span className="text-3xl font-bold">{plan.price}</span>
                                                                        {plan.period && (
                                                                                <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                                                                        )}
                                                                </div>
                                                                <p className="text-gray-600 mt-2">{plan.description}</p>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <ul className="space-y-3">
                                                                        {plan.features.map((feature, i) => (
                                                                                <li key={i} className="flex items-start">
                                                                                        <Check className="h-5 w-5 text-taskpurple-500 mr-2 flex-shrink-0 mt-0.5" />
                                                                                        <span className="text-gray-700">{feature}</span>
                                                                                </li>
                                                                        ))}
                                                                </ul>
                                                        </CardContent>
                                                        <CardFooter className="pt-4">
                                                                <Button
                                                                        variant={plan.popular ? "default" : "outline"}
                                                                        className={`w-full ${plan.popular ? "bg-taskpurple-500 hover:bg-taskpurple-600" : ""
                                                                                }`}
                                                                >
                                                                        {plan.cta}
                                                                </Button>
                                                        </CardFooter>
                                                </Card>
                                        ))}
                                </div>
                        </div>
                </section>
        );
};

export default Pricing;
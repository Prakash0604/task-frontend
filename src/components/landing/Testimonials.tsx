import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
        {
                quote: "TaskVista has completely transformed how our team collaborates. We're more productive than ever and everyone knows exactly what they need to do.",
                name: "Sarah Johnson",
                title: "Product Manager at TechCorp",
                avatar: "",
        },
        {
                quote: "The intuitive interface and powerful features make TaskVista the best task management tool I've ever used. It's simple yet incredibly flexible.",
                name: "Michael Chen",
                title: "Lead Developer at StartupX",
                avatar: "",
        },
        {
                quote: "Since switching to TaskVista, we've reduced meeting time by 30% because everyone can track progress and communicate directly through the platform.",
                name: "Emily Rodriguez",
                title: "Operations Director at GrowthCo",
                avatar: "",
        },
];

const Testimonials = () => {
        return (
                <section id="testimonials" className="py-24 bg-white">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-16">
                                        <p className="text-sm font-medium text-taskpurple-600 uppercase tracking-wider">Testimonials</p>
                                        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                                Loved by teams everywhere
                                        </h2>
                                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                                Here&apos;s what our users have to say about how TaskVista has improved their productivity.
                                        </p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                        {testimonials.map((testimonial, index) => (
                                                <Card key={index} className="border border-gray-200">
                                                        <CardContent className="p-6">
                                                                <div className="flex text-amber-400 mb-4">
                                                                        {[...Array(5)].map((_, i) => (
                                                                                <Star key={i} className="h-5 w-5 fill-current" />
                                                                        ))}
                                                                </div>
                                                                <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                                                                <div className="flex items-center">
                                                                        <Image
                                                                                src={testimonial.avatar}
                                                                                alt={testimonial.name}
                                                                                height={48}
                                                                                width={48}
                                                                                className="h-12 w-12 rounded-full object-cover mr-4"
                                                                        />
                                                                        <div>
                                                                                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                                                                <p className="text-sm text-gray-600">{testimonial.title}</p>
                                                                        </div>
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        ))}
                                </div>

                                <div className="mt-16 bg-gray-100 rounded-xl p-8 text-center">
                                        <div className="flex justify-center mb-6">
                                                <div className="flex space-x-2">
                                                        {/* Company logos */}
                                                        {["Acme Inc", "Globex", "Initech", "Umbrella", "Stark Industries"].map((company, i) => (
                                                                <div
                                                                        key={i}
                                                                        className="h-8 px-4 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-800 font-medium text-sm"
                                                                >
                                                                        {company}
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                        <p className="text-gray-700 max-w-2xl mx-auto">
                                                Join thousands of companies that use TaskVista to streamline their workflow and boost productivity.
                                        </p>
                                </div>
                        </div>
                </section>
        );
};

export default Testimonials;
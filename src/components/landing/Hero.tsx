import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Hero = () => {
        return (
                <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-white to-gray-50">
                        <div className="absolute inset-0 bg-hero-pattern bg-bottom bg-no-repeat bg-contain opacity-10"></div>
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                                <div className="text-center max-w-4xl mx-auto mb-16">
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                                                <span className="gradient-text">Simplify your tasks.</span>
                                                <br />
                                                <span className="text-gray-900">Amplify your productivity.</span>
                                        </h1>
                                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                                TaskVista helps teams organize, track, and manage their work with powerful features
                                                that adapt to your workflow.
                                        </p>

                                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                                                <Button size="lg" className="bg-taskpurple-500 hover:bg-taskpurple-600 text-white px-8">
                                                        Get Started — Free Forever
                                                </Button>
                                                <Button size="lg" variant="outline" className="border-gray-300">
                                                        See how it works
                                                </Button>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-taskpurple-500 mr-2" />
                                                        <span>No credit card required</span>
                                                </div>
                                                <div className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-taskpurple-500 mr-2" />
                                                        <span>Free plan available</span>
                                                </div>
                                                <div className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-taskpurple-500 mr-2" />
                                                        <span>Cancel anytime</span>
                                                </div>
                                        </div>
                                </div>

                                <div className="relative max-w-5xl mx-auto">
                                        {/* App Screenshot */}
                                        <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
                                                <div className="h-8 bg-gray-100 flex items-center px-4 border-b border-gray-200">
                                                        <div className="flex space-x-2">
                                                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                        </div>
                                                </div>
                                                <div className="flex h-[32rem] overflow-hidden bg-gray-50">
                                                        {/* Left sidebar mockup */}
                                                        <div className="hidden md:block w-56 bg-white border-r border-gray-200 py-6 px-4">
                                                                <div className="h-8 w-32 bg-gray-200 rounded-md mb-6"></div>
                                                                <div className="space-y-2">
                                                                        {[1, 2, 3, 4, 5].map((i) => (
                                                                                <div key={i} className="flex items-center gap-3">
                                                                                        <div className="w-4 h-4 rounded-full bg-taskpurple-200"></div>
                                                                                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                                                                                </div>
                                                                        ))}
                                                                </div>
                                                        </div>

                                                        {/* Main content mockup */}
                                                        <div className="flex-1 p-6">
                                                                <div className="mb-8">
                                                                        <div className="h-8 w-64 bg-gray-200 rounded-md mb-6"></div>
                                                                        <div className="h-4 bg-gray-200 rounded w-full max-w-md mb-2"></div>
                                                                        <div className="h-4 bg-gray-200 rounded w-full max-w-sm"></div>
                                                                </div>

                                                                <div className="space-y-4">
                                                                        {[1, 2, 3, 4].map((i) => (
                                                                                <div key={i} className="p-4 bg-white rounded-lg border border-gray-200 flex items-start gap-3">
                                                                                        <div className="w-5 h-5 rounded-full bg-taskpurple-400 mt-1 flex-shrink-0"></div>
                                                                                        <div className="flex-1">
                                                                                                <div className="h-5 bg-gray-200 rounded w-full max-w-sm mb-2"></div>
                                                                                                <div className="h-4 bg-gray-100 rounded w-full max-w-xs"></div>
                                                                                        </div>
                                                                                        <div className="flex gap-2">
                                                                                                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                                                                                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                                                                                        </div>
                                                                                </div>
                                                                        ))}
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>

                                        {/* Floating elements for decoration */}
                                        <div className="absolute -top-6 -left-6 w-16 h-16 bg-taskpurple-100 rounded-lg animate-float"></div>
                                        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-taskpurple-200 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                                        <div className="absolute top-1/4 -right-4 w-10 h-10 bg-taskpurple-300 rounded-lg animate-float" style={{ animationDelay: '1.5s' }}></div>
                                </div>
                        </div>
                </section>
        );
};

export default Hero;
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
        return (
                <>
                        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
                                <div className="container mx-auto px-4">
                                        <div className="max-w-4xl mx-auto text-center">
                                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--taskmandu-primary-text)] mb-6 leading-tight">
                                                        Manage Tasks with Ease and Efficiency
                                                </h1>
                                                <p className="text-base sm:text-lg md:text-xl text-[color-mix(in srgb, var(--taskmandu-primary-text) 80%, white)] mb-8 px-4">
                                                        Streamline your workflow, collaborate seamlessly, and achieve more with Taskmandu&apos;s intuitive task management platform.
                                                </p>
                                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                                        <Button
                                                                size="lg"
                                                                className="bg-[var(--taskmandu-primary)] hover:bg-[color-mix(in srgb, var(--taskmandu-primary) 90%, white)] text-[var(--taskmandu-pure-white)] w-full sm:w-auto"
                                                        >
                                                                Start Free Trial
                                                        </Button>
                                                        <Button
                                                                size="lg"
                                                                variant="outline"
                                                                className="w-full sm:w-auto border-[var(--taskmandu-primary)] text-[var(--taskmandu-primary)] hover:bg-[var(--taskmandu-background)]"
                                                        >
                                                                Watch Demo
                                                        </Button>
                                                </div>
                                        </div>
                                </div>
                        </section>
                </>
        );
};

export default HeroSection;

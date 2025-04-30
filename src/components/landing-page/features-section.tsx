import React from "react";
import FeatureCard from "./feature-card";
import { CheckCheck, Clock, Users } from "lucide-react";
import Container from "../containers/main-container";

const FeatureSection = () => {
        return (
                <section className="py-12   md:py-16 bg-[var(--taskmandu-pure-white)]" id="features">
                        <Container className="container mx-auto px-4">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[var(--taskmandu-primary-text)] mb-12">
                                        Why Choose Taskmandu?
                                </h2>
                                <Container className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                        <FeatureCard
                                                icon={<CheckCheck className="h-8 w-8 text-[var(--taskmandu-primary)]" />}
                                                title="Simple Task Management"
                                                description="Organize and track your tasks with an intuitive interface designed for efficiency."
                                        />
                                        <FeatureCard
                                                icon={<Users className="h-8 w-8 text-[var(--taskmandu-primary)]" />}
                                                title="Team Collaboration"
                                                description="Work together seamlessly with real-time updates and easy task delegation."
                                        />
                                        <FeatureCard
                                                icon={<Clock className="h-8 w-8 text-[var(--taskmandu-primary)]" />}
                                                title="Time Tracking"
                                                description="Monitor project progress and team productivity with built-in time tracking."
                                        />
                                </Container>
                        </Container>
                </section>
        );
};

export default FeatureSection;

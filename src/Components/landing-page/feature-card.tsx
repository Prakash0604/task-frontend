const FeatureCard = ({
        icon,
        title,
        description,
}: { icon: React.ReactNode; title: string; description: string }) => {
        return (
                <div className="p-6 rounded-lg border border-[var(--taskmandu-secondary-text)] hover:shadow-lg transition-shadow">
                        <div className="mb-4">{icon}</div>
                        <h3 className="text-xl font-semibold text-[var(--taskmandu-primary-text)] mb-2">
                                {title}
                        </h3>
                        <p className="text-[color-mix(in srgb, var(--taskmandu-primary-text) 70%, transparent)]">
                                {description}
                        </p>
                </div>
        );
};

export default FeatureCard;

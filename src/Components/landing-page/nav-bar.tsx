import { Button } from "@/components/ui/button";
import { ListChecks, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
        const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

        return (
                <nav className="fixed top-0 w-full bg-[var(--taskmandu-pure-white)] shadow-sm z-50">
                        <div className="container mx-auto px-4 py-3">
                                <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                                <ListChecks className="h-6 w-6 text-[var(--taskmandu-primary)]" />
                                                <span className="text-xl font-bold text-[var(--taskmandu-primary)]">Taskmandu</span>
                                        </div>

                                        {/* Mobile menu button */}
                                        <button
                                                className="md:hidden p-2 text-[var(--taskmandu-primary)]"
                                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        >
                                                <Menu className="h-6 w-6" />
                                        </button>

                                        {/* Desktop navigation */}
                                        <div className="hidden md:flex items-center space-x-8">
                                                <Link
                                                        href="#features"
                                                        className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
                                                >
                                                        Features
                                                </Link>
                                                <Link
                                                        href="#about"
                                                        className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
                                                >
                                                        About
                                                </Link>
                                                <Link
                                                        href="#pricing"
                                                        className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
                                                >
                                                        Pricing
                                                </Link>
                                        </div>

                                        <div className="hidden md:flex items-center space-x-4">
                                                <Link href="/login" className="text-[var(--taskmandu-primary)]">
                                                        Login
                                                </Link>
                                        </div>
                                </div>

                                {/* Mobile menu */}
                                {isMenuOpen && (
                                        <div className="md:hidden py-4 space-y-4">
                                                <div className="flex flex-col space-y-3">
                                                        <Link
                                                                href="#features"
                                                                className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
                                                        >
                                                                Features
                                                        </Link>
                                                        <Link
                                                                href="#about"
                                                                className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
                                                        >
                                                                About
                                                        </Link>
                                                        <Link
                                                                href="#pricing"
                                                                className="text-[var(--taskmandu-primary-text)] hover:text-[var(--taskmandu-primary)] transition-colors"
                                                        >
                                                                Pricing
                                                        </Link>
                                                </div>
                                                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                                                        <Button variant="ghost" className="text-[var(--taskmandu-primary)] w-full">
                                                                Login
                                                        </Button>

                                                </div>
                                        </div>
                                )}
                        </div>
                </nav>
        );
};

export default Navbar;

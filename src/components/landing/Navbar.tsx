import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);

        const toggleMenu = () => {
                setIsMenuOpen(!isMenuOpen);
        };

        return (
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                        <div className="flex items-center">
                                                <a href="#" className="flex items-center">
                                                        <svg
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="w-6 h-6 text-taskpurple-500"
                                                        >
                                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                                        </svg>
                                                        <span className="ml-2 text-xl font-bold text-gray-900">TaskVista</span>
                                                </a>
                                        </div>

                                        {/* Desktop Navigation */}
                                        <nav className="hidden md:flex space-x-10">
                                                <a href="#features" className="text-base font-medium text-gray-700 hover:text-taskpurple-500 transition-colors">
                                                        Features
                                                </a>
                                                <a href="#how-it-works" className="text-base font-medium text-gray-700 hover:text-taskpurple-500 transition-colors">
                                                        How It Works
                                                </a>
                                                <a href="#testimonials" className="text-base font-medium text-gray-700 hover:text-taskpurple-500 transition-colors">
                                                        Testimonials
                                                </a>
                                                <a href="#pricing" className="text-base font-medium text-gray-700 hover:text-taskpurple-500 transition-colors">
                                                        Pricing
                                                </a>
                                        </nav>

                                        {/* CTA Buttons */}
                                        <div className="hidden md:flex items-center space-x-4">
                                                <Button variant="ghost">Log in</Button>
                                                <Button variant="default" className="bg-taskpurple-500 hover:bg-taskpurple-600">
                                                        Sign up free
                                                </Button>
                                        </div>

                                        {/* Mobile menu button */}
                                        <div className="md:hidden">
                                                <button
                                                        type="button"
                                                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-taskpurple-500 hover:bg-gray-100 focus:outline-none"
                                                        onClick={toggleMenu}
                                                >
                                                        <span className="sr-only">Open main menu</span>
                                                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                                                </button>
                                        </div>
                                </div>
                        </div>

                        {/* Mobile menu */}
                        {isMenuOpen && (
                                <div className="md:hidden bg-white border-b border-gray-200">
                                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                                <a
                                                        href="#features"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-taskpurple-500 hover:bg-gray-50"
                                                        onClick={toggleMenu}
                                                >
                                                        Features
                                                </a>
                                                <a
                                                        href="#how-it-works"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-taskpurple-500 hover:bg-gray-50"
                                                        onClick={toggleMenu}
                                                >
                                                        How It Works
                                                </a>
                                                <a
                                                        href="#testimonials"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-taskpurple-500 hover:bg-gray-50"
                                                        onClick={toggleMenu}
                                                >
                                                        Testimonials
                                                </a>
                                                <a
                                                        href="#pricing"
                                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-taskpurple-500 hover:bg-gray-50"
                                                        onClick={toggleMenu}
                                                >
                                                        Pricing
                                                </a>
                                                <div className="pt-4 pb-2 border-t border-gray-200">
                                                        <Button variant="outline" className="w-full mb-2">Log in</Button>
                                                        <Button variant="default" className="w-full bg-taskpurple-500 hover:bg-taskpurple-600">Sign up free</Button>
                                                </div>
                                        </div>
                                </div>
                        )}
                </header>
        );
};

export default Navbar;
import { ListChecks, Mail, Copyright } from "lucide-react";
import Link from "next/link";

const Footer = () => {
        return (
                <footer className="bg-white py-12 border-t border-gray-100">
                        <div className="container mx-auto px-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        {/* Brand Section */}
                                        <div className="col-span-1">
                                                <div className="flex items-center space-x-2 mb-4">
                                                        <ListChecks className="h-6 w-6 text-[var(--taskmandu-primary)]" />
                                                        <span className="text-xl font-bold text-[var(--taskmandu-primary)]">Taskmandu</span>
                                                </div>
                                                <p className="text-[var(--taskmandu-primary-text)]/70 text-sm">
                                                        Streamline your workflow and boost productivity with our intuitive task management platform.
                                                </p>
                                        </div>

                                        {/* Quick Links */}
                                        <div className="col-span-1">
                                                <h4 className="font-semibold text-[var(--taskmandu-primary-text)] mb-4">Quick Links</h4>
                                                <ul className="space-y-2">
                                                        <li><Link href="#features" className="text-[var(--taskmandu-primary-text)]/70 hover:text-[var(--taskmandu-primary)] transition-colors">Features</Link></li>
                                                        <li><Link href="#about" className="text-[var(--taskmandu-primary-text)]/70 hover:text-[var(--taskmandu-primary)] transition-colors">About</Link></li>
                                                        <li><Link href="#pricing" className="text-[var(--taskmandu-primary-text)]/70 hover:text-[var(--taskmandu-primary)] transition-colors">Pricing</Link></li>
                                                </ul>
                                        </div>

                                        {/* Support */}
                                        <div className="col-span-1">
                                                <h4 className="font-semibold text-[var(--taskmandu-primary-text)] mb-4">Support</h4>
                                                <ul className="space-y-2">
                                                        <li><Link href="#" className="text-[var(--taskmandu-primary-text)]/70 hover:text-[var(--taskmandu-primary)] transition-colors">Help Center</Link></li>
                                                        <li><Link href="#" className="text-[var(--taskmandu-primary-text)]/70 hover:text-[var(--taskmandu-primary)] transition-colors">Contact Us</Link></li>
                                                        <li><Link href="#" className="text-[var(--taskmandu-primary-text)]/70 hover:text-[var(--taskmandu-primary)] transition-colors">FAQ</Link></li>
                                                </ul>
                                        </div>

                                        {/* Contact */}
                                        <div className="col-span-1">
                                                <h4 className="font-semibold text-[var(--taskmandu-primary-text)] mb-4">Contact</h4>
                                                <div className="flex items-center space-x-2 mb-2">
                                                        <Mail className="h-4 w-4 text-[var(--taskmandu-primary)]" />
                                                        <Link href="mailto:support@taskmandu.com" className="text-[var(--taskmandu-primary-text)]/70 hover:text-[var(--taskmandu-primary)] transition-colors">support@taskmandu.com</Link>
                                                </div>
                                        </div>
                                </div>

                                {/* Bottom Footer */}
                                <div className="border-t border-gray-100 mt-8 pt-6 text-center">
                                        <div className="flex items-center justify-center space-x-2 text-[var(--taskmandu-primary-text)]/70">
                                                <Copyright className="h-4 w-4" />
                                                <span>{new Date().getFullYear()}Taskmandu. All rights reserved.</span>
                                        </div>
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;

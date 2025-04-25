"use client";
import { Check, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

interface FooterLink {
  name: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: JSX.Element;
}

const footerLinks: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Guides", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Security", href: "#" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "#",
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    name: "GitHub",
    href: "#",
    icon: <Github className="w-5 h-5" />,
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 flex flex-col justify-between ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 dark:text-white md:pl-32 pl-auto">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors dark:text-gray-300 dark:hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="bg-[#2596be] text-white p-2 rounded">
              <Check size={18} />
            </div>
            <span className="font-bold dark:text-white">TaskMandu</span>
          </div>
          <p className="text-gray-400 text-sm dark:text-gray-300">
            © 2025 TaskFlow Inc. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors dark:text-gray-300 dark:hover:text-white"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

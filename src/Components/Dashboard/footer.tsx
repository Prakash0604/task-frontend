"use client";
import Container from "@/Container/container";
import { Check } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  const footerLinks = [
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

  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container className="container mx-auto px-4 md:px-6">
        <Container className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section, index) => (
            <Container key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          ))}
        </Container>
        <Container className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <Container className="flex items-center space-x-2 mb-4 md:mb-0">
            <Container className="bg-indigo-600 text-white p-2 rounded">
              <Check size={18} />
            </Container>
            <span className="font-bold">TaskFlow</span>
          </Container>
          <p className="text-gray-400 text-sm">
            © 2025 TaskFlow Inc. All rights reserved.
          </p>
          <Container className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Container className="w-6 h-6 bg-gray-700 rounded-full">
                <></>
              </Container>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
            </a>
          </Container>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;

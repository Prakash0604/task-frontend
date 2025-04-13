"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ChevronRight, Check, ArrowRight, Users, Calendar, Clock, Star, Menu, X } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentTestimonial]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const testimonials = [
    {
      text: "TaskFlow transformed our team's productivity. We're completing projects 30% faster than before.",
      author: "Sarah Johnson",
      role: "Product Manager, Acme Inc."
    },
    {
      text: "The interface is intuitive and the analytics provide invaluable insights into our workflow.",
      author: "Michael Chen",
      role: "CTO, TechSavvy"
    },
    {
      text: "We've reduced meeting time by 40% since implementing TaskFlow across our organization.",
      author: "Emily Rodriguez",
      role: "Director of Operations, Quantum Solutions"
    }
  ];

  const features = [
    {
      icon: <Users size={24} className="text-indigo-500" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team in real-time with shared workspaces and instant updates."
    },
    {
      icon: <Calendar size={24} className="text-indigo-500" />,
      title: "Smart Scheduling",
      description: "Intelligent deadline management and calendar integration to keep your projects on track."
    },
    {
      icon: <Clock size={24} className="text-indigo-500" />,
      title: "Time Tracking",
      description: "Monitor time spent on tasks and projects with detailed analytics and reporting."
    }
  ];

  return (
    <>
      <Head>
        <title>TaskFlow | Modern Task Management Solution</title>
        <meta name="description" content="Streamline your workflow with TaskFlow - the all-in-one task management platform for teams and individuals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm py-4 fixed top-0 w-full z-50">
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-indigo-600 text-white p-2 rounded"
              >
                <Check size={20} />
              </motion.div>
              <span className="text-xl font-bold text-gray-900">TaskFlow</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</a>
              <a href="#faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</a>
              <a href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white px-4 py-4 border-t border-gray-100"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</a>
                <a href="#faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</a>
                <div className="pt-2 border-t border-gray-100">
                  <a href="/login" className="block text-gray-600 hover:text-indigo-600 transition-colors py-2">Login</a>
                  <a href="/signup" className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center mt-2">
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="md:w-1/2 mb-12 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                  Manage Tasks <span className="text-indigo-600">Effortlessly</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  TaskFlow helps teams organize, track, and manage their work with powerful features designed for productivity and collaboration.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.a
                    href="/signup"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md text-center flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Start for free</span>
                    <ArrowRight size={18} />
                  </motion.a>
                  <a href="#demo" className="border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-md text-center hover:bg-gray-50 transition-colors">
                    Watch demo
                  </a>
                </div>
                <div className="mt-8 flex items-center text-sm text-gray-500">
                  <p>No credit card required • Free 14-day trial</p>
                </div>
              </motion.div>

              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="bg-gray-800 h-8 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <img
                      src="/api/placeholder/600/360"
                      alt="TaskFlow Dashboard"
                      className="rounded-lg shadow-sm"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage projects and boost productivity in one intuitive platform.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  variants={fadeIn}
                >
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-20"
            >
              <div className="bg-indigo-50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100 rounded-full -mr-20 -mt-20"></div>
                <div className="relative">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
                      <p className="text-gray-600 mb-6">
                        Gain valuable insights into your team's performance with detailed reports and visualizations.
                      </p>
                      <ul className="space-y-3">
                        {['Task completion trends', 'Team productivity metrics', 'Time tracking analytics', 'Custom reporting'].map((item, i) => (
                          <li key={i} className="flex items-center">
                            <Check size={18} className="text-indigo-600 mr-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src="/api/placeholder/500/300"
                        alt="Analytics Dashboard"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-indigo-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Teams Everywhere</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what our customers have to say about how TaskFlow has transformed their workflow.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-8 relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white p-3 rounded-full">
                  <Star size={24} />
                </div>
                <div className="h-48">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: currentTestimonial === index ? 1 : 0,
                        x: currentTestimonial === index ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full"
                      style={{ display: currentTestimonial === index ? 'block' : 'none' }}
                    >
                      <p className="text-lg text-gray-700 italic mb-6">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <div className="flex flex-wrap justify-center items-center gap-8">
                {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((company, i) => (
                  <div key={i} className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="h-6 w-24 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your team's needs with no hidden fees or surprises.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Starter",
                  price: "$9",
                  description: "Perfect for individuals and small projects",
                  features: ["5 Projects", "10 Team members", "Basic analytics", "24/7 Support"],
                  popular: false
                },
                {
                  name: "Professional",
                  price: "$29",
                  description: "Ideal for growing teams and businesses",
                  features: ["Unlimited Projects", "50 Team members", "Advanced analytics", "Priority support", "Custom integrations"],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "$99",
                  description: "For large organizations with complex needs",
                  features: ["Unlimited everything", "Dedicated account manager", "Custom onboarding", "Advanced security", "API access"],
                  popular: false
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`rounded-xl shadow-sm border ${plan.popular ? 'border-indigo-200 ring-2 ring-indigo-600 bg-white relative z-10 scale-105 my-4 md:my-0' : 'border-gray-200 bg-white'}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check size={18} className="text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-3 rounded-md font-medium ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'} transition-colors`}
                    >
                      Get started
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about TaskFlow and how it can help your team.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "How does the 14-day free trial work?",
                  answer: "You can sign up for TaskFlow without a credit card and explore all features for 14 days. At the end of your trial, you can choose the plan that works best for your team. If you decide not to continue, your account will automatically switch to the limited free plan."
                },
                {
                  question: "Can I change plans later?",
                  answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. When you upgrade, you'll get immediate access to the new features. If you downgrade, the changes will take effect at the start of your next billing cycle."
                },
                {
                  question: "Is there a limit to how many tasks I can create?",
                  answer: "No, all plans include unlimited tasks. The difference between plans is in the number of projects, team members, and access to advanced features."
                },
                {
                  question: "How secure is my data?",
                  answer: "TaskFlow uses industry-standard encryption and security practices to protect your data. We use SSL/TLS for data transmission and regular security audits to ensure your information is safe and secure."
                },
                {
                  question: "Do you offer discounts for nonprofit organizations?",
                  answer: "Yes, we offer special pricing for nonprofit organizations, educational institutions, and open-source projects. Please contact our sales team for more information."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to transform your workflow?</h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of teams using TaskFlow to achieve more, with less effort.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/signup"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-md inline-flex items-center space-x-2 font-medium shadow-md hover:bg-indigo-50 transition-colors"
                >
                  <span>Start your free trial</span>
                  <ChevronRight size={18} />
                </a>
              </motion.div>
              <p className="text-indigo-200 mt-4">No credit card required • 14-day free trial</p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="bg-indigo-600 text-white p-2 rounded">
                  <Check size={18} />
                </div>
                <span className="font-bold">TaskFlow</span>
              </div>
              <p className="text-gray-400 text-sm">© 2025 TaskFlow Inc. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
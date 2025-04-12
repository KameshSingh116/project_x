'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { BookOpen, Gift, ChevronRight, Sparkles, Scale, Heart, LogIn, Search } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Sparkles className="h-6 w-6 text-blue-500" />
              </motion.div>
              <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              TinkEdX
              </Link>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="hidden md:flex items-center gap-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link href="/education" className="text-white-800 hover:text-[#1a73e8]">
                  Education
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link href="/grievance" className="text-white-800 hover:text-[#1a73e8]">
                  Grievance
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link href="/marketplace" className="text-white-800 hover:text-[#1a73e8]">
                  Marketplace
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link href="/about" className="text-white-800 hover:text-[#1a73e8]">
                  About Us
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link href="/contact" className="text-white-800 hover:text-[#1a73e8]">
                  Contact Us
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Link href="/dashboard" className="text-white-800 hover:text-[#1a73e8]">
                  Dashboard
                </Link>
              </motion.div>
            </motion.nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="default" size="sm">
                  Login
                </Button>
              </motion.div>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="container py-20 md:py-32 relative overflow-hidden">
            {/* Animated background elements */}
            <AnimatePresence>
              {isLoaded && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900 blur-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 0.9, duration: 1 }}
                    className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-pink-200 dark:bg-pink-900 blur-3xl"
                  />
                </>
              )}
            </AnimatePresence>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Empowering Education and Resolving Social Grievances with AI
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Join our vibrant community where learning meets social impact. Discover AI-powered tools that make
                  education fun and help resolve grievances effectively.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-2">
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <BookOpen className="h-10 w-10" />,
                    title: "Interactive Education Tools",
                    description: "Enhance your learning experience with our AI-powered educational tools.",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: <Scale className="h-10 w-10" />,
                    title: "Grievance Management System",
                    description: "Efficiently report and track social grievances for faster resolution.",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: <Gift className="h-10 w-10" />,
                    title: "Book Donation & Marketplace",
                    description: "Connect with others to donate or purchase books for a good cause.",
                    color: "from-amber-500 to-orange-500",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.2, duration: 0.7 }}
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${item.color} text-white mb-6`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                {[
                  {
                    number: 1,
                    icon: <LogIn className="h-6 w-6" />,
                    title: "Register/Login",
                    description: "Create an account or log in to access our services.",
                  },
                  {
                    number: 2,
                    icon: <Search className="h-6 w-6" />,
                    title: "Explore Tools",
                    description: "Discover our education and grievance management tools.",
                  },
                  {
                    number: 3,
                    icon: <Heart className="h-6 w-6" />,
                    title: "Engage Marketplace",
                    description: "Participate in our book donation and marketplace activities.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.2, duration: 0.7 }}
                    className="flex flex-col items-center text-center relative z-10"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-6"
                    >
                      {item.number}
                    </motion.div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-full">
                      <h3 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
                        {item.icon}
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="text-center max-w-2xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg mb-8 text-white/80">
                  Join thousands of users who are already benefiting from our platform.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                    Join GiftedBooks Today
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <Sparkles className="h-6 w-6 text-blue-400" />
                  <span className="text-2xl font-bold">GiftedBooks</span>
                </motion.div>
                <p className="text-gray-400">Empowering minds, resolving issues.</p>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {["Privacy Policy", "Terms of Service", "FAQ", "Blog"].map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>contact@giftedbooks.com</li>
                  <li>(123) 456-7890</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ y: -5 }}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">
              <p>© 2024 GiftedBooks. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}


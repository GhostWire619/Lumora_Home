"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import ThemeToggle from "@/components/theme-toggle"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "services", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const smoothScrollTo = (elementId: string) => {
    if (typeof window === "undefined") return

    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-blue-500/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo("home")
                }}
                className={`transition-colors duration-200 font-medium ${
                  activeSection === "home" ? "text-blue-600" : "text-foreground hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                href="#services"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo("services")
                }}
                className={`transition-colors duration-200 font-medium ${
                  activeSection === "services" ? "text-blue-600" : "text-foreground hover:text-blue-600"
                }`}
              >
                Services
              </Link>
              <Link
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo("about")
                }}
                className={`transition-colors duration-200 font-medium ${
                  activeSection === "about" ? "text-blue-600" : "text-foreground hover:text-blue-600"
                }`}
              >
                About
              </Link>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  smoothScrollTo("contact")
                }}
                className={`transition-colors duration-200 font-medium ${
                  activeSection === "contact" ? "text-blue-600" : "text-foreground hover:text-blue-600"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => smoothScrollTo("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-blue-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo("home")
              }}
              className="block px-3 py-2 text-foreground hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#services"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo("services")
              }}
              className="block px-3 py-2 text-foreground hover:text-blue-600 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo("about")
              }}
              className="block px-3 py-2 text-foreground hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo("contact")
              }}
              className="block px-3 py-2 text-foreground hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              <Button
                onClick={() => smoothScrollTo("contact")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

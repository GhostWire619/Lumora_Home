"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Twitter, Linkedin, Mail, ArrowUp, Heart, MessageCircle } from "lucide-react"
import Logo from "@/components/logo"

const footerLinks = {
  services: [
    { name: "Web Development", href: "#services" },
    { name: "Mobile Apps", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "Custom Development", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Portfolio", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Case Studies", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Support", href: "#" },
    { name: "Documentation", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://wa.me/255749498117", label: "WhatsApp" },
]

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-background border-t border-blue-500/20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Logo className="h-12 mb-4" />
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Professional digital solutions with cutting-edge technology and strategic excellence.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-foreground font-semibold">Stay Updated</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-white/5 border-blue-500/30 text-foreground placeholder:text-muted-foreground focus:border-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-4">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-foreground font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="lg:col-span-1">
            <h4 className="text-foreground font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/5 border border-blue-500/30 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
                    aria-label={social.label}
                    target={social.href.startsWith("http") ? "_blank" : "_self"}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📧 lugata619@gmail.com</p>
              <p>📞 +255749498117</p>
              <p>📞 +255715959523</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {new Date().getFullYear()} Lumora. Built with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for professional excellence</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-blue-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-blue-600 text-sm transition-colors">
              Terms of Service
            </Link>
            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-blue-500/20"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

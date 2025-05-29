"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  Building,
  MessageCircle,
  Instagram,
  Twitter,
  Linkedin,
  MapPin,
  Clock,
  Award,
  Users,
} from "lucide-react"

const socialLinks = [
  {
    icon: Instagram,
    name: "Instagram",
    href: "#",
    color: "from-pink-500 to-red-500",
    followers: "10K+",
  },
  {
    icon: Twitter,
    name: "Twitter",
    href: "#",
    color: "from-blue-400 to-blue-600",
    followers: "5K+",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    href: "#",
    color: "from-blue-600 to-indigo-600",
    followers: "15K+",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp",
    href: "https://wa.me/255749498117",
    color: "from-emerald-500 to-emerald-600",
    followers: "24/7",
  },
]

const contactLogos = [
  {
    icon: MessageCircle,
    name: "WhatsApp",
    value: "+255749498117",
    action: () => window.open("https://wa.me/255749498117", "_blank"),
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Phone,
    name: "Call",
    value: "+255749498117",
    action: () => window.open("tel:+255749498117", "_blank"),
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Mail,
    name: "Email",
    value: "lugata619@gmail.com",
    action: () => window.open("mailto:lugata619@gmail.com", "_blank"),
    color: "from-purple-500 to-purple-600",
  },
]

const companyInfo = [
  {
    icon: MapPin,
    title: "Global Presence",
    description: "Serving clients worldwide",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Always here to help",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "Industry standards",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "50+ professionals",
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 relative bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/10 via-background to-background" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-full border border-emerald-500/30 mb-8">
            <Building className="w-5 h-5 text-emerald-600 mr-3" />
            <span className="text-sm font-semibold text-emerald-600 tracking-wide uppercase">Get In Touch</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground">
            Let's Build Something
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              Amazing
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ready to transform your business with professional digital solutions? Get in touch with our expert team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Logos */}
          <div className="flex justify-center gap-8 mb-16">
            {contactLogos.map((contact, index) => {
              const Icon = contact.icon
              return (
                <div
                  key={index}
                  onClick={contact.action}
                  className="group cursor-pointer text-center transition-all duration-300 transform hover:scale-110"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-foreground font-semibold mb-1">{contact.name}</h4>
                  <p className="text-muted-foreground text-sm">{contact.value}</p>
                </div>
              )
            })}
          </div>

          {/* Company Information */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {companyInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-foreground font-bold mb-2">{info.title}</h4>
                  <p className="text-muted-foreground text-sm">{info.description}</p>
                </div>
              )
            })}
          </div>

          {/* Social Media Logos */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Follow{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                Our Journey
              </span>
            </h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="group text-center transition-all duration-300 transform hover:scale-110"
                    target={social.href.startsWith("http") ? "_blank" : "_self"}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-r ${social.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-foreground font-semibold text-sm mb-1">{social.name}</h4>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      {social.followers}
                    </Badge>
                  </a>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Card className="relative overflow-hidden bg-gradient-to-r from-emerald-600/10 via-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-emerald-500/30">
              <CardContent className="p-12">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6">
                  Professional Excellence
                </Badge>
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 mb-4">
                  Start Your Project Today
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join hundreds of satisfied clients who have transformed their businesses with our digital solutions.
                </p>
                <Button
                  onClick={() => window.open("https://wa.me/255749498117", "_blank")}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg"
                >
                  Get Free Consultation
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

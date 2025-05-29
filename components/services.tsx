"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Smartphone, Palette, Code, Zap, ArrowRight, Briefcase, CreditCard } from "lucide-react"

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
}

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive websites that drive results",
    features: ["Responsive Design", "Fast Loading", "SEO Optimized", "AI & ML Integration"],
    color: "bg-blue-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    features: ["iOS & Android", "Cross-Platform", "App Store Ready", "AI & ML Integration"],
    color: "bg-slate-600",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Professional designs that convert visitors to customers",
    features: ["User Research", "Wireframing", "Prototyping", "Brand Identity"],
    color: "bg-indigo-600",
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored solutions for your unique business needs",
    features: ["Custom Solutions", "API Integration", "Database Design", "AI & ML Integration"],
    color: "bg-gray-600",
  },
  {
    icon: CreditCard,
    title: "Payment Solutions",
    description: "Secure payment systems for your business",
    features: ["Online Payments", "Mobile Money", "Secure Checkout", "Multiple Currencies"],
    color: "bg-emerald-600",
  },
  {
    icon: Zap,
    title: "Digital Marketing",
    description: "Grow your business with strategic digital marketing",
    features: ["Social Media", "SEO Services", "Content Marketing", "Analytics"],
    color: "bg-violet-600",
  },
]

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="services" className="py-20 px-4 relative bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-950/10 to-background" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/30 mb-6">
            <Briefcase className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-600">Our Services</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            What We <span className="text-blue-600">Create</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to launch, we deliver professional digital experiences that drive business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className={`bg-card border-blue-500/20 backdrop-blur-sm transition-all duration-500 transform hover:scale-105 hover:border-blue-500/50 ${
                  hoveredCard === index ? "shadow-2xl shadow-blue-500/25" : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-foreground text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <Badge
                        key={featureIndex}
                        variant="outline"
                        className="border-blue-500/30 text-blue-600 hover:bg-blue-500/10"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => smoothScrollTo("contact")}
                    className="w-full text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

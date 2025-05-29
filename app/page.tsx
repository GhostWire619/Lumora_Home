"use client"

import { Suspense, useEffect, useState } from "react"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return <div className="min-h-screen bg-black" />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <Hero />
      </Suspense>
      <Services />
      <About />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Box } from "lucide-react";

// Create a fallback component that doesn't use Three.js
const ThreeDFallback = () => (
  <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-600/20 to-slate-600/20 rounded-lg">
    <div className="text-center">
      <Box className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
      <h3 className="text-xl font-semibold text-blue-500">3D Experience</h3>
      <p className="text-muted-foreground max-w-xs mx-auto mt-2">
        Interactive 3D elements will appear here on compatible browsers
      </p>
    </div>
  </div>
);

// Lazily load the 3D component only on client and with error boundaries
const ThreeDContent = dynamic(
  () =>
    import("./three-components/hero-3d")
      .then((mod) => mod.default)
      .catch(() => ThreeDFallback),
  {
    ssr: false,
    loading: () => <ThreeDFallback />,
  }
);

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const smoothScrollTo = (elementId: string) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Enhanced Three.js Background */}
      <div className="absolute inset-0 z-0">
        {isMounted && <ThreeDContent />}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-background/70 to-slate-900/30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-blue-500/30">
          <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-300">
            Professional Digital Solutions
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
          Illuminate Your <span className="text-blue-600">Vision</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          We create professional digital experiences that drive business growth
          with cutting-edge technology and strategic design.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => smoothScrollTo("contact")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            onClick={() => smoothScrollTo("services")}
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            View Our Services
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-slate-500/20 rounded-full opacity-60 animate-bounce" />
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-blue-600/20 rounded-full opacity-60 animate-ping" />
    </section>
  );
}

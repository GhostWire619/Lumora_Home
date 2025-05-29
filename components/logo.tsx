"use client"

import Image from "next/image"

export default function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/images/lumora-logo.png"
        alt="Lumora"
        width={360}
        height={96}
        className="h-16 w-auto md:h-20 md:w-auto"
        priority
      />
    </div>
  )
}

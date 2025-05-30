import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lumora - Modern Web Solutions",
  description: "Professional web development, mobile apps, and digital solutions with AI & ML integration",
  keywords: "web development, mobile apps, AI integration, digital solutions, custom development",
  authors: [{ name: "Lumora Team" }],
  creator: "Lumora",
  publisher: "Lumora",
  openGraph: {
    title: "Lumora - Modern Web Solutions",
    description: "Professional web development, mobile apps, and digital solutions with AI & ML integration",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumora - Modern Web Solutions",
    description: "Professional web development, mobile apps, and digital solutions with AI & ML integration",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

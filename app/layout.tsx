import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Tanish - Developer Portfolio",
  description: "Modern developer portfolio showcasing AI-powered apps and web experiences",
  generator: "v0.app",
  keywords: ["developer", "portfolio", "AI", "web development", "Next.js"],
  authors: [{ name: "Tanish" }],
  openGraph: {
    title: "Tanish - Developer Portfolio",
    description: "Modern developer portfolio showcasing AI-powered apps and web experiences",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-serif: ${cinzel.variable};
}
        `}</style>
      </head>
      <body className={`${cinzel.variable} ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

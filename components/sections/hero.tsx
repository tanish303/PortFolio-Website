"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, MessageCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

function TypewriterText() {
  const sentences = ["Web Developer", "DSA Enthusiast", "Software Developer"]
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentSentence = sentences[currentSentenceIndex]

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, 2000) // Pause for 2 seconds before deleting
      return () => clearTimeout(pauseTimer)
    }

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentSentence.length) {
            setCurrentText(currentSentence.slice(0, currentText.length + 1))
          } else {
            setIsPaused(true)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    ) // Faster deletion, slower typing

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, currentSentenceIndex, sentences])

  return (
    <span className="text-primary font-bold">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function Hero() {
  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleAIAssistantClick = () => {
    // This would trigger the AI assistant - for now, we'll scroll to contact
    handleContactClick()
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-12 md:px-20 lg:px-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Left Side - Main Content */}
          <div className="space-y-6 animate-fade-up px-4 lg:px-0">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tanish</span>
            </h1>

            {/* Subtitle with Typewriter Animation */}
            <div className="text-lg md:text-xl leading-relaxed">
              <span className="text-muted-foreground">I'm a </span>
              <TypewriterText />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                onClick={handleAIAssistantClick}
                size="lg"
                className={cn(
                  "rounded-full px-6 py-5 text-base font-medium transition-all duration-300",
                  "bg-primary/20 backdrop-blur-md border border-primary/30",
                  "hover:bg-primary/30 hover:scale-105 hover:shadow-lg",
                  "group",
                )}
              >
                <MessageCircle className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Ask AI Assistant
              </Button>

              <Button
                onClick={handleContactClick}
                variant="outline"
                size="lg"
                className={cn(
                  "rounded-full px-6 py-5 text-base font-medium transition-all duration-300",
                  "bg-card/20 backdrop-blur-md border border-border/50",
                  "hover:bg-card/40 hover:scale-105 hover:shadow-lg",
                  "group",
                )}
              >
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Contact Me
              </Button>
            </div>
          </div>

          {/* Right Side - Developer Illustration */}
          <div className="flex items-center justify-center lg:justify-start animate-fade-up delay-300 px-4 lg:px-0">
            <div className="relative">
              <img
                src="/coderimage.png?height=400&width=400"
                alt="Developer working at desk"
                className="w-full max-w-sm h-auto drop-shadow-2xl"
              />

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce delay-1000" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/20 rounded-full animate-bounce delay-500" />
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-accent/20 rounded-full animate-bounce delay-700" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={handleScrollToProjects}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce-slow group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

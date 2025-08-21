"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, MessageCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 text-center">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Tanish</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I build AI-powered apps & modern web experiences
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              onClick={handleAIAssistantClick}
              size="lg"
              className={cn(
                "rounded-full px-8 py-6 text-lg font-medium transition-all duration-300",
                "bg-primary/20 backdrop-blur-md border border-primary/30",
                "hover:bg-primary/30 hover:scale-105 hover:shadow-lg",
                "group",
              )}
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Ask AI Assistant
            </Button>

            <Button
              onClick={handleContactClick}
              variant="outline"
              size="lg"
              className={cn(
                "rounded-full px-8 py-6 text-lg font-medium transition-all duration-300",
                "bg-card/20 backdrop-blur-md border border-border/50",
                "hover:bg-card/40 hover:scale-105 hover:shadow-lg",
                "group",
              )}
            >
              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Contact Me
            </Button>
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

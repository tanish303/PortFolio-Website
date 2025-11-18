"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Download, Volume2, VolumeX, MessageCircle, Sun, Moon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { AIAssistant } from "@/components/ai-assistant"
import { useAI } from "@/components/providers/ai-provider"

function Tooltip({ text }: { text: string }) {
  return (
    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-card border border-border rounded-md text-xs font-medium text-card-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 shadow-md">
      {text}
    </div>
  )
}

export function FixedButtons() {
  const { theme, setTheme } = useTheme()
  const [isSoundOn, setIsSoundOn] = useState(false)
  const { isOpen: isAIOpen, setIsOpen: setIsAIOpen } = useAI()

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/TANISH_RESUME.pdf";
    link.download = "TANISH_RESUME.pdf"; 
    link.click();
  };

  const toggleSound = () => {
    const audio = document.getElementById("bg-audio") as HTMLAudioElement | null
    if (!audio) return

    if (isSoundOn) {
      audio.pause()
      setIsSoundOn(false)
    } else {
      audio.muted = false
      audio.play()
      setIsSoundOn(true)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-40 flex flex-col space-y-3">
        {/* Resume Download Button */}
        <div className="group relative">
          <Button
            onClick={handleResumeDownload}
            size="sm"
            className={cn(
              "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
              theme === "dark"
                ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
                : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
            )}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Tooltip text="Download Resume" />
        </div>

        {/* Sound Toggle Button */}
        <div className="group relative">
          <Button
            onClick={toggleSound}
            size="sm"
            className={cn(
              "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
              theme === "dark"
                ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
                : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
            )}
          >
            {isSoundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Tooltip text={isSoundOn ? "Turn Sound Off" : "Turn Sound On"} />
        </div>

        {/* AI Assistant Button */}
        <div className="group relative">
          <Button
            onClick={() => setIsAIOpen(true)}
            size="sm"
            className={cn(
              "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
              theme === "dark"
                ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
                : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
            )}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Tooltip text="Ask AI Assistant" />
        </div>

        {/* Theme Toggle Button */}
        <div className="group relative">
          <Button
            onClick={toggleTheme}
            size="sm"
            className={cn(
              "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
              theme === "dark"
                ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
                : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
            )}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Tooltip text="Change Theme" />
        </div>
      </div>

      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  )
}

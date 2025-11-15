"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Download, Volume2, VolumeX, MessageCircle, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AIAssistant } from "@/components/ai-assistant"

export function FixedButtons() {
  const { theme, setTheme } = useTheme()
  const [isSoundOn, setIsSoundOn] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)

  const handleResumeDownload = () => {
    // Create a dummy PDF download - in real implementation, this would be a real resume
    const link = document.createElement("a")
    link.href = "/placeholder.svg?height=800&width=600"
    link.download = "Tanish_Resume.pdf"
    link.click()
  }

 const toggleSound = () => {
  const audio = document.getElementById("bg-audio") as HTMLAudioElement | null
  if (!audio) return

  if (isSoundOn) {
    audio.pause()
    setIsSoundOn(false)
  } else {
    audio.muted = false  // unmute if it was muted
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
        <Button
          onClick={handleResumeDownload}
          size="sm"
          className={cn(
            "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
            theme === "dark"
              ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
              : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
          )}
          title="Download Resume"
        >
          <Download className="h-4 w-4" />
        </Button>

        {/* Sound Toggle Button */}
        <Button
          onClick={toggleSound}
          size="sm"
          className={cn(
            "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
            theme === "dark"
              ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
              : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
          )}
          title={isSoundOn ? "Turn Sound Off" : "Turn Sound On"}
        >
          {isSoundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>

        {/* AI Assistant Button */}
        <Button
          onClick={() => setIsAIOpen(true)}
          size="sm"
          className={cn(
            "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
            theme === "dark"
              ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
              : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
            
          )}
          title="Ask AI Assistant"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>

        {/* Theme Toggle Button */}
        <Button
          onClick={toggleTheme}
          size="sm"
          className={cn(
            "rounded-full w-12 h-12 p-0 backdrop-blur-md transition-all duration-300",
            theme === "dark"
              ? "bg-primary/20 border border-primary/30 hover:bg-card/40 hover:scale-110"
              : "bg-accent/20 border border-accent/30 hover:bg-muted/40 hover:scale-110",
          )}
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  )
}

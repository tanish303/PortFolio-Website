"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const aiResponses = [
  "Thanks for your interest! Tanish specializes in AI-powered applications and modern web development using React, Next.js, and TypeScript.",
  "Tanish has experience with various technologies including Node.js, Python, PostgreSQL, and cloud platforms like AWS. Feel free to check out the projects section!",
  "You can find Tanish's work on GitHub and connect via LinkedIn. The contact form is also a great way to reach out directly!",
  "Tanish is passionate about creating user-friendly interfaces with glassmorphism design and smooth animations, as you can see in this portfolio!",
  "For collaboration opportunities or project inquiries, please use the contact form below or reach out through the social media links.",
  "Tanish's educational background includes a focus on Computer Science with specialization in AI and Machine Learning. Check the education section for more details!",
]

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Tanish's AI assistant. I can help you learn more about his work, skills, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

 const handleSend = async () => {
  if (!inputValue.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    text: inputValue,
    isUser: true,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);

  try {
    const res = await fetch("/api/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userMessage.text }),
});


    const data = await res.json();


    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: data.reply || "Sorry, I couldn't process that.",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
  } catch (err) {
    console.log(err);
    setMessages((prev) => [
      ...prev,
      {
        id: "error-" + Date.now(),
        text: "Something went wrong. Please try again.",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }

  setIsTyping(false);
};



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card
        className={cn(
          "w-full max-w-lg h-[500px] flex flex-col",
          "bg-card/90 backdrop-blur-md border-border/50 shadow-2xl",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me about Tanish's work</p>
            </div>
          </div>
          <Button onClick={onClose} size="sm" variant="ghost" className="rounded-full w-8 h-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-3", message.isUser ? "flex-row-reverse" : "flex-row")}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                {message.isUser ? <User className="h-4 w-4 text-primary" /> : <Bot className="h-4 w-4 text-primary" />}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  message.isUser
                    ? "bg-primary/20 text-primary-foreground ml-auto"
                    : "bg-muted/50 text-muted-foreground",
                )}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted/50 rounded-lg px-3 py-2 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Tanish..."
              className="flex-1 bg-input/50 backdrop-blur-sm"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              size="sm"
              disabled={!inputValue.trim() || isTyping}
              className="rounded-full w-10 h-10 p-0 bg-primary/20 hover:bg-primary/30"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

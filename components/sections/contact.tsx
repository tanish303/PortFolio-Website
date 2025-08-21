"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/tanish",
    color: "hover:text-gray-900 dark:hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/tanish",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/tanish",
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:tanish@example.com",
    color: "hover:text-red-500",
  },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Trigger confetti effect
    if (typeof window !== "undefined") {
      // Simple confetti simulation with DOM manipulation
      const colors = ["#bed7dc", "#a0b2a1", "#f1eedc", "#393e46"]
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div")
        confetti.style.position = "fixed"
        confetti.style.left = Math.random() * 100 + "vw"
        confetti.style.top = "-10px"
        confetti.style.width = "10px"
        confetti.style.height = "10px"
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.pointerEvents = "none"
        confetti.style.zIndex = "9999"
        confetti.style.borderRadius = "50%"
        document.body.appendChild(confetti)

        const animation = confetti.animate(
          [
            { transform: "translateY(-10px) rotate(0deg)", opacity: 1 },
            { transform: `translateY(100vh) rotate(720deg)`, opacity: 0 },
          ],
          {
            duration: 3000,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          },
        )

        animation.onfinish = () => confetti.remove()
      }
    }

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card
            className={cn(
              "p-8 transition-all duration-500",
              "bg-card/40 backdrop-blur-md border border-border/50",
              "hover:bg-card/60 hover:shadow-xl",
              "animate-fade-up",
            )}
          >
            <h3 className="font-serif text-2xl font-semibold mb-6">Send me a message</h3>

            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-pulse" />
                <h4 className="font-semibold text-xl text-green-600">Message Sent!</h4>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-input/50 backdrop-blur-sm border-border/50 focus:border-primary/50 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-6 text-lg font-medium transition-all duration-300",
                    "bg-primary/20 backdrop-blur-md border border-primary/30",
                    "hover:bg-primary/30 hover:scale-105 hover:shadow-lg",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            )}
          </Card>

          {/* Contact Info & Social Links */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            {/* Contact Info */}
            <Card className="p-8 bg-card/40 backdrop-blur-md border border-border/50">
              <h3 className="font-serif text-2xl font-semibold mb-6">Let's connect</h3>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  I'm always interested in hearing about new opportunities, creative projects, or just having a
                  conversation about technology and innovation.
                </p>
                <p className="leading-relaxed">
                  Whether you're looking to build something amazing or just want to say hello, feel free to reach out!
                </p>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-8 bg-card/40 backdrop-blur-md border border-border/50">
              <h3 className="font-serif text-xl font-semibold mb-6">Find me online</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg transition-all duration-300 group",
                      "bg-card/20 backdrop-blur-sm border border-border/30",
                      "hover:bg-card/40 hover:scale-105 hover:shadow-lg",
                      social.color,
                    )}
                  >
                    <social.icon className="h-6 w-6 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

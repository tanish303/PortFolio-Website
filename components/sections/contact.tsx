"use client"

import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
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
    name: "Phone",
    icon: Phone,
    url: "tel:+1234567890",
    color: "hover:text-green-600",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:tanish@example.com",
    color: "hover:text-red-500",
  },
]

export function Contact() {
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

        <div className="mx-auto w-full md:w-2/3 lg:w-3/5 space-y-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
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
            <h3 className="font-serif text-xl font-semibold mb-6 text-center">Find me online</h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                    "bg-card/20 backdrop-blur-sm border border-border/30",
                    "hover:bg-card/40 hover:scale-105 hover:shadow-lg",
                    social.color,
                  )}
                >
                  <social.icon className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <span className="font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

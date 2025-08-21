"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  image: string
  video?: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "AI Chat Application",
    description: "A modern chat application powered by AI with real-time messaging and intelligent responses.",
    image: "/placeholder.svg?height=300&width=400",
    video: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "OpenAI", "WebSocket"],
    githubUrl: "https://github.com/tanish/ai-chat",
    liveUrl: "https://ai-chat-demo.vercel.app",
  },
  {
    id: "2",
    title: "E-commerce Dashboard",
    description:
      "A comprehensive dashboard for managing e-commerce operations with analytics and inventory management.",
    image: "/placeholder.svg?height=300&width=400",
    video: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
    githubUrl: "https://github.com/tanish/ecommerce-dashboard",
    liveUrl: "https://ecommerce-dashboard-demo.vercel.app",
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A collaborative task management application with team features and project tracking.",
    image: "/placeholder.svg?height=300&width=400",
    video: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS", "PWA"],
    githubUrl: "https://github.com/tanish/task-manager",
    liveUrl: "https://task-manager-demo.vercel.app",
  },
  {
    id: "4",
    title: "Weather Forecast App",
    description: "A beautiful weather application with detailed forecasts and interactive maps.",
    image: "/placeholder.svg?height=300&width=400",
    video: "/placeholder.svg?height=300&width=400",
    technologies: ["React Native", "Weather API", "Maps SDK", "Redux"],
    githubUrl: "https://github.com/tanish/weather-app",
    liveUrl: "https://weather-app-demo.vercel.app",
  },
  {
    id: "5",
    title: "Portfolio Website",
    description: "A modern portfolio website with glassmorphism design and smooth animations.",
    image: "/placeholder.svg?height=300&width=400",
    video: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    githubUrl: "https://github.com/tanish/portfolio",
    liveUrl: "https://tanish-portfolio.vercel.app",
  },
  {
    id: "6",
    title: "Blockchain Voting System",
    description: "A secure voting system built on blockchain technology with transparency and immutability.",
    image: "/placeholder.svg?height=300&width=400",
    video: "/placeholder.svg?height=300&width=400",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
    githubUrl: "https://github.com/tanish/blockchain-voting",
    liveUrl: "https://blockchain-voting-demo.vercel.app",
  },
]

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in AI, web development, and innovative digital solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={cn(
                "group relative overflow-hidden transition-all duration-500",
                "bg-card/40 backdrop-blur-md border border-border/50",
                "hover:bg-card/60 hover:scale-105 hover:shadow-2xl",
                "animate-fade-up",
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image/Video */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {hoveredProject === project.id && project.video && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button size="sm" className="rounded-full">
                      <Play className="h-4 w-4 mr-2" />
                      Play Demo
                    </Button>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-secondary/20 hover:bg-secondary/30 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-card/20 backdrop-blur-sm hover:bg-card/40"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live
                    </a>
                  </Button>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

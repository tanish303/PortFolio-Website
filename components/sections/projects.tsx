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
  title: "TweniQ",
  description: "A dual-mode social and professional networking platform. TweniQ allows users to switch between social and professional profiles, with unique feeds, interactions, and post types for each mode. Features include real-time chat, polls, likes, saved posts, followers/following, and profile customization.",
  image: "/tweniq.png", // place your project screenshot here in /public/projects/
  video: "/projects/tweniq-demo.mp4", // optional demo video if you have one
  technologies: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Socket.io"],
  githubUrl: "https://github.com/tanish303/tweniq",
  liveUrl: "https://tweniq.vercel.app",
},

{
  id: "2",
  title: "CopyWizz",
  description: "A desktop assistant built with Electron and React that instantly provides AI-powered explanations for copied text. It features a global hotkey, toast-style responses, persistent query history with favoriting, safe-save storage, customizable API keys, and OS-level auto-start integration.",
  image: "/copywizz.png", // screenshot in public/projects/
  video: "/projects/copywizz-demo.mp4", // optional demo video/gif
  technologies: ["Electron", "React", "Tailwind CSS", "Node.js", "Gemini API", "JavaScript"],
  githubUrl: "https://github.com/tanish303/CopyWizz", // update if repo link differs
  liveUrl: "", // leave empty since it's a desktop app
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

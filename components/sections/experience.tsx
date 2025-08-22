"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Experience {
  id: string
  role: string
  company: string
  location: string
  duration: string
  type: string
  description: string[]
  technologies: string[]
  companyUrl?: string
}

const experiences: Experience[] = [
  {
    id: "1",
    role: "Full Stack Developer",
    company: "CODINGBLOCKS",
    location: "Delhi, India | Remote",
    duration: "June 2024 - August 2024",
    type: "Internship",
   
    description: [
      "Gained hands-on experience in HTML, CSS, and JavaScript, building responsive and user-friendly web applications",
      "Actively participated in various projects, enhancing problem-solving abilities, coding skills, and understanding of best practices while collaborating with a team to deliver polished web solutions.",
      
    ],
    technologies: ["React", "Node.js", "Tailwind CSS", "JavaScript"],
    companyUrl: "https://www.codingblocks.com/",
  },
  
]

export function Experience() {
  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Work Experience</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I've made along the way
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={exp.id}
              className={cn(
                "p-8 transition-all duration-500 group",
                "bg-card/40 backdrop-blur-md border border-border/50",
                "hover:bg-card/60 hover:shadow-xl hover:scale-[1.02]",
                "animate-fade-up",
              )}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Main Content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">
                        {exp.type}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{exp.company}</span>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                  </div>


                  {/* Description */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Description:</h4>
                    <ul className="space-y-1">
                      {exp.description.map((description, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 text-xs">▸</span>
                          <span>{description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technologies */}
                <div className="lg:w-64 space-y-3">
                  <h4 className="font-semibold text-foreground">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs bg-secondary/20 hover:bg-secondary/30 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

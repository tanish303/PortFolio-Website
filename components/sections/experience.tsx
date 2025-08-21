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
  description: string
  highlights: string[]
  technologies: string[]
  companyUrl?: string
}

const experiences: Experience[] = [
  {
    id: "1",
    role: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    duration: "Jan 2023 - Present",
    type: "Full-time",
    description:
      "Leading development of AI-powered web applications and managing a team of 5 developers. Architecting scalable solutions for enterprise clients.",
    highlights: [
      "Increased application performance by 40% through optimization",
      "Led migration to microservices architecture",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL", "TypeScript"],
    companyUrl: "https://techcorp.example.com",
  },
  {
    id: "2",
    role: "Frontend Developer",
    company: "StartupXYZ",
    location: "Remote",
    duration: "Jun 2021 - Dec 2022",
    type: "Full-time",
    description:
      "Developed responsive web applications and collaborated with design teams to create intuitive user interfaces for a fast-growing startup.",
    highlights: [
      "Built 15+ responsive web applications from scratch",
      "Collaborated with UX/UI designers to improve user experience",
      "Implemented real-time features using WebSocket technology",
      "Reduced bundle size by 35% through code splitting and optimization",
    ],
    technologies: ["Vue.js", "JavaScript", "Tailwind CSS", "Firebase", "Figma"],
    companyUrl: "https://startupxyz.example.com",
  },
  {
    id: "3",
    role: "Web Developer Intern",
    company: "Digital Agency Pro",
    location: "New York, NY",
    duration: "Jan 2021 - May 2021",
    type: "Internship",
    description:
      "Assisted in developing client websites and learned modern web development practices in a professional agency environment.",
    highlights: [
      "Contributed to 8 client projects during internship",
      "Learned agile development methodologies",
      "Gained experience with version control and team collaboration",
      "Received outstanding performance review and job offer",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    companyUrl: "https://digitalagencypro.example.com",
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
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5 text-xs">▸</span>
                          <span>{highlight}</span>
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

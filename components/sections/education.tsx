"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface Education {
  id: string
  degree: string
  school: string
  address: string
  percentage: string
  year: string
  description: string
  achievements: string[]
}

const education: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Technology in Computer Science",
    school: "Stanford University",
    address: "Stanford, CA, USA",
    percentage: "3.8 GPA",
    year: "2019 - 2023",
    description: "Specialized in Artificial Intelligence and Machine Learning with focus on web technologies.",
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "President of Computer Science Society",
      "Winner of Annual Hackathon 2022",
      "Published research paper on AI applications",
    ],
  },
  {
    id: "2",
    degree: "High School Diploma",
    school: "Tech Valley High School",
    address: "San Jose, CA, USA",
    percentage: "95.2%",
    year: "2017 - 2019",
    description: "Focused on Mathematics, Physics, and Computer Science with advanced placement courses.",
    achievements: [
      "Valedictorian of graduating class",
      "National Merit Scholar",
      "Captain of Programming Club",
      "State-level Science Olympiad winner",
    ],
  },
]

export function Education() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Education</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey and the foundation of my technical expertise
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30" />

          <div className="space-y-12">
            {education.map((edu, index) => (
              <div key={edu.id} className="relative flex items-start gap-8">
                {/* Timeline Node */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                      "bg-card/60 backdrop-blur-md border-2 border-primary/50",
                      "hover:scale-110 hover:bg-primary/20 hover:border-primary",
                      "animate-fade-up",
                    )}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Education Card */}
                <Card
                  className={cn(
                    "flex-1 p-8 transition-all duration-500 group",
                    "bg-card/40 backdrop-blur-md border border-border/50",
                    "hover:bg-card/60 hover:shadow-xl hover:scale-[1.02]",
                    "animate-fade-up",
                  )}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl font-bold group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{edu.school}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{edu.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{edu.year}</span>
                        </div>
                      </div>

                      {/* Grade/Percentage */}
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-primary text-lg">{edu.percentage}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">{edu.description}</p>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Key Achievements:</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {edu.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1.5 text-xs">▸</span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

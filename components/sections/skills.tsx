"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Heatmap from "@/components/Heatmap"

interface Skill {
  name: string
  icon: string
  category: string
  level: number
}

const skills: Skill[] = [
  { name: "JavaScript", icon: "⚡", category: "Frontend", level: 95 },
  { name: "TypeScript", icon: "🔷", category: "Frontend", level: 90 },
  { name: "React", icon: "⚛️", category: "Frontend", level: 95 },
  { name: "Next.js", icon: "▲", category: "Frontend", level: 90 },
  { name: "Vue.js", icon: "💚", category: "Frontend", level: 85 },
  { name: "Node.js", icon: "🟢", category: "Backend", level: 88 },
  { name: "Python", icon: "🐍", category: "Backend", level: 85 },
  { name: "PostgreSQL", icon: "🐘", category: "Database", level: 80 },
  { name: "MongoDB", icon: "🍃", category: "Database", level: 82 },
  { name: "AWS", icon: "☁️", category: "Cloud", level: 75 },
  { name: "Docker", icon: "🐳", category: "DevOps", level: 78 },
  { name: "Git", icon: "📝", category: "Tools", level: 92 },
]

export function Skills() {
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([])
  const [yearTotal, setYearTotal] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/tanish303")
        const data = await res.json()
        setContributions(data.contributions)

        // Get this year's total contributions from API
        const yearKey = String(new Date().getFullYear())
        setYearTotal(data.total?.[yearKey] ?? null)
      } catch (error) {
        console.error("Error fetching contributions:", error)
      }
    }
    fetchContributions()
  }, [])

  const skillCategories = Array.from(new Set(skills.map((skill) => skill.category)))

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* GitHub Heatmap */}
          {/* GitHub Heatmap */}
<Card className="p-6 bg-card/40 backdrop-blur-md border border-border/50 animate-fade-up">
  <div className="text-center mb-4">
    <h3 className="font-serif text-2xl font-semibold">GitHub Activity</h3>
    <p className="text-sm text-muted-foreground">
      {yearTotal !== null
        ? `${yearTotal} contributions in the last year`
        : "Loading..."}
    </p>
  </div>

  <Heatmap contributions={contributions} />
</Card>



          {/* Skills Grid */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            {skillCategories.map((category) => (
              <div key={category}>
                <h3 className="font-serif text-xl font-semibold mb-4 text-primary">{category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <Card
                        key={skill.name}
                        className={cn(
                          "p-4 text-center transition-all duration-300 cursor-pointer group",
                          "bg-card/20 backdrop-blur-md border border-border/30",
                          "hover:bg-card/40 hover:scale-105 hover:shadow-lg hover:border-primary/50",
                          hoveredSkill === skill.name && "bg-card/40 scale-105 shadow-lg border-primary/50",
                        )}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{skill.icon}</div>
                        <div className="font-medium text-sm mb-2">{skill.name}</div>
                        <div className="w-full bg-muted/30 rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{skill.level}%</div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

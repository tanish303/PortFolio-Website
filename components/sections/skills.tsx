"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

// Generate dummy LeetCode-style heatmap data
const generateHeatmapData = () => {
  const data = []
  const today = new Date()
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const submissions = Math.floor(Math.random() * 8) // 0-7 submissions per day
    data.push({
      date: new Date(d).toISOString().split("T")[0],
      count: submissions,
    })
  }
  return data
}

const heatmapData = generateHeatmapData()

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-muted/20"
    if (count <= 2) return "bg-primary/30"
    if (count <= 4) return "bg-primary/60"
    if (count <= 6) return "bg-primary/80"
    return "bg-primary"
  }

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
          {/* LeetCode Heatmap */}
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-border/50 animate-fade-up">
            <h3 className="font-serif text-2xl font-semibold mb-6 text-center">Coding Activity</h3>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground text-center">
                {heatmapData.filter((d) => d.count > 0).length} contributions in the last year
              </div>
              <div className="grid grid-cols-53 gap-1 max-w-full overflow-x-auto">
                {heatmapData.map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125",
                      getIntensityClass(day.count),
                    )}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-sm bg-muted/20" />
                  <div className="w-3 h-3 rounded-sm bg-primary/30" />
                  <div className="w-3 h-3 rounded-sm bg-primary/60" />
                  <div className="w-3 h-3 rounded-sm bg-primary/80" />
                  <div className="w-3 h-3 rounded-sm bg-primary" />
                </div>
                <span>More</span>
              </div>
            </div>
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

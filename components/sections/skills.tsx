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

// NOTE: original 'skills' array no longer used for rendering, but preserved to avoid functionality changes/interfaces
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

// New skill groups per user spec, rendered with logos in glass pills
const skillGroups: { title: string; items: { name: string; logo: string }[] }[] = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript" },
      { name: "Python", logo: "https://cdn.simpleicons.org/python" },
      { name: "Java", logo: "https://cdn.simpleicons.org/java" },
      { name: "C++", logo: "https://cdn.simpleicons.org/cplusplus" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", logo: "https://cdn.simpleicons.org/react" },
      { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs" },
      { name: "Redux", logo: "https://cdn.simpleicons.org/redux" },
      { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss" },
      { name: "HTML5", logo: "https://cdn.simpleicons.org/html5" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Express.js", logo: "https://cdn.simpleicons.org/express" },
      // Using OpenAPI Initiative as the closest recognizable REST APIs logo
      { name: "REST APIs", logo: "https://cdn.simpleicons.org/openapiinitiative" },
      // Fallback for JWT: use a placeholder since an official JWT brand icon isn't available
      { name: "Authentication (JWT)", logo: "/jwt-token-shield.png" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb" },
      { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql" },
      { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql" },
    ],
  },
  {
    title: "DevOps / Cloud",
    items: [
      { name: "Git", logo: "https://cdn.simpleicons.org/git" },
      { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel" },
      { name: "Render", logo: "https://cdn.simpleicons.org/render" },
    ],
  },
  {
    title: "Design Tools",
    items: [
      { name: "Figma", logo: "https://cdn.simpleicons.org/figma" },
      { name: "Postman", logo: "https://cdn.simpleicons.org/postman" },
    ],
  },
  {
    title: "AI / APIs",
    items: [
      // If googlegemini is unavailable, it will render a broken icon; keeping as requested
      { name: "Gemini API", logo: "https://cdn.simpleicons.org/googlegemini" },
      { name: "OpenAI API", logo: "https://cdn.simpleicons.org/openai" },
    ],
  },
]

export function Skills() {
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([])
  const [yearTotal, setYearTotal] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [leetcodeContributions, setLeetcodeContributions] = useState<{ date: string; count: number }[]>([])
  const [leetcodeTotal, setLeetcodeTotal] = useState<number | null>(null)

  useEffect(() => {
    async function fetchLeetcode() {
      try {
        const res = await fetch("https://alfa-leetcode-api.onrender.com/tanish_303/calendar")
        const data = await res.json()
        const parsed = JSON.parse(data.submissionCalendar)
        const today = new Date()
        const oneYearAgo = new Date(today)
        oneYearAgo.setFullYear(today.getFullYear() - 1)
        const contributions = Object.entries(parsed).map(([ts, count]) => ({
          date: new Date(Number(ts) * 1000).toISOString().split("T")[0],
          count: Number(count),
        }))
        const lastYearContribs = contributions.filter(
          (c) => new Date(c.date) >= oneYearAgo && new Date(c.date) <= today,
        )
        setLeetcodeContributions(lastYearContribs)
        setLeetcodeTotal(lastYearContribs.reduce((sum, c) => sum + c.count, 0))
      } catch (err) {
        console.error("Error fetching LeetCode data:", err)
      }
    }
    fetchLeetcode()
  }, [])

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/tanish303")
        const data = await res.json()
        setContributions(data.contributions)
        const yearKey = String(new Date().getFullYear())
        setYearTotal(data.total?.[yearKey] ?? null)
      } catch (error) {
        console.error("Error fetching contributions:", error)
      }
    }
    fetchContributions()
  }, [])

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Heatmaps stacked vertically */}
        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {/* GitHub Heatmap */}
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-border/50 animate-fade-up">
            <div className="text-center mb-4">
              <h3 className="font-serif text-2xl font-semibold">GitHub Activity</h3>
              <p className="text-sm text-muted-foreground">
                {yearTotal !== null ? `${yearTotal} contributions in the last year` : "Loading..."}
              </p>
            </div>
            <Heatmap contributions={contributions} />
          </Card>

          {/* LeetCode Heatmap */}
          <Card className="p-6 bg-card/40 backdrop-blur-md border border-border/50 animate-fade-up">
            <div className="text-center mb-4">
              <h3 className="font-serif text-2xl font-semibold">LeetCode Activity</h3>
              <p className="text-sm text-muted-foreground">
                {leetcodeTotal !== null ? `${leetcodeTotal} total submissions in the last year` : "Loading..."}
              </p>
            </div>
            <Heatmap contributions={leetcodeContributions} />
          </Card>
        </div>

        {/* Skills by Type - single-line, glass pills with logos */}
       {/* Skills by Type - single-line, glass pills with logos */}
<div className="mt-16 space-y-8 animate-fade-up text-center" style={{ animationDelay: "200ms" }}>
  {skillGroups.map((group) => (
    <div key={group.title} className="space-y-3">
      <h3 className="font-serif text-xl font-semibold text-primary">{group.title}</h3>
      <div className="flex flex-wrap justify-center items-center gap-3 pb-2">
        {group.items.map((item) => (
          <Card
            key={item.name}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl flex-none",
              "bg-card/20 backdrop-blur-md border border-border/30",
              "hover:bg-card/40 hover:shadow-md transition-colors",
            )}
            title={item.name}
            aria-label={item.name}
          >
            <img
              src={item.logo || "/placeholder.svg"}
              alt={`${item.name} logo`}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
              crossOrigin="anonymous"
            />
            <span className="text-sm font-medium whitespace-nowrap truncate">{item.name}</span>
          </Card>
        ))}
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  )
}

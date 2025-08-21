"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Heart, Star, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface GuestbookEntry {
  id: string
  name: string
  message: string
  timestamp: Date
  likes: number
}

// Initial dummy data for the guestbook
const initialEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "Sarah Chen",
    message: "Amazing portfolio! The glassmorphism design is absolutely stunning. Love the smooth animations!",
    timestamp: new Date("2024-01-15"),
    likes: 12,
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    message: "Your AI projects are impressive. The attention to detail in the UI/UX is remarkable.",
    timestamp: new Date("2024-01-14"),
    likes: 8,
  },
  {
    id: "3",
    name: "Emily Johnson",
    message: "The interactive elements and theme switching work flawlessly. Great job on the responsive design!",
    timestamp: new Date("2024-01-13"),
    likes: 15,
  },
  {
    id: "4",
    name: "Michael Kim",
    message: "Love the LeetCode heatmap integration. Your skills section is very well organized.",
    timestamp: new Date("2024-01-12"),
    likes: 6,
  },
  {
    id: "5",
    name: "Jessica Wang",
    message: "The contact form with confetti effect is delightful! Such attention to user experience.",
    timestamp: new Date("2024-01-11"),
    likes: 9,
  },
]

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries)
  const [newEntry, setNewEntry] = useState({ name: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likedEntries, setLikedEntries] = useState<Set<string>>(new Set())

  const stats = {
    totalVisitors: 1247,
    totalMessages: entries.length,
    totalLikes: entries.reduce((sum, entry) => sum + entry.likes, 0),
    avgRating: 4.8,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newEntry.name.length < 3 || newEntry.message.length < 10) return

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const entry: GuestbookEntry = {
      id: Date.now().toString(),
      name: newEntry.name,
      message: newEntry.message,
      timestamp: new Date(),
      likes: 0,
    }

    setEntries((prev) => [entry, ...prev])
    setNewEntry({ name: "", message: "" })
    setIsSubmitting(false)
  }

  const handleLike = (entryId: string) => {
    if (likedEntries.has(entryId)) return

    setEntries((prev) => prev.map((entry) => (entry.id === entryId ? { ...entry, likes: entry.likes + 1 } : entry)))
    setLikedEntries((prev) => new Set([...prev, entryId]))
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Guestbook & Stats</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leave a message and see what others are saying about my work
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Portfolio Stats */}
            <Card className="p-6 bg-card/40 backdrop-blur-md border border-border/50 animate-fade-up">
              <h3 className="font-serif text-xl font-semibold mb-4">Portfolio Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Total Visitors</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20">
                    {stats.totalVisitors.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm">Messages</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20">
                    {stats.totalMessages}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-sm">Total Likes</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20">
                    {stats.totalLikes}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm">Avg Rating</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20">
                    {stats.avgRating}/5
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Add Message Form */}
            <Card
              className="p-6 bg-card/40 backdrop-blur-md border border-border/50 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              <h3 className="font-serif text-xl font-semibold mb-4">Leave a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your name (min 3 characters)"
                    value={newEntry.name}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-input/50 backdrop-blur-sm border-border/50"
                    minLength={3}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your message (min 10 characters)"
                    value={newEntry.message}
                    onChange={(e) => setNewEntry((prev) => ({ ...prev, message: e.target.value }))}
                    className="bg-input/50 backdrop-blur-sm border-border/50 resize-none"
                    rows={4}
                    minLength={10}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting || newEntry.name.length < 3 || newEntry.message.length < 10}
                  className={cn(
                    "w-full transition-all duration-300",
                    "bg-primary/20 backdrop-blur-md border border-primary/30",
                    "hover:bg-primary/30 hover:scale-105",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Posting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Post Message
                    </div>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Messages List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-2xl font-semibold mb-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
              Recent Messages
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {entries.map((entry, index) => (
                <Card
                  key={entry.id}
                  className={cn(
                    "p-6 transition-all duration-500 group relative overflow-hidden",
                    "bg-card/40 backdrop-blur-md border border-border/50",
                    "hover:bg-card/60 hover:shadow-lg hover:scale-[1.02]",
                    "animate-fade-up",
                  )}
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {entry.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{entry.name}</h4>
                          <p className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLike(entry.id)}
                        disabled={likedEntries.has(entry.id)}
                        className={cn(
                          "flex items-center gap-1 transition-all duration-300",
                          likedEntries.has(entry.id) ? "text-red-500" : "hover:text-red-500",
                        )}
                      >
                        <Heart className={cn("h-4 w-4", likedEntries.has(entry.id) && "fill-current")} />
                        <span className="text-sm">{entry.likes}</span>
                      </Button>
                    </div>

                    {/* Message */}
                    <p className="text-muted-foreground leading-relaxed">{entry.message}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

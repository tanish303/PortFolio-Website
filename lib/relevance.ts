import me from "@/data/me.json";

export function getRelevantSections(question: string) {
  const q = question.toLowerCase();

  const mapping: Record<string, string[]> = {
    bio: ["about", "yourself", "story", "background"],
    personality: ["personality", "introvert", "traits", "overthink"],
    goals: ["goal", "future", "vision"],
    skills: ["skills", "tech stack", "technologies"],
    education: ["education", "study", "college", "school", "degree"],
    experience: ["experience", "internship", "job"],
    achievements: ["achievement", "award"],
    interests: ["hobby", "interest", "games", "gym"],
    roles: ["roles", "job role", "developer role"],
    contact: ["contact", "email", "phone"],
    projects: ["project", "built", "developed"]
  };

  // keyword-based detection
  for (const key in mapping) {
    if (mapping[key].some(word => q.includes(word))) {
      return me[key];
    }
  }

  // project-specific detection
  const project = me.projects.find((p: any) =>
    q.includes(p.name.toLowerCase())
  );
  if (project) return project;

  return me; // fallback
}

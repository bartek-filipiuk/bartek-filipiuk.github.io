export type ProjectOverride = {
  featured?: boolean;
  order?: number;
  category?: string;
  status?: "active" | "prototype" | "maintained" | "archived";
  description?: string;
  liveUrl?: string;
  image?: string;
  include?: boolean;
  experiment?: boolean;
};

/**
 * Human curation wins over GitHub metadata.
 *
 * This file is intentionally boring: add a repository name and override only
 * the fields that need editorial judgment. The automated GitHub import keeps
 * dates, language, topics, license and repository URLs fresh.
 */
export const projectOverrides: Record<string, ProjectOverride> = {
  "architect-first": {
    featured: true,
    order: 1,
    category: "AI & agents",
    status: "active",
    description:
      "Architecture discipline for coding agents: a decision ladder, planning commands and focused system reviews.",
  },
  skillgrade: {
    featured: true,
    order: 2,
    category: "AI & agents",
    status: "active",
  },
  "drureview-core": {
    featured: true,
    order: 3,
    category: "Drupal & PHP",
    status: "active",
    liveUrl: "https://drureview.com",
  },
  codehelm: {
    featured: true,
    order: 4,
    category: "Developer tools",
    status: "active",
  },
  "ai-agent-audit": {
    featured: true,
    order: 5,
    category: "AI & agents",
    status: "maintained",
  },
  "youtube-talker": {
    featured: true,
    order: 6,
    category: "Products & learning",
    status: "prototype",
    description:
      "Qivio: conversational learning from individual YouTube videos and curated channels.",
  },
  "wrocdevs-next": {
    category: "Community",
    status: "active",
  },
  PocketFlow: { include: false },
  supabase: { include: false },
  "qwen-code": { include: false },
  "browser-use": { include: false },
  "agent-zero": { include: false },
  ai_tests: { include: false },
};

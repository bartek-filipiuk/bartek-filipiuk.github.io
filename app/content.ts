import { projectOverrides } from "../config/project-overrides";
import githubData from "../data/github-repositories.json";

export type ArchiveProject = {
  name: string;
  description: string;
  category:
    | "AI & agents"
    | "Developer tools"
    | "Infrastructure"
    | "Drupal & PHP"
    | "Products & learning"
    | "Community";
  stack: string;
  url: string;
};

type GitHubRepository = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  topics: string[];
  archived: boolean;
  fork: boolean;
  size: number;
};

const curatedFallback: ArchiveProject[] = [
  {
    name: "VPS Deploy Skill",
    description: "Agent workflow for repeatable, safer deployment to a small VPS.",
    category: "Infrastructure",
    stack: "Agents · Linux · Deployment",
    url: "https://github.com/bartek-filipiuk/vps-deploy-skill",
  },
  {
    name: "Qdrant + Caddy",
    description: "A compact self-hosted vector database setup with automatic HTTPS.",
    category: "Infrastructure",
    stack: "Qdrant · Caddy · Docker",
    url: "https://github.com/bartek-filipiuk/qdrant_caddy",
  },
  {
    name: "WrocDevs",
    description: "Bilingual community platform for developer events, learning and workshops.",
    category: "Community",
    stack: "Next.js · Payload CMS · PostgreSQL",
    url: "https://github.com/bartek-filipiuk/wrocdevs-next",
  },
  {
    name: "Repo to Cat",
    description: "A focused utility that turns a code repository into model-ready context.",
    category: "Developer tools",
    stack: "Python · CLI · LLM context",
    url: "https://github.com/bartek-filipiuk/repo-to-cat",
  },
  {
    name: "Drupal YouTube to Article",
    description: "A Drupal-oriented workflow for turning video material into articles.",
    category: "Drupal & PHP",
    stack: "Drupal · PHP · AI content",
    url: "https://github.com/bartek-filipiuk/drupal-yt-to-article",
  },
  {
    name: "Blog Post Scraper",
    description: "A practical content extraction utility built for reuse in AI workflows.",
    category: "Developer tools",
    stack: "Python · Scraping · Automation",
    url: "https://github.com/bartek-filipiuk/blog-post-scraper",
  },
  {
    name: "Weekend Recommender",
    description: "An experiment in turning lightweight context into useful weekend suggestions.",
    category: "Products & learning",
    stack: "AI · Product experiment",
    url: "https://github.com/bartek-filipiuk/weekend-recommender",
  },
  {
    name: "Lead Magnet Course Site",
    description: "A concise educational product surface for developers building with AI.",
    category: "Products & learning",
    stack: "Web · Education · AI engineering",
    url: "https://github.com/bartek-filipiuk/lead-magnet-course-site",
  },
  {
    name: "MCP Servers",
    description: "Experiments and practical implementations around model context protocols.",
    category: "AI & agents",
    stack: "MCP · Tool calling · Agents",
    url: "https://github.com/bartek-filipiuk/mcpservers",
  },
  {
    name: "AI Handoffs",
    description: "An experiment in passing structured work between AI execution stages.",
    category: "AI & agents",
    stack: "Agents · Orchestration",
    url: "https://github.com/bartek-filipiuk/ai_handoffs",
  },
];

const githubRepositories = githubData.repositories as GitHubRepository[];

function inferCategory(repository: GitHubRepository): ArchiveProject["category"] {
  const searchable = `${repository.name} ${repository.language ?? ""} ${repository.topics.join(" ")}`
    .toLowerCase();

  if (searchable.match(/drupal|php/)) return "Drupal & PHP";
  if (searchable.match(/docker|deploy|qdrant|caddy|infra|vps/)) return "Infrastructure";
  if (searchable.match(/course|learn|content|youtube|education/)) return "Products & learning";
  if (searchable.match(/community|wrocdevs|meetup/)) return "Community";
  if (searchable.match(/agent|mcp|llm|rag|ai-/)) return "AI & agents";
  return "Developer tools";
}

const importedArchive: ArchiveProject[] = githubRepositories
  .filter((repository) => {
    const override = projectOverrides[repository.name];
    if (override?.include === false) return false;
    if (override?.include === true) return true;
    return !repository.archived && !repository.fork && repository.size > 0;
  })
  .filter((repository) => !projectOverrides[repository.name]?.featured)
  .filter((repository) => repository.description || projectOverrides[repository.name]?.description)
  .map((repository) => {
    const override = projectOverrides[repository.name];
    return {
      name: repository.name,
      description:
        override?.description ??
        repository.description ??
        "Public engineering project; description pending review.",
      category:
        (override?.category as ArchiveProject["category"] | undefined) ??
        inferCategory(repository),
      stack: [repository.language, ...repository.topics.slice(0, 2)]
        .filter(Boolean)
        .join(" · "),
      url: repository.url,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const archiveProjects =
  importedArchive.length > 0 ? importedArchive : curatedFallback;

export const categories = [
  "All",
  "AI & agents",
  "Developer tools",
  "Infrastructure",
  "Drupal & PHP",
  "Products & learning",
  "Community",
] as const;

export const processSteps = [
  ["01", "Understand", "Trace the real problem, constraints and data flow before choosing a solution."],
  ["02", "Design", "Define boundaries, interfaces, risks and the smallest architecture that can hold."],
  ["03", "Decompose", "Turn the design into narrow tasks with observable acceptance criteria."],
  ["04", "Execute", "Use coding agents to accelerate implementation without outsourcing decisions."],
  ["05", "Verify", "Review behavior and code, test failure paths and check security assumptions."],
  ["06", "Operate", "Deploy, observe, maintain and simplify the system after it meets reality."],
] as const;

export const capabilityGroups = [
  {
    title: "Software architecture",
    description: "From the shape of the data to the shape of the deployment.",
    items: ["System design", "Service boundaries", "APIs & data flows", "Queues", "Maintainability"],
  },
  {
    title: "AI-assisted engineering",
    description: "Agents as an acceleration layer inside a controlled workflow.",
    items: ["Coding agents", "LLM workflows", "RAG", "MCP & tool calling", "Evals & observability"],
  },
  {
    title: "Web platforms",
    description: "Deep backend experience connected to pragmatic modern interfaces.",
    items: ["Drupal", "PHP", "Python & FastAPI", "React & Astro", "PostgreSQL · Redis · Qdrant"],
  },
  {
    title: "Infrastructure",
    description: "The path from a working repository to a system someone can depend on.",
    items: ["Docker", "Linux", "Caddy", "CI/CD", "VPS · backups · monitoring"],
  },
] as const;

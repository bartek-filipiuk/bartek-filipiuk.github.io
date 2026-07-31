"use client";

import { useMemo, useState } from "react";
import {
  archiveProjects,
  capabilityGroups,
  categories,
  processSteps,
} from "./content";

type Project = {
  name: string;
  eyebrow: string;
  description: string;
  problem: string;
  role: string;
  stack: string[];
  status: "Active" | "Prototype" | "Open source";
  url: string;
  accent: "lime" | "cyan" | "violet" | "amber";
};

const featuredProjects: Project[] = [
  {
    name: "Architect-First",
    eyebrow: "Architecture discipline for coding agents",
    description:
      "A Claude Code plugin that loads an architectural decision ladder into every session and adds focused planning and review commands.",
    problem:
      "Keeps fast AI-generated code from drifting into needless abstraction, weak boundaries and backwards dependencies.",
    role: "Concept, architecture, implementation and validation",
    stack: ["Claude Code", "Node.js", "Agent hooks", "Zero dependencies"],
    status: "Open source",
    url: "https://github.com/bartek-filipiuk/architect-first",
    accent: "lime",
  },
  {
    name: "Skillgrade",
    eyebrow: "Trust evaluation for AI skills",
    description:
      "A deterministic and LLM-assisted evaluator that grades AI skills across security, quality and hygiene—with evidence for every finding.",
    problem:
      "Makes third-party agent skills inspectable before they receive access to a developer environment.",
    role: "System design, trust model, scoring pipeline and implementation",
    stack: ["TypeScript", "LLM evals", "OpenRouter", "Security"],
    status: "Active",
    url: "https://github.com/bartek-filipiuk/skillgrade",
    accent: "violet",
  },
  {
    name: "Drureview Core",
    eyebrow: "Local AI code review for Drupal",
    description:
      "An open CLI review engine combining deterministic security checks with a Drupal-tuned local model and a multi-pass verification pipeline.",
    problem:
      "Catches Drupal-specific mistakes that generic AI reviewers frequently miss, while keeping source code local.",
    role: "Product direction, architecture, fine-tuned review workflow and CLI",
    stack: ["Python", "Drupal", "Ollama", "RAG", "OWASP"],
    status: "Active",
    url: "https://github.com/bartek-filipiuk/drureview-core",
    accent: "cyan",
  },
  {
    name: "Codehelm",
    eyebrow: "Local command center for Claude Code",
    description:
      "A local-only workspace for finding, reading and running Claude Code sessions across projects from one secured Chromium window.",
    problem:
      "Turns scattered JSONL histories and terminal sessions into a navigable, persistent engineering workspace.",
    role: "Architecture, security model, product UX and implementation",
    stack: ["Next.js", "TypeScript", "WebSockets", "PTY", "Security"],
    status: "Active",
    url: "https://github.com/bartek-filipiuk/codehelm",
    accent: "amber",
  },
  {
    name: "AI Agent Audit",
    eyebrow: "Developer-machine attack-surface scanner",
    description:
      "A read-only audit of credentials, hooks, MCP servers, agent skills, IDE extensions and supply-chain indicators reachable by coding agents.",
    problem:
      "Answers what an AI coding agent can access on a machine—and how damaging a compromise could be.",
    role: "Threat model, audit scope, checks and reporting",
    stack: ["Shell", "Security", "MCP", "Supply chain"],
    status: "Open source",
    url: "https://github.com/bartek-filipiuk/ai-agent-audit",
    accent: "lime",
  },
  {
    name: "Qivio",
    eyebrow: "Conversational learning from video",
    description:
      "An AI learning system for chatting with individual YouTube videos and curated channels using retrieval and real-time responses.",
    problem:
      "Makes long-form video knowledge searchable, discussable and reusable instead of passively consumed.",
    role: "Product concept, end-to-end architecture and implementation",
    stack: ["FastAPI", "Astro", "PostgreSQL", "Qdrant", "LangGraph"],
    status: "Prototype",
    url: "https://github.com/bartek-filipiuk/youtube-talker",
    accent: "violet",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const projectCount = useMemo(() => featuredProjects.length, []);
  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return archiveProjects.filter((project) => {
      const categoryMatches = category === "All" || project.category === category;
      const queryMatches =
        !normalizedQuery ||
        `${project.name} ${project.description} ${project.stack} ${project.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, query]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Bartek Filipiuk",
            url: "https://bartek-filipiuk.github.io",
            sameAs: [
              "https://github.com/bartek-filipiuk",
              "https://devince.dev",
            ],
            jobTitle: "Software Architect and Senior Developer",
            address: {
              "@type": "PostalAddress",
              addressRegion: "Lower Silesia",
              addressCountry: "PL",
            },
            knowsAbout: [
              "Software architecture",
              "AI-assisted software engineering",
              "Drupal",
              "PHP",
              "Python",
              "Developer infrastructure",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bartek Filipiuk, home">
          <span className="brand-mark">BF</span>
          <span className="brand-text">Bartek Filipiuk</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav id="site-nav" className={menuOpen ? "site-nav is-open" : "site-nav"}>
          <a href="#work" onClick={() => setMenuOpen(false)}>
            Work
          </a>
          <a href="#method" onClick={() => setMenuOpen(false)}>
            Method
          </a>
          <a href="#archive" onClick={() => setMenuOpen(false)}>
            Archive
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a
            className="nav-github"
            href="https://github.com/bartek-filipiuk"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Arrow />
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="status-line">
              <span className="status-dot" />
              Software architect · Near Wrocław, Poland
            </div>
            <h1>
              I design software systems.
              <span>AI helps me build them.</span>
            </h1>
            <p className="hero-lede">
              Senior developer and technical lead building AI tools, developer
              infrastructure and production-ready web platforms—from architecture
              and security to deployment.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore selected work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/bartek-filipiuk"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub <Arrow />
              </a>
            </div>
          </div>

          <aside className="system-panel" aria-label="Current engineering focus">
            <div className="panel-header">
              <span>system.profile</span>
              <span className="panel-state">ONLINE</span>
            </div>
            <div className="panel-body">
              <div className="signal-row">
                <span>01</span>
                <strong>Architecture first</strong>
                <i />
              </div>
              <div className="signal-row">
                <span>02</span>
                <strong>AI execution layer</strong>
                <i />
              </div>
              <div className="signal-row">
                <span>03</span>
                <strong>Human review</strong>
                <i />
              </div>
              <div className="signal-row">
                <span>04</span>
                <strong>Production ownership</strong>
                <i />
              </div>
            </div>
            <div className="panel-footer">
              <span>CURRENT FOCUS</span>
              <p>Secure AI-assisted engineering</p>
            </div>
          </aside>
        </section>

        <section className="section projects-section" id="work">
          <div className="section-heading">
            <div>
              <span className="kicker">01 / Selected systems</span>
              <h2>Work that explains how I think.</h2>
            </div>
            <p>
              Not a timeline of commits. A curated set of systems, tools and
              experiments where architecture, usefulness and production thinking
              matter.
            </p>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <article className={`project-card accent-${project.accent}`} key={project.name}>
                <div className="project-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.status}</span>
                </div>
                <p className="project-eyebrow">{project.eyebrow}</p>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-detail">
                  <span>Problem</span>
                  <p>{project.problem}</p>
                </div>
                <div className="project-detail">
                  <span>Contribution</span>
                  <p>{project.role}</p>
                </div>
                <ul className="tag-list" aria-label={`${project.name} technologies`}>
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <a
                  className="project-link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${project.name} repository on GitHub`}
                >
                  View repository <Arrow />
                </a>
              </article>
            ))}
          </div>
          <p className="project-count">
            Showing {projectCount} systems selected for depth, not recency.
          </p>
        </section>

        <section className="method-section" id="method">
          <div className="method-intro">
            <span className="kicker">02 / Working model</span>
            <h2>Developer as architect. AI as execution team.</h2>
            <p>
              This is not blind code generation. AI accelerates the work; I remain
              responsible for requirements, boundaries, trade-offs, security and
              the behavior of the finished system.
            </p>
          </div>
          <ol className="process-list">
            {processSteps.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section capabilities-section">
          <div className="section-heading">
            <div>
              <span className="kicker">03 / Capabilities</span>
              <h2>Systems, not skill bars.</h2>
            </div>
            <p>
              A broad stack is useful only when it supports clear decisions across
              the full path from idea to operation.
            </p>
          </div>
          <div className="capability-grid">
            {capabilityGroups.map((group, index) => (
              <article key={group.title}>
                <span className="capability-number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="archive-section" id="archive">
          <div className="archive-header">
            <div>
              <span className="kicker">04 / Project archive</span>
              <h2>More things I have put into the world.</h2>
            </div>
            <label className="search-box">
              <span>Search projects</span>
              <input
                type="search"
                value={query}
                onInput={(event) => setQuery(event.currentTarget.value)}
                placeholder="Try Drupal, MCP, deployment…"
              />
            </label>
          </div>
          <div className="filter-list" aria-label="Filter projects by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "is-active" : ""}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="archive-list" aria-live="polite">
            {filteredProjects.map((project) => (
              <a key={project.name} href={project.url} target="_blank" rel="noreferrer">
                <span className="archive-name">{project.name}</span>
                <span className="archive-description">{project.description}</span>
                <span className="archive-stack">{project.stack}</span>
                <span className="archive-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
            {filteredProjects.length === 0 && (
              <p className="empty-state">No projects match this filter yet.</p>
            )}
          </div>
        </section>

        <section className="focus-section">
          <div>
            <span className="kicker">05 / Current focus</span>
            <h2>Building the discipline around fast software.</h2>
          </div>
          <ul>
            <li>Architecture-first AI development</li>
            <li>Secure AI-assisted coding</li>
            <li>Developer tools and AI-native products</li>
            <li>Simpler production deployments</li>
            <li>Practical education for developers using AI</li>
          </ul>
        </section>

        <section className="section about-section" id="about">
          <div className="about-label">
            <span className="kicker">06 / About</span>
            <span className="about-location">Near Wrocław · Poland</span>
          </div>
          <div className="about-copy">
            <p className="about-lede">
              I care about the whole path: from understanding a problem and
              designing the system to shipping, observing and maintaining it.
            </p>
            <div className="about-columns">
              <p>
                I am a senior developer and technical lead from Poland. I have
                worked professionally with Drupal since 2014, with a background
                rooted in PHP, Linux, Docker and web architecture.
              </p>
              <p>
                Today I also build AI tools, developer infrastructure and small
                software products independently—often in short, focused sessions.
                That constraint has made clarity, good decomposition and useful
                automation central to how I work.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <span className="kicker">Start a conversation</span>
          <h2>Have a hard system problem?</h2>
          <p>
            I am most useful where product thinking, architecture and practical
            implementation need to meet.
          </p>
          <div className="contact-links">
            <a href="https://devince.dev" target="_blank" rel="noreferrer">
              devince.dev <Arrow />
            </a>
            <a href="https://github.com/bartek-filipiuk" target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Bartek Filipiuk</span>
        <span>Designed as a system, built with agents.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}

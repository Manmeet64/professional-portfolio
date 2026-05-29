"use client";

import { motion } from "motion/react";
import { useState } from "react";

/* ── Design system constants ───────────────────────── */
const SPRING = { type: "spring", stiffness: 80, damping: 22 } as const;
const SPRING_FAST = { type: "spring", stiffness: 300, damping: 28 } as const;

/* ── SVG primitives (no icon lib) ──────────────────── */
const ArrowUpRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
  </svg>
);

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

/* ── Project data ───────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  links: { label: string; href: string; type: "live" | "github" }[];
  featured: boolean;
  accent: string; // per-card accent for visual variety
  category: string;
  image?: string; // screenshot path
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Winvesta Website Revamp",
    tagline: "HubSpot CMS to headless Next.js + Sanity",
    description:
      "Migrated Winvesta's marketing site off HubSpot CMS onto a headless stack. Wrote a custom Node.js migration agent to convert legacy HTML content into structured Sanity schemas — off-the-shelf tools couldn't handle the data shape. Built the Next.js frontend from scratch: pages, layouts, and reusable components, all wired to Sanity's content lake. Cut CMS infrastructure costs by 80%.",
    tech: ["Next.js", "Sanity CMS", "Node.js", "TypeScript"],
    links: [{ label: "Live Site", href: "https://winvesta.in", type: "live" }],
    featured: true,
    accent: "59,74,107",
    category: "Fintech · Internship",
    image: "/winvesta-web.png",
  },
  {
    id: 2,
    title: "Foodzy",
    tagline: "Smart food delivery app",
    description:
      "Full-stack food delivery platform with real-time order tracking, restaurant discovery, and cart management. Built end-to-end from database schema to React UI.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    links: [
      { label: "GitHub", href: "https://github.com/Manmeet64/Foodzy", type: "github" },
    ],
    featured: false,
    accent: "194,100,58",
    category: "Full-Stack · Project",
    image: "/Foodzy.jpg",
  },
  {
    id: 3,
    title: "Surge",
    tagline: "AI-powered sales assistant",
    description:
      "An AI sales assistant that qualifies leads, drafts outreach, and tracks pipeline stages. LLM-powered backend with a clean React dashboard for sales teams.",
    tech: ["React", "FastAPI", "Python", "OpenAI"],
    links: [
      { label: "GitHub", href: "https://github.com/Manmeet64/Surge", type: "github" },
    ],
    featured: false,
    accent: "80,140,200",
    category: "AI · Project",
    image: "/surge.jpg",
  },
  {
    id: 4,
    title: "Vector",
    tagline: "Ops dashboard for Momentum Health Club",
    description:
      "Designed and built the internal admin platform for Momentum from the ground up. Kanban task board, event management, member registrations, financials, and a team calendar — all in one place. Stack: Next.js + Supabase with real-time sync, n8n for workflow automation, and a custom design system built for operators, not end users.",
    tech: ["Next.js", "TypeScript", "Supabase", "n8n", "Tailwind"],
    links: [
      { label: "Live App", href: "https://vector-momentum-virid.vercel.app", type: "live" },
    ],
    featured: true,
    accent: "200,100,60",
    category: "Dashboard · Founder",
    image: "/vector.png",
  },
  {
    id: 5,
    title: "Big-O",
    tagline: "Gamified DSA flashcard learning",
    description:
      "A spaced-repetition flashcard app for learning Data Structures & Algorithms. Cards unlock progressively, progress persists, and streaks keep you coming back.",
    tech: ["React", "TypeScript", "Tailwind"],
    links: [
      { label: "GitHub", href: "https://github.com/Manmeet64/BigO", type: "github" },
    ],
    featured: false,
    accent: "100,160,100",
    category: "EdTech · Project",
    image: "/bigo.jpg",
  },
  {
    id: 6,
    title: "A3S Implementation",
    tagline: "Auth-as-a-Service with ABAC for a university portal",
    description:
      "Built a university portal demo on top of A3S, an ABAC authorization server. The interesting part: a custom Modifier Server that hooks into A3S token issuance via mTLS — it intercepts raw OIDC claims and enriches them with role, department, and access level based on email domain before the JWT is signed. React frontend, Express BFF with token cloaking endpoints, and shell-scripted namespace + policy setup for the full auth flow.",
    tech: ["React", "Node.js", "Express.js", "Go", "Docker", "OIDC"],
    links: [
      { label: "GitHub", href: "https://github.com/Manmeet64/A3S", type: "github" },
    ],
    featured: false,
    accent: "130,80,160",
    category: "Full-Stack · Project",
    image: "/p2.jpg",
  },
];

/* ── Card component ─────────────────────────────────── */
function ProjectCard({
  project,
  index,
  span,
}: {
  project: Project;
  index: number;
  span: "full" | "half";
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: span === "full" ? "1 / -1" : "span 1",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        padding: span === "full" ? "36px 40px" : "28px 28px",
        overflow: "hidden",
        transition: "border-color 0.3s cubic-bezier(0.32,0.72,0,1), box-shadow 0.3s cubic-bezier(0.32,0.72,0,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        cursor: "default",
        boxShadow: hovered
          ? `0 16px 48px -12px rgba(${project.accent},0.18), 0 4px 16px -4px rgba(0,0,0,0.08)`
          : "0 2px 8px -4px rgba(0,0,0,0.06)",
        borderColor: hovered ? `rgba(${project.accent},0.35)` : "var(--border)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Subtle accent glow — top edge */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "20%",
        right: "20%",
        height: "1px",
        background: `linear-gradient(90deg, transparent, rgba(${project.accent},${hovered ? 0.5 : 0.2}), transparent)`,
        transition: "opacity 0.3s ease",
      }} />

      {/* Project screenshot — shown for full-width cards (featured) */}
      {project.image && span === "full" && (
        <div style={{
          marginBottom: "28px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          position: "relative",
          aspectRatio: "16/7",
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 0.6s cubic-bezier(0.32,0.72,0,1)",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          />
          {/* Subtle overlay gradient */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 60%, color-mix(in srgb, var(--bg-card) 40%, transparent) 100%)",
            pointerEvents: "none",
          }} />
        </div>
      )}

      {/* Project screenshot — shown as side thumbnail for half cards */}
      {project.image && span === "half" && (
        <div style={{
          marginBottom: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          aspectRatio: "16/9",
          position: "relative",
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 0.6s cubic-bezier(0.32,0.72,0,1)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, color-mix(in srgb, var(--bg-card) 50%, transparent) 100%)",
            pointerEvents: "none",
          }} />
        </div>
      )}

      {/* Top row: category tag + links */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "20px",
        gap: "12px",
      }}>
        {/* Category pill — double-bezel outer shell */}
        <div style={{
          padding: "1.5px",
          borderRadius: "9999px",
          background: `linear-gradient(135deg, rgba(${project.accent},0.3), rgba(${project.accent},0.1))`,
        }}>
          <span style={{
            display: "inline-block",
            padding: "4px 11px",
            borderRadius: "9999px",
            backgroundColor: "var(--bg-card)",
            fontSize: "10px",
            fontWeight: 600,
            color: `rgba(${project.accent},1)`,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {project.category}
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              title={link.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "9999px",
                border: "1px solid var(--border-strong)",
                backgroundColor: "var(--bg-muted)",
                color: "var(--text-muted)",
                transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = `rgba(${project.accent},0.5)`;
                el.style.color = `rgba(${project.accent},1)`;
                el.style.backgroundColor = `rgba(${project.accent},0.06)`;
                el.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border-strong)";
                el.style.color = "var(--text-muted)";
                el.style.backgroundColor = "var(--bg-muted)";
                el.style.transform = "scale(1)";
              }}
            >
              {link.type === "github" ? <GithubIcon size={14} /> : <ArrowUpRight size={14} />}
            </a>
          ))}
        </div>
      </div>

      {/* Title + tagline */}
      <h3 style={{
        fontSize: span === "full" ? "clamp(20px, 2.2vw, 26px)" : "18px",
        fontWeight: 700,
        color: "var(--text-primary)",
        letterSpacing: "-0.03em",
        lineHeight: 1.15,
        marginBottom: "8px",
      }}>
        {project.title}
      </h3>

      <p style={{
        fontSize: "12px",
        fontWeight: 600,
        color: `rgba(${project.accent},0.9)`,
        letterSpacing: "0.04em",
        marginBottom: "14px",
        textTransform: "uppercase",
      }}>
        {project.tagline}
      </p>

      <p style={{
        fontSize: "14px",
        color: "var(--text-secondary)",
        lineHeight: 1.7,
        marginBottom: "24px",
        maxWidth: span === "full" ? "680px" : "100%",
        flex: 1,
      }}>
        {project.description}
      </p>

      {/* Tech stack — inner-bezel chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: "3px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--text-muted)",
              backgroundColor: "var(--bg-muted)",
              border: "1px solid var(--border)",
              letterSpacing: "0.02em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

/* ── Section ────────────────────────────────────────── */
export function Projects() {
  // Layout: full, half, half, full, half, half
  const layout: ("full" | "half")[] = ["full", "half", "half", "full", "half", "half"];

  return (
    <section
      id="projects"
      style={{
        backgroundColor: "var(--bg)",
        padding: "120px 0 100px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 40px",
        }}
        className="projects-wrapper"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...SPRING }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "12px",
            }}>
              <span style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}>
                Selected work
              </span>
              <span style={{ width: "24px", height: "1px", backgroundColor: "var(--accent)", opacity: 0.5 }} />
            </div>

            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}>
              Things I&apos;ve built.
            </h2>
          </div>

          {/* View all CTA — top right, desktop */}
          <motion.a
            href="/projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              padding: "9px 9px 9px 18px",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              borderRadius: "9999px",
              letterSpacing: "0.01em",
              transition: "border-color 0.25s cubic-bezier(0.32,0.72,0,1), color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
              flexShrink: 0,
              alignSelf: "flex-end",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--accent)";
              el.style.color = "var(--text-primary)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 6px 20px -4px rgba(59,74,107,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--border-strong)";
              el.style.color = "var(--text-secondary)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            View all projects
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "26px",
              height: "26px",
              marginLeft: "8px",
              borderRadius: "9999px",
              backgroundColor: "var(--bg-muted)",
              flexShrink: 0,
            }}>
              <ArrowUpRight size={13} />
            </span>
          </motion.a>
        </motion.div>

        {/* 2×2 asymmetric grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
          className="projects-grid"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              span={layout[i]}
            />
          ))}
        </div>

        {/* View all — bottom, mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING, delay: 0.35 }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
          className="view-all-mobile"
        >
          <a
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              padding: "10px 10px 10px 22px",
              fontSize: "13.5px",
              fontWeight: 600,
              color: "var(--text-primary)",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              borderRadius: "9999px",
              letterSpacing: "0.01em",
              transition: "border-color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--accent)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "var(--border-strong)";
              el.style.transform = "translateY(0)";
            }}
          >
            View all projects
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              marginLeft: "10px",
              borderRadius: "9999px",
              backgroundColor: "var(--bg-muted)",
              flexShrink: 0,
            }}>
              <ArrowUpRight size={13} />
            </span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-wrapper {
            padding: 0 20px !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-grid article {
            grid-column: 1 / -1 !important;
            padding: 24px 20px !important;
          }
          /* On mobile the top "view all" is hidden, bottom one shows */
          .projects-wrapper > div:first-child a[href="/projects"] {
            display: none;
          }
        }
        @media (min-width: 769px) {
          .view-all-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

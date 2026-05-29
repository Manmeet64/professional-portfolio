"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

/* ── Spring config ──────────────────────────────────── */
const SPRING = { type: "spring", stiffness: 80, damping: 22 } as const;

/* ── Timeline data ──────────────────────────────────── */
interface TimelineEntry {
  id: number;
  type: "work" | "education";
  date: string;
  role: string;
  org: string;
  orgUrl?: string;
  location: string;
  current?: boolean;
  description: string[];
  tags: string[];
}

const TIMELINE: TimelineEntry[] = [
  {
    id: 1,
    type: "work",
    date: "May 2025 — Present",
    role: "Software Engineer Intern",
    org: "Winvesta",
    orgUrl: "https://winvesta.in",
    location: "Remote · Fintech",
    current: true,
    description: [
      "Reduced withdrawal processing time by 85% by building a 3-tier compliance automation system (n8n, Django, React).",
      "Cut CMS infrastructure costs by 80% by migrating HubSpot to headless Next.js + Sanity with a custom Node.js migration agent.",
      "Sped up content and analytics turnaround by 50% by building LLM-powered agents for news, publishing, and reporting pipelines.",
      "Contributed to a greenfield B2B payouts platform covering Django backend architecture, database schemas, and vendor onboarding UI.",
    ],
    tags: ["Django", "React", "Next.js", "n8n", "Node.js", "PostgreSQL", "Sanity"],
  },
  {
    id: 2,
    type: "work",
    date: "Nov 2024 — Present",
    role: "Co-Founder & Builder",
    org: "Momentum Health Club",
    location: "Navi Mumbai",
    current: true,
    description: [
      "2,800+ followers, 24+ events, ₹7-8k profit. Grew a bootstrapped offline fitness community from scratch.",
      "Built Vector, an internal ops dashboard (React + TypeScript + Supabase) for managing members and tracking events.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind"],
  },
  {
    id: 3,
    type: "work",
    date: "Jun 2025 — Dec 2025",
    role: "Frontend Developer",
    org: "BizMate",
    location: "Remote · Freelance",
    current: false,
    description: [
      "Built an Inventory Management System frontend in React + TypeScript, integrated with a Java backend.",
      "Redesigned and shipped the landing page, improving clarity and user flow.",
    ],
    tags: ["React", "TypeScript", "Java API"],
  },
  {
    id: 4,
    type: "work",
    date: "Dec 2024",
    role: "Marketing & UX Research Intern",
    org: "LetsUpgrade",
    location: "Navi Mumbai",
    current: false,
    description: [
      "Conducted user behaviour research for 12thClass.com (1M+ users), delivering UX improvement recommendations to reduce drop-off.",
    ],
    tags: ["UX Research", "User Behaviour", "Edtech"],
  },
  {
    id: 5,
    type: "education",
    date: "Aug 2023 — Aug 2027",
    role: "B.Tech, Computer Science & Engineering",
    org: "ITM Skills University",
    location: "Mumbai, India",
    current: true,
    description: [
      "3rd year CSE undergraduate. Focus areas: algorithms, systems, and applied ML.",
    ],
    tags: ["C++", "Python", "DSA", "OS", "DBMS", "Leadership", "Design Thinking"],
  },
  {
    id: 6,
    type: "education",
    date: "2012 — 2023",
    role: "High School Diploma, Computer Science",
    org: "Don Bosco Higher Secondary School",
    location: "India",
    current: false,
    description: [
      "Studied Computer Science with focus on C++ and Python programming.",
    ],
    tags: ["C++", "Python"],
  },
];

/* ── Single entry component ─────────────────────────── */
function TimelineEntry({
  entry,
  index,
  hoveredId,
  setHoveredId,
}: {
  entry: TimelineEntry;
  index: number;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) {
  const isDimmed = hoveredId !== null && hoveredId !== entry.id;
  const isHovered = hoveredId === entry.id;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING, delay: index * 0.1 }}
      onMouseEnter={() => setHoveredId(entry.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: "0 40px",
        position: "relative",
        opacity: isDimmed ? 0.35 : 1,
        transition: "opacity 0.3s cubic-bezier(0.32,0.72,0,1)",
      }}
      className="timeline-entry"
    >
      {/* ── Left: date column ── */}
      <div
        style={{
          textAlign: "right",
          paddingTop: "3px",
          paddingRight: "0",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: isHovered ? "var(--accent)" : "var(--text-muted)",
            letterSpacing: "0.04em",
            lineHeight: 1.5,
            transition: "color 0.25s cubic-bezier(0.32,0.72,0,1)",
            display: "block",
          }}
        >
          {entry.date}
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "var(--text-muted)",
            opacity: 0.6,
            letterSpacing: "0.02em",
            marginTop: "2px",
            display: "block",
          }}
        >
          {entry.location}
        </span>
      </div>

      {/* ── Center: connector dot + line (handled by parent rail) ── */}
      {/* ── Right: content ── */}
      <div style={{ paddingBottom: "52px" }}>
        {/* Top row: type badge + current badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* Type pill */}
          <span
            style={{
              display: "inline-block",
              padding: "2px 9px",
              borderRadius: "9999px",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              backgroundColor:
                entry.type === "work"
                  ? "color-mix(in srgb, var(--accent) 12%, transparent)"
                  : "color-mix(in srgb, var(--text-muted) 12%, transparent)",
              color:
                entry.type === "work" ? "var(--accent)" : "var(--text-muted)",
              border: `1px solid ${
                entry.type === "work"
                  ? "color-mix(in srgb, var(--accent) 25%, transparent)"
                  : "var(--border)"
              }`,
            }}
          >
            {entry.type === "work" ? "Work" : "Education"}
          </span>

          {/* Current badge */}
          {entry.current && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "2px 8px",
                borderRadius: "9999px",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                backgroundColor:
                  "color-mix(in srgb, #22c55e 10%, transparent)",
                color: "#22c55e",
                border: "1px solid color-mix(in srgb, #22c55e 25%, transparent)",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  animation: "ping-sm 1.8s cubic-bezier(0,0,0.2,1) infinite",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Current
            </span>
          )}
        </div>

        {/* Role title */}
        <h3
          style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            fontWeight: 700,
            color: isHovered ? "var(--accent)" : "var(--text-primary)",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            marginBottom: "4px",
            transition: "color 0.25s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          {entry.role}
        </h3>

        {/* Org */}
        {entry.orgUrl ? (
          <a
            href={entry.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "15.5px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "16px",
              textDecoration: "none",
              transition: "color 0.2s cubic-bezier(0.32,0.72,0,1)",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--text-secondary)";
            }}
          >
            {entry.org}
            <svg
              width="11"
              height="11"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
            </svg>
          </a>
        ) : (
          <p
            style={{
              fontSize: "15.5px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "16px",
              letterSpacing: "-0.01em",
            }}
          >
            {entry.org}
          </p>
        )}

        {/* Description bullets */}
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          {entry.description.map((line, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "15.5px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              <span
                style={{
                  marginTop: "8px",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
              {line}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {entry.tags.map((tag) => (
            <span
              key={tag}
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
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────── */
export function Experience() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  /* Scroll-linked line draw */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
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
        className="experience-wrapper"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...SPRING }}
          style={{ marginBottom: "64px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Career + Education
            </span>
            <span
              style={{
                width: "24px",
                height: "1px",
                backgroundColor: "var(--accent)",
                opacity: 0.5,
              }}
            />
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Where I&apos;ve been.
          </h2>
        </motion.div>

        {/* Timeline body */}
        <div
          style={{
            position: "relative",
            paddingLeft: "calc(140px + 40px + 20px)",
          }}
          className="timeline-body"
        >
          {/* Scroll-linked vertical rail */}
          <div
            style={{
              position: "absolute",
              left: "calc(140px + 40px + 20px - 1px)",
              top: "6px",
              bottom: "0",
              width: "1px",
              backgroundColor: "var(--border)",
              transformOrigin: "top",
              overflow: "hidden",
            }}
            className="timeline-rail-bg"
          >
            <motion.div
              ref={railRef}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, var(--accent), color-mix(in srgb, var(--accent) 30%, var(--border)))",
                scaleY: lineScaleY,
                transformOrigin: "top",
              }}
            />
          </div>

          {/* Entries */}
          {TIMELINE.map((entry, i) => (
            <div key={entry.id} style={{ position: "relative" }}>
              {/* Connector dot — sits on the rail */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: i * 0.1 + 0.05 }}
                style={{
                  position: "absolute",
                  left: "-20px",
                  top: "4px",
                  transform: "translateX(-50%)",
                  width: entry.current ? "10px" : "8px",
                  height: entry.current ? "10px" : "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    hoveredId === entry.id || entry.current
                      ? "var(--accent)"
                      : "var(--border-strong)",
                  border: "2px solid var(--bg)",
                  boxShadow:
                    hoveredId === entry.id
                      ? "0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent)"
                      : entry.current
                      ? "0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent)"
                      : "none",
                  transition:
                    "background-color 0.25s cubic-bezier(0.32,0.72,0,1), box-shadow 0.25s cubic-bezier(0.32,0.72,0,1)",
                  zIndex: 1,
                }}
              />

              {/* The actual entry — positioned to align with the rail */}
              <div
                style={{
                  marginLeft: "0",
                  position: "relative",
                }}
              >
                <TimelineEntry
                  entry={entry}
                  index={i}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ping-sm {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @media (max-width: 768px) {
          .experience-wrapper {
            padding: 0 20px !important;
          }
          .timeline-body {
            padding-left: 24px !important;
          }
          .timeline-rail-bg {
            left: 6px !important;
          }
          .timeline-entry {
            grid-template-columns: 1fr !important;
          }
          .timeline-entry > div:first-child {
            text-align: left !important;
            margin-bottom: 4px;
          }
        }
      `}</style>
    </section>
  );
}

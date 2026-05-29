"use client";

import { motion } from "motion/react";
import { useState } from "react";

const SPRING = { type: "spring", stiffness: 80, damping: 22 } as const;

/* ── Skill data grouped by resume category ──────────────── */
interface Skill {
  name: string;
  icon: string;
  iconDark?: string; // alternative for dark mode (e.g. invert needed)
  needsInvert?: boolean; // invert icon in light OR dark mode
}

interface SkillGroup {
  label: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Languages",
    skills: [
      { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "Django",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg", needsInvert: true },
      { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", needsInvert: true },
      { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", needsInvert: true },
      { name: "FastAPI",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
    ],
  },
  {
    label: "Automation\n& Platforms",
    skills: [
      { name: "n8n",        icon: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "Sanity CMS", icon: "https://cdn.simpleicons.org/sanity/F03E2F" },
      { name: "HubSpot",    icon: "https://cdn.simpleicons.org/hubspot/FF7A59" },
      { name: "Metabase",   icon: "https://cdn.simpleicons.org/metabase/509EE3" },
      { name: "Sentry",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sentry/sentry-original.svg" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "SQL",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
    ],
  },
  {
    label: "Tools & Core",
    skills: [
      { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", needsInvert: true },
      { name: "Linux",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
      { name: "AWS",         icon: "https://cdn.simpleicons.org/amazonaws/FF9900" },
      { name: "Claude Code", icon: "https://cdn.simpleicons.org/anthropic/D97706" },
      { name: "API Design",  icon: "https://cdn.simpleicons.org/postman/FF6C37" },
    ],
  },
];

/* ── Skill pill ──────────────────────────────────────────── */
function SkillPill({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 14px 7px 9px",
        borderRadius: "9999px",
        border: `1px solid ${hovered
          ? "color-mix(in srgb, var(--accent) 35%, transparent)"
          : "var(--border-strong)"}`,
        backgroundColor: hovered
          ? "color-mix(in srgb, var(--accent) 6%, var(--bg-card))"
          : "var(--bg-card)",
        cursor: "default",
        transition: "border-color 0.22s cubic-bezier(0.32,0.72,0,1), background-color 0.22s cubic-bezier(0.32,0.72,0,1), box-shadow 0.22s ease",
        boxShadow: hovered
          ? "0 4px 16px -4px color-mix(in srgb, var(--accent) 18%, transparent)"
          : "none",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "opacity 0.2s ease",
          opacity: hovered ? 1 : 0.8,
        }}
        className={skill.needsInvert ? "skill-icon-invert" : ""}
      >
        <img
          src={skill.icon}
          alt={skill.name.replace("\n", " ")}
          width={20}
          height={20}
          style={{ display: "block", objectFit: "contain" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </span>
      <span
        style={{
          fontSize: "13.5px",
          fontWeight: 500,
          color: hovered ? "var(--accent)" : "var(--text-secondary)",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          lineHeight: 1,
          transition: "color 0.22s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {skill.name.replace("\n", " ")}
      </span>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export function Skills() {
  return (
    <section
      id="skills"
      style={{
        backgroundColor: "var(--bg)",
        padding: "120px 0 100px",
      }}
    >
      <div
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px" }}
        className="skills-wrapper"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...SPRING }}
          style={{ marginBottom: "64px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "14px" }}>
            <span style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--accent)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}>
              Technical stack
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
            What I work with.
          </h2>
        </motion.div>

        {/* Definition list — resume grouped */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...SPRING, delay: gi * 0.08 }}
              style={{
                display: "grid",
                gridTemplateColumns: "130px 1fr",
                gap: "0 32px",
                alignItems: "start",
                padding: "24px 0",
                borderBottom: gi < SKILL_GROUPS.length - 1
                  ? "1px solid var(--border)"
                  : "none",
              }}
              className="skill-row"
            >
              {/* Category label */}
              <div style={{
                paddingTop: "4px",
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: "10.5px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}>
                  {group.label}
                </span>
              </div>

              {/* Pills */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
              }}>
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...SPRING, delay: gi * 0.06 + si * 0.04 }}
                  >
                    <SkillPill skill={skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        /* In dark mode, invert black icons (Next.js, GitHub, Django, Express) */
        .dark .skill-icon-invert img {
          filter: invert(1) brightness(1.1);
        }
        /* In light mode, invert them to show dark on light bg */
        :root:not(.dark) .skill-icon-invert img {
          filter: none;
        }
        @media (max-width: 640px) {
          .skills-wrapper { padding: 0 20px !important; }
          .skill-row {
            grid-template-columns: 1fr !important;
            gap: 12px 0 !important;
          }
        }
        @media (max-width: 900px) {
          .skill-row {
            grid-template-columns: 110px 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { useState } from "react";

const SPRING = { type: "spring", stiffness: 80, damping: 22 } as const;

/* ── Category config ────────────────────────────────── */
const CATEGORY_STYLES: Record<string, { label: string; accent: string; bg: string }> = {
  hackathon:   { label: "Hackathon",   accent: "59,74,107",   bg: "color-mix(in srgb, #3B4A6B 8%, var(--bg-card))"  },
  academic:    { label: "Academic",    accent: "80,110,90",   bg: "color-mix(in srgb, #507A5A 8%, var(--bg-card))"  },
  workshop:    { label: "Workshop",    accent: "130,95,60",   bg: "color-mix(in srgb, #825F3C 8%, var(--bg-card))"  },
  cert:        { label: "Certificate", accent: "100,80,140",  bg: "color-mix(in srgb, #64508C 8%, var(--bg-card))"  },
  sport:       { label: "Sport",       accent: "140,80,80",   bg: "color-mix(in srgb, #8C5050 8%, var(--bg-card))"  },
  founder:     { label: "Founder",     accent: "59,74,107",   bg: "color-mix(in srgb, #3B4A6B 8%, var(--bg-card))"  },
  competitive: { label: "Competitive", accent: "70,100,120",  bg: "color-mix(in srgb, #466478 8%, var(--bg-card))"  },
};

/* ── Data ───────────────────────────────────────────── */
interface Achievement {
  id: number;
  category: keyof typeof CATEGORY_STYLES;
  headline: string;
  context: string;
  detail?: string;
  span: "wide" | "narrow"; // wide = col-span-2, narrow = col-span-1
  tall?: boolean;           // optional row-span-2
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    category: "hackathon",
    headline: "2× Hackathon Finalist",
    context: "Competed across multiple national-level hackathons, reaching the finals twice.",
    detail: "Built and pitched full-stack products under 24–48 hr constraints against 100+ teams.",
    span: "wide",
  },
  {
    id: 2,
    category: "academic",
    headline: "9.7 CGPA — First Semester",
    context: "B.Tech Computer Science, ITM Skills University",
    detail: "Top academic performance in the inaugural semester of the engineering program.",
    span: "narrow",
  },
  {
    id: 3,
    category: "founder",
    headline: "Founded Momentum Health Club",
    context: "Built a fitness community platform from zero — product, code, and growth.",
    detail: "Member management, workout tracking, content hub. Active user base. Currently building Vector, the operator dashboard for Momentum.",
    span: "narrow",
    tall: true,
  },
  {
    id: 4,
    category: "workshop",
    headline: "Git & GitHub Trainer",
    context: "Conducted a hands-on workshop for MBA students.",
    detail: "Covered version control fundamentals, branching strategy, and collaborative workflows.",
    span: "narrow",
  },
  {
    id: 5,
    category: "competitive",
    headline: "LeetCode — 100+ Problems",
    context: "Consistent competitive programming practice.",
    detail: "Solved 100+ problems across arrays, trees, DP, graphs, and system design patterns.",
    span: "narrow",
  },
  {
    id: 6,
    category: "cert",
    headline: "HackerRank Certified",
    context: "Java Basic · SQL Basic · Problem Solving",
    span: "wide",
  },
  {
    id: 7,
    category: "sport",
    headline: "DSO — Runner-up & Bronze",
    context: "Runner-up in football · Bronze in long jump · District-level shot put & athletics.",
    detail: "Don Bosco Senior Secondary School, Nerul.",
    span: "narrow",
  },
  {
    id: 8,
    category: "academic",
    headline: "Public Speaking — Prize Winner",
    context: "Received recognition in public speaking during B.Tech program.",
    span: "narrow",
  },
];

/* ── Tile component ─────────────────────────────────── */
function AchievementTile({
  item,
  index,
}: {
  item: Achievement;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_STYLES[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...SPRING, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: item.span === "wide" ? "span 2" : "span 1",
        gridRow: item.tall ? "span 2" : "span 1",
        padding: "24px 24px 22px",
        borderRadius: "16px",
        backgroundColor: hovered ? cat.bg : "var(--bg-card)",
        border: `1px solid ${
          hovered
            ? `rgba(${cat.accent}, 0.35)`
            : "var(--border)"
        }`,
        boxShadow: hovered
          ? `0 12px 32px -8px rgba(${cat.accent}, 0.15), 0 2px 8px -4px rgba(0,0,0,0.06)`
          : "0 2px 8px -4px rgba(0,0,0,0.04)",
        transition: "background-color 0.28s cubic-bezier(0.32,0.72,0,1), border-color 0.28s cubic-bezier(0.32,0.72,0,1), box-shadow 0.28s cubic-bezier(0.32,0.72,0,1)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        cursor: "default",
      }}
      className="achievement-tile"
    >
      {/* Left accent border */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: "3px",
          borderRadius: "0 3px 3px 0",
          backgroundColor: `rgba(${cat.accent}, ${hovered ? 0.8 : 0.3})`,
          transition: "opacity 0.28s ease, background-color 0.28s ease",
        }}
      />

      {/* Category pill */}
      <span
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "3px 9px",
          borderRadius: "9999px",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          backgroundColor: `rgba(${cat.accent}, 0.1)`,
          color: `rgba(${cat.accent}, 1)`,
          border: `1px solid rgba(${cat.accent}, 0.22)`,
          marginBottom: "14px",
          marginLeft: "12px",
        }}
      >
        {cat.label}
      </span>

      {/* Headline */}
      <h3
        style={{
          fontSize: item.span === "wide" ? "17px" : "15.5px",
          fontWeight: 700,
          color: hovered ? `rgba(${cat.accent}, 1)` : "var(--text-primary)",
          letterSpacing: "-0.025em",
          lineHeight: 1.25,
          marginBottom: "8px",
          marginLeft: "12px",
          transition: "color 0.25s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {item.headline}
      </h3>

      {/* Context */}
      <p
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          fontWeight: 450,
          marginLeft: "12px",
          marginBottom: item.detail ? "10px" : "0",
        }}
      >
        {item.context}
      </p>

      {/* Detail — shown when tall or wide */}
      {item.detail && (
        <p
          style={{
            fontSize: "12.5px",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            fontWeight: 450,
            marginLeft: "12px",
            marginTop: "auto",
            paddingTop: "8px",
          }}
        >
          {item.detail}
        </p>
      )}
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────── */
export function Achievements() {
  return (
    <section
      id="achievements"
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
        className="achievements-wrapper"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...SPRING }}
          style={{ marginBottom: "56px" }}
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
              Beyond the code
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
            Achievements &amp; co-curriculars.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px",
            gridAutoRows: "auto",
          }}
          className="achievements-grid"
        >
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementTile key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .achievements-wrapper {
            padding: 0 20px !important;
          }
          .achievements-grid {
            grid-template-columns: 1fr !important;
          }
          .achievement-tile {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }
        @media (min-width: 769px) and (max-width: 960px) {
          .achievements-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

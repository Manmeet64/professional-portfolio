"use client";

import { motion } from "motion/react";
import { useRef } from "react";

const SPRING = {
  type: "spring",
  stiffness: 80,
  damping: 22,
} as const;

const FADE_LEFT = {
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
};

const FADE_RIGHT = {
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
};

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const stats = [
  { value: "85%",   label: "Faster withdrawals" },
  { value: "2,800+", label: "Momentum members" },
  { value: "4+",    label: "Prod systems shipped" },
];

// Inline SVGs — no icon library needed
const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
  </svg>
);

const MapPin = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z" />
    <circle cx="7" cy="5" r="1.2" />
  </svg>
);

const Briefcase = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="4.5" width="11" height="8" rx="1.5" />
    <path d="M4.5 4.5V3a1.5 1.5 0 013 0v1.5" />
  </svg>
);

export function AboutSummary() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="about-summary"
      style={{
        backgroundColor: "var(--bg)",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* ── LEFT: Photo with double-bezel architecture ── */}
        <motion.div
          {...FADE_LEFT}
          transition={{ ...SPRING, delay: 0.05 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}
        >
          {/* Outer shell — doppelrand */}
          <div
            style={{
              position: "relative",
              padding: "6px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, var(--border-strong) 0%, var(--border) 50%, var(--border-strong) 100%)",
              boxShadow: "0 20px 60px -12px color-mix(in srgb, var(--accent) 18%, transparent), 0 4px 16px -4px rgba(0,0,0,0.08)",
            }}
          >
            {/* Inner shell */}
            <div
              style={{
                padding: "4px",
                borderRadius: "9999px",
                backgroundColor: "var(--bg-card)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              {/* Photo circle */}
              <div
                style={{
                  width: "260px",
                  height: "260px",
                  borderRadius: "9999px",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-muted)",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/man.png"
                  alt="Manmeet Singh"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              </div>
            </div>

            {/* Floating status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.45 }}
              style={{
                position: "absolute",
                bottom: "12px",
                right: "-8px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px 6px 8px",
                borderRadius: "9999px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 16px -4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
                whiteSpace: "nowrap",
              }}
            >
              {/* Pulsing green dot */}
              <span style={{ position: "relative", width: "7px", height: "7px", display: "inline-flex", flexShrink: 0 }}>
                <span style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "#4ade80",
                  opacity: 0.4,
                  animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
                }} />
                <span style={{
                  position: "relative",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }} />
              </span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.01em" }}>
                Open to work
              </span>
            </motion.div>
          </div>

          {/* Stat pills row */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...FADE_UP}
                transition={{ ...SPRING, delay: 0.25 + i * 0.08 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "12px 18px",
                  borderRadius: "14px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 2px 8px -2px rgba(0,0,0,0.06)",
                  minWidth: "80px",
                }}
              >
                <span style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT: Summary text ── */}
        <motion.div
          {...FADE_RIGHT}
          transition={{ ...SPRING, delay: 0.12 }}
          style={{ display: "flex", flexDirection: "column", gap: "0" }}
        >
          {/* Eyebrow */}
          <motion.div
            {...FADE_UP}
            transition={{ ...SPRING, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "20px",
              alignSelf: "flex-start",
            }}
          >
            <span style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--accent)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}>
              About me
            </span>
            <span style={{ width: "24px", height: "1px", backgroundColor: "var(--accent)", opacity: 0.5 }} />
          </motion.div>

          {/* Headline */}
          <motion.h2
            {...FADE_UP}
            transition={{ ...SPRING, delay: 0.18 }}
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Backend + AI engineer.
            <br />
            <span style={{ color: "var(--accent)" }}>Builder by default.</span>
          </motion.h2>

          {/* Body copy */}
          <motion.p
            {...FADE_UP}
            transition={{ ...SPRING, delay: 0.26 }}
            style={{
              fontSize: "15.5px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "16px",
              maxWidth: "520px",
            }}
          >
            Production experience in fintech: compliance automation pipelines,
            LLM-powered agents, headless CMS migrations, and cross-border payment flows.
            I build with{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Python, Django, FastAPI, Node.js, React,</span>{" "}
            and{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Next.js.</span>
          </motion.p>

          <motion.p
            {...FADE_UP}
            transition={{ ...SPRING, delay: 0.32 }}
            style={{
              fontSize: "15.5px",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
              marginBottom: "36px",
              maxWidth: "520px",
            }}
          >
            Currently interning at{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Winvesta</span>{" "}
            and freelancing on the side. I also co-founded{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>Momentum</span>
            {" "}a fitness community of 2,800+ people that I also built the tech for.
            Going deep on backend systems and AI engineering, building toward a role
            where I can own product decisions from day one.
          </motion.p>

          {/* Meta tags — location, role */}
          <motion.div
            {...FADE_UP}
            transition={{ ...SPRING, delay: 0.38 }}
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {[
              { icon: <MapPin />, text: "India" },
              { icon: <Briefcase />, text: "Backend + AI Engineer" },
            ].map((tag) => (
              <span
                key={tag.text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 11px",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  backgroundColor: "var(--bg-muted)",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  letterSpacing: "0.01em",
                }}
              >
                <span style={{ color: "var(--text-muted)", display: "inline-flex" }}>{tag.icon}</span>
                {tag.text}
              </span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            {...FADE_UP}
            transition={{ ...SPRING, delay: 0.42 }}
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "var(--border)",
              marginBottom: "32px",
              maxWidth: "520px",
            }}
          />

          {/* CTA row */}
          <motion.div
            {...FADE_UP}
            transition={{ ...SPRING, delay: 0.48 }}
            style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0",
                padding: "10px 10px 10px 20px",
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--bg)",
                backgroundColor: "var(--accent)",
                borderRadius: "9999px",
                letterSpacing: "0.01em",
                transition: "background-color 0.3s cubic-bezier(0.32,0.72,0,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "var(--accent-hover)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 24px color-mix(in srgb, var(--accent) 28%, transparent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "var(--accent)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.97)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            >
              View Resume
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "26px",
                height: "26px",
                marginLeft: "8px",
                borderRadius: "9999px",
                backgroundColor: "rgba(0,0,0,0.15)",
                flexShrink: 0,
              }}>
                <ArrowUpRight />
              </span>
            </a>

            <a
              href="https://github.com/Manmeet64"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                backgroundColor: "transparent",
                border: "1px solid var(--border-strong)",
                borderRadius: "9999px",
                letterSpacing: "0.01em",
                transition: "border-color 0.25s cubic-bezier(0.32,0.72,0,1), color 0.25s cubic-bezier(0.32,0.72,0,1), transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--text-primary)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "var(--border-strong)";
                el.style.color = "var(--text-secondary)";
                el.style.transform = "translateY(0)";
              }}
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding: 0 24px !important;
          }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

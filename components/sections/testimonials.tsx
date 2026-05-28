"use client";

import { motion } from "motion/react";
import { useState } from "react";

const SPRING = { type: "spring", stiffness: 80, damping: 22 } as const;

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  context: string;
  linkedIn: string;
  initials: string;
  accentColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "I worked with Manmeet, who was a dedicated and reliable team member of our tech team. He successfully delivered the AI withdrawal agent and handled the investment products backend during a job rotation. Manmeet consistently delivered quality work and added meaningful value to the team through his ownership and commitment. I wish him continued success ahead.",
    name: "Sabir Khan",
    role: "Fintech Operations & CS Leader",
    context: "Senior colleague at Winvesta · Dec 2025",
    linkedIn: "https://www.linkedin.com/in/sabirkhan/",
    initials: "SK",
    accentColor: "59,74,107",
  },
  {
    id: 2,
    quote:
      "You can't go wrong with Manmeet. From his skill at coding to his desire to improve himself and become better than what he was yesterday — you simply cannot go wrong.",
    name: "Hatim Janjali",
    role: "Senior Marketer · AI Marketing Specialist",
    context: "Manager at Winvesta · Jan 2026",
    linkedIn: "https://www.linkedin.com/in/hatimjanjali/",
    initials: "HJ",
    accentColor: "80,120,160",
  },
];

function QuoteIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden>
      <path
        d="M0 24V14.4C0 10.56 0.96 7.36 2.88 4.8C4.86667 2.18667 7.73333 0.533333 11.48 0L13.2 2.64C10.5867 3.06667 8.56 4.13333 7.12 5.84C5.74667 7.48 5.06667 9.41333 5.08 11.64H10.04V24H0ZM18.8 24V14.4C18.8 10.56 19.76 7.36 21.68 4.8C23.6667 2.18667 26.5333 0.533333 30.28 0L32 2.64C29.3867 3.06667 27.36 4.13333 25.92 5.84C24.5467 7.48 23.8667 9.41333 23.88 11.64H28.84V24H18.8Z"
        fill="currentColor"
        opacity="0.15"
      />
    </svg>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "36px 36px 32px",
        borderRadius: "20px",
        backgroundColor: "var(--bg-card)",
        border: `1px solid ${hovered ? `rgba(${t.accentColor},0.3)` : "var(--border)"}`,
        boxShadow: hovered
          ? `0 16px 48px -12px rgba(${t.accentColor},0.12), 0 4px 16px -4px rgba(0,0,0,0.06)`
          : "0 2px 8px -4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "border-color 0.3s cubic-bezier(0.32,0.72,0,1), box-shadow 0.3s cubic-bezier(0.32,0.72,0,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "20%",
        right: "20%",
        height: "1px",
        background: `linear-gradient(90deg, transparent, rgba(${t.accentColor},${hovered ? 0.4 : 0.15}), transparent)`,
        transition: "opacity 0.3s ease",
        borderRadius: "9999px",
      }} />

      {/* Quote icon */}
      <div style={{ color: `rgba(${t.accentColor},1)`, marginBottom: "20px" }}>
        <QuoteIcon />
      </div>

      {/* Quote text */}
      <p style={{
        fontSize: "15.5px",
        color: "var(--text-secondary)",
        lineHeight: 1.75,
        fontWeight: 450,
        flex: 1,
        marginBottom: "32px",
        letterSpacing: "-0.005em",
      }}>
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Avatar — initials circle */}
        <div style={{
          width: "42px",
          height: "42px",
          borderRadius: "9999px",
          backgroundColor: `rgba(${t.accentColor},0.12)`,
          border: `1px solid rgba(${t.accentColor},0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: "12px",
            fontWeight: 700,
            color: `rgba(${t.accentColor},0.9)`,
            letterSpacing: "0.04em",
          }}>
            {t.initials}
          </span>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <a
            href={t.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "2px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = `rgba(${t.accentColor},1)`; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-primary)"; }}
          >
            {t.name}
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
            </svg>
          </a>
          <p style={{
            fontSize: "11.5px",
            color: "var(--text-muted)",
            fontWeight: 450,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {t.role}
          </p>
          <p style={{
            fontSize: "10.5px",
            color: "var(--text-muted)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            marginTop: "2px",
            opacity: 0.7,
          }}>
            {t.context}
          </p>
        </div>

        {/* LinkedIn badge */}
        <a
          href={t.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          title="View on LinkedIn"
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
            flexShrink: 0,
            transition: "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.borderColor = "#0077B5";
            el.style.color = "#0077B5";
            el.style.backgroundColor = "rgba(0,119,181,0.06)";
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
          {/* LinkedIn logo SVG */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: "var(--bg-card)",
        padding: "120px 0 100px",
        overflow: "hidden",
      }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}
        className="testimonials-wrapper"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...SPRING }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginBottom: "14px" }}>
            <span style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--accent)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}>
              Recommendations
            </span>
            <span style={{ width: "24px", height: "1px", backgroundColor: "var(--accent)", opacity: 0.5 }} />
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "14px",
          }}>
            People I&apos;ve worked with.
          </h2>
          <p style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            fontWeight: 450,
            letterSpacing: "0.01em",
          }}>
            From LinkedIn — colleagues and managers at Winvesta.
          </p>
        </motion.div>

        {/* 2-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
          className="testimonials-grid"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonials-wrapper { padding: 0 20px !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

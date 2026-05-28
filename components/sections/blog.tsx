"use client";

import { motion } from "motion/react";
import { useState } from "react";

const SPRING = { type: "spring", stiffness: 80, damping: 22 } as const;

/* ── Blog post data ──────────────────────────────────── */
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  readTime: number;
  date: string;
  image: string;
  tag: string;
  draft?: boolean;
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "building-automation-winvesta",
    title: "Building a 3-Part Automation System at a Fintech Startup",
    excerpt:
      "How I designed and shipped an n8n → Django → React withdrawal compliance pipeline that made processing 85% faster — without breaking prod.",
    readTime: 8,
    date: "May 12, 2025",
    image: "https://picsum.photos/seed/fintech-automation/800/450",
    tag: "Engineering",
    draft: true,
  },
  {
    id: 2,
    slug: "from-idea-to-users-momentum",
    title: "From Idea to Users: How I Built Momentum Health Club Solo",
    excerpt:
      "No co-founder, no funding. Just a Next.js repo and a fitness community that needed a real platform. What I learned building and growing it from zero.",
    readTime: 6,
    date: "Apr 3, 2025",
    image: "https://picsum.photos/seed/momentum-fitness/800/450",
    tag: "Founder",
    draft: true,
  },
  {
    id: 3,
    slug: "nextjs-cms-migration",
    title: "Migrating HubSpot CMS to Sanity + Next.js: Lessons from the Trenches",
    excerpt:
      "We cut CMS costs by 80% and rebuilt the entire content pipeline in Next.js. Here's the migration strategy, the gotchas, and what I'd do differently.",
    readTime: 10,
    date: "Mar 18, 2025",
    image: "https://picsum.photos/seed/cms-migration/800/450",
    tag: "Full-Stack",
    draft: true,
  },
];

/* ── Blog card ───────────────────────────────────────── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "var(--bg)",
        border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border)"}`,
        transition: "border-color 0.28s cubic-bezier(0.32,0.72,0,1), transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s cubic-bezier(0.32,0.72,0,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px -12px color-mix(in srgb, var(--text-primary) 18%, transparent)"
          : "0 4px 12px -4px color-mix(in srgb, var(--text-primary) 8%, transparent)",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/9", flexShrink: 0 }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s cubic-bezier(0.32,0.72,0,1)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {/* Gradient overlay bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, color-mix(in srgb, var(--bg) 70%, transparent) 100%)",
          pointerEvents: "none",
        }} />
        {/* Draft badge */}
        {post.draft && (
          <span style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            padding: "3px 9px",
            borderRadius: "9999px",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            backgroundColor: "rgba(0,0,0,0.48)",
            color: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(6px)",
          }}>
            Coming soon
          </span>
        )}
        {/* Tag badge */}
        <span style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          padding: "3px 9px",
          borderRadius: "9999px",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          backgroundColor: "rgba(59,74,107,0.75)",
          color: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(59,74,107,0.5)",
          backdropFilter: "blur(6px)",
        }}>
          {post.tag}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "22px 22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Meta */}
        <p style={{
          fontSize: "11px",
          color: "var(--text-muted)",
          fontWeight: 500,
          letterSpacing: "0.04em",
          marginBottom: "12px",
          textTransform: "uppercase",
        }}>
          {post.readTime} min read · {post.date}
        </p>

        {/* Title */}
        <h3 style={{
          fontSize: "16px",
          fontWeight: 700,
          color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
          letterSpacing: "-0.025em",
          lineHeight: 1.35,
          marginBottom: "10px",
          transition: "color 0.22s cubic-bezier(0.32,0.72,0,1)",
          flex: 0,
        }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{
          fontSize: "13.5px",
          color: "var(--text-muted)",
          lineHeight: 1.65,
          fontWeight: 450,
          flex: 1,
          marginBottom: "20px",
        }}>
          {post.excerpt}
        </p>

        {/* Read link */}
        <div style={{ marginTop: "auto" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 600,
            color: hovered ? "var(--text-primary)" : "var(--text-muted)",
            letterSpacing: "0.01em",
            transition: "color 0.22s cubic-bezier(0.32,0.72,0,1)",
          }}>
            Read blog post
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "26px",
              height: "26px",
              borderRadius: "9999px",
              backgroundColor: hovered
                ? "color-mix(in srgb, var(--accent) 12%, transparent)"
                : "var(--border-strong)",
              transition: "background-color 0.22s ease, transform 0.22s cubic-bezier(0.34,1.56,0.64,1)",
              transform: hovered ? "translateX(2px)" : "translateX(0)",
            }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ─────────────────────────────────────────── */
export function Blog() {
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
        className="blog-wrapper"
      >
        {/* Header — mixed font */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ ...SPRING }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--text-primary)",
          }}>
            <span style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 700 }}>
              Thoughts &amp;{" "}
            </span>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--text-secondary)",
            }}>
              writings
            </span>
          </h2>
          <p style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            marginTop: "14px",
            fontWeight: 450,
            letterSpacing: "0.01em",
          }}>
            Long-form posts on engineering, product, and building things.
          </p>
        </motion.div>

        {/* 3-col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "56px",
          }}
          className="blog-grid"
        >
          {POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Read more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING, delay: 0.3 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <a
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              padding: "11px 11px 11px 22px",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-strong)",
              borderRadius: "9999px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "background-color 0.25s cubic-bezier(0.32,0.72,0,1), border-color 0.25s ease, color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "color-mix(in srgb, var(--accent) 8%, var(--bg-card))";
              el.style.borderColor = "color-mix(in srgb, var(--accent) 40%, transparent)";
              el.style.color = "var(--text-primary)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "var(--bg-card)";
              el.style.borderColor = "var(--border-strong)";
              el.style.color = "var(--text-secondary)";
              el.style.transform = "translateY(0)";
            }}
          >
            Read more posts
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              marginLeft: "10px",
              borderRadius: "9999px",
              backgroundColor: "var(--border-strong)",
              flexShrink: 0,
            }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .blog-wrapper { padding: 0 20px !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

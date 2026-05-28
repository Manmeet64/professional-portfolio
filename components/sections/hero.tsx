"use client";

import { motion } from "motion/react";

const FADE_UP = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

const SPRING = { type: "spring", stiffness: 100, damping: 20 } as const;

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#0e0e10", // fallback while video loads
      }}
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/hero-coding.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay stack ── */}

      {/* Layer 1: primary dark veil — keeps text legible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundColor: "rgba(10, 10, 12, 0.62)",
        }}
      />

      {/* Layer 2: radial vignette — darkens edges, brightens center slightly */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 15%, rgba(6,6,8,0.55) 100%)",
        }}
      />

      {/* Layer 3: top + bottom hard fades — nav area and scroll indicator stay clean */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.75) 0%, transparent 18%, transparent 72%, rgba(10,10,12,0.85) 100%)",
        }}
      />

      {/* ── Hero content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          maxWidth: "740px",
          padding: "0 24px",
          pointerEvents: "none",
        }}
      >
        {/* Eyebrow pill */}
        <motion.div
          {...FADE_UP}
          transition={{ ...SPRING, delay: 0.05 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "24px",
            padding: "5px 12px 5px 8px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.12)",
            backgroundColor: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Live dot */}
          <span style={{ position: "relative", width: "6px", height: "6px", display: "inline-flex" }}>
            <span style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "#7EB8A4",
              opacity: 0.5,
              animation: "ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
            }} />
            <span style={{
              position: "relative",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#7EB8A4",
            }} />
          </span>
          <span style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}>
            Manmeet Singh
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          {...FADE_UP}
          transition={{ ...SPRING, delay: 0.15 }}
          style={{
            fontSize: "clamp(42px, 6.5vw, 76px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            marginBottom: "28px",
          }}
        >
          I build products that
          <br />
          <span style={{ color: "rgba(255,255,255,0.55)" }}>solve real problems.</span>
        </motion.h1>

        {/* Sub-line */}
        <motion.p
          {...FADE_UP}
          transition={{ ...SPRING, delay: 0.28 }}
          style={{
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth: "500px",
            margin: "0 auto 44px",
          }}
        >
          Software Engineer Intern{" "}
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
            @ Winvesta
          </span>{" "}
          · Full-Stack Developer · Founder,{" "}
          <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
            Momentum Health Club
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...FADE_UP}
          transition={{ ...SPRING, delay: 0.42 }}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "48px",
            pointerEvents: "all",
          }}
        >
          {/* Primary CTA */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              padding: "10px 10px 10px 22px",
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#0e0e10",
              backgroundColor: "#ffffff",
              borderRadius: "9999px",
              transition: "background-color 0.3s cubic-bezier(0.32,0.72,0,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s cubic-bezier(0.32,0.72,0,1)",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "rgba(255,255,255,0.88)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 10px 28px rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "#ffffff";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px) scale(1)";
            }}
          >
            Resume
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              marginLeft: "10px",
              borderRadius: "9999px",
              backgroundColor: "rgba(0,0,0,0.1)",
              fontSize: "13px",
              flexShrink: 0,
            }}>
              ↓
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              padding: "10px 10px 10px 22px",
              fontSize: "13.5px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "9999px",
              transition: "border-color 0.3s cubic-bezier(0.32,0.72,0,1), background-color 0.3s cubic-bezier(0.32,0.72,0,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.3)";
              el.style.backgroundColor = "rgba(255,255,255,0.13)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.14)";
              el.style.backgroundColor = "rgba(255,255,255,0.08)";
              el.style.transform = "translateY(0)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px) scale(1)";
            }}
          >
            Let&apos;s Talk
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              marginLeft: "10px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255,255,255,0.1)",
              fontSize: "13px",
              flexShrink: 0,
            }}>
              →
            </span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          {...FADE_UP}
          transition={{ ...SPRING, delay: 0.56 }}
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "all",
          }}
        >
          {[
            { label: "GitHub",    href: "https://github.com/Manmeet64" },
            { label: "LinkedIn",  href: "https://www.linkedin.com/in/manmeet-singh-5a8548211/" },
            { label: "Email",     href: "mailto:manmeetsingh642005@gmail.com" },
            { label: "Instagram", href: "https://www.instagram.com/_manmeet.s_/" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                fontSize: "11.5px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.04em",
                transition: "color 0.25s cubic-bezier(0.32,0.72,0,1)",
                borderBottom: "1px solid transparent",
                paddingBottom: "1px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "rgba(255,255,255,0.85)";
                el.style.borderBottomColor = "rgba(255,255,255,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "rgba(255,255,255,0.35)";
                el.style.borderBottomColor = "transparent";
              }}
            >
              {social.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontSize: "9px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          fontWeight: 600,
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
          style={{
            width: "1px",
            height: "28px",
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        />
      </motion.div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

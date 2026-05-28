"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const Grainient = dynamic(() => import("@/components/ui/grainient"), { ssr: false });

const SPRING = { type: "spring", stiffness: 80, damping: 22 } as const;

/* ── Timezone widget ──────────────────────────────────── */
function TimezoneWidget() {
  const [times, setTimes] = useState({ ist: "", visitor: "", visitorTZ: "" });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit", minute: "2-digit", hour12: true,
      });
      const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const visitor = now.toLocaleTimeString("en-US", {
        timeZone: visitorTZ,
        hour: "2-digit", minute: "2-digit", hour12: true,
      });
      const shortTZ = visitorTZ.split("/").pop()?.replace(/_/g, " ") ?? visitorTZ;
      setTimes({ ist, visitor, visitorTZ: shortTZ });
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...SPRING, delay: 0.55 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        padding: "9px 16px",
        borderRadius: "9999px",
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Pulsing availability dot */}
      <span style={{ position: "relative", width: "7px", height: "7px", display: "inline-flex", flexShrink: 0 }}>
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          backgroundColor: "#4ade80", opacity: 0.4,
          animation: "ping-contact 2s cubic-bezier(0,0,0.2,1) infinite",
        }} />
        <span style={{ position: "relative", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
      </span>
      <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
        {times.ist} IST
      </span>
      <span style={{ width: "1px", height: "12px", backgroundColor: "rgba(255,255,255,0.12)" }} />
      <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.35)", fontWeight: 450 }}>
        {times.visitor} {times.visitorTZ}
      </span>
    </motion.div>
  );
}

/* ── Squiggly SVG underline ───────────────────────────── */
function SquigglyUnderline({ width = 220 }: { width?: number }) {
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (ref.current) setLength(ref.current.getTotalLength());
  }, []);

  return (
    <motion.svg
      width={width} height={12}
      viewBox={`0 0 ${width} 12`}
      fill="none"
      style={{ display: "block", overflow: "visible" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.path
        ref={ref}
        d={`M 4,8 C 14,2 24,14 34,8 C 44,2 54,14 64,8 C 74,2 84,14 94,8 C 104,2 114,14 124,8 C 134,2 144,14 154,8 C 164,2 174,14 184,8 C 194,2 204,14 ${width - 4},8`}
        stroke="var(--accent-contact)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={length > 0 ? { pathLength: 0, opacity: 0 } : { opacity: 0 }}
        whileInView={length > 0 ? { pathLength: 1, opacity: 1 } : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      />
    </motion.svg>
  );
}

/* ── Corner doodle (loose spiral) ────────────────────── */
function CornerDoodle() {
  return (
    <svg
      width="180" height="180"
      viewBox="0 0 180 180"
      fill="none"
      style={{ position: "absolute", top: "24px", right: "24px", opacity: 0.07, pointerEvents: "none" }}
      aria-hidden
    >
      <path
        d="M 160,20 C 140,-10 80,10 60,50 C 40,90 60,130 100,140 C 140,150 170,120 165,85 C 160,50 130,35 100,45 C 70,55 60,80 70,100 C 80,120 105,120 115,105 C 125,90 115,75 100,78"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Contact form ─────────────────────────────────────── */
function ContactForm() {
  const [fields, setFields] = useState({ name: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus("sent");
        setFields({ name: "", message: "" });
      } else {
        setStatus("idle");
        alert("Something went wrong. Try emailing me directly at manmeetsingh642005@gmail.com");
      }
    } catch {
      setStatus("idle");
      alert("Something went wrong. Try emailing me directly at manmeetsingh642005@gmail.com");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...SPRING, delay: 0.3 }}
      style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}
    >
      {/* Name */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Your name"
          value={fields.name}
          onChange={e => setFields(f => ({ ...f, name: e.target.value }))}
          required
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.88)",
            fontSize: "14px",
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 450,
            outline: "none",
            transition: "border-color 0.22s ease, background-color 0.22s ease",
            caretColor: "var(--accent-contact)",
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = "rgba(245,241,235,0.3)";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
          }}
        />
      </div>

      {/* Message */}
      <div style={{ position: "relative" }}>
        <textarea
          placeholder="What are you working on? Or just say hi."
          value={fields.message}
          onChange={e => setFields(f => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.88)",
            fontSize: "14px",
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 450,
            outline: "none",
            resize: "vertical",
            minHeight: "120px",
            transition: "border-color 0.22s ease, background-color 0.22s ease",
            caretColor: "var(--accent-contact)",
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = "rgba(245,241,235,0.3)";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
          }}
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status !== "idle"}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "13px 24px",
          borderRadius: "9999px",
          border: "none",
          backgroundColor: status === "sent" ? "#22c55e" : "var(--accent-contact)",
          color: status === "sent" ? "#fff" : "#1A1C24",
          fontSize: "14px",
          fontFamily: "Satoshi, sans-serif",
          fontWeight: 700,
          letterSpacing: "0.01em",
          cursor: status !== "idle" ? "default" : "pointer",
          transition: "background-color 0.3s cubic-bezier(0.32,0.72,0,1), transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          alignSelf: "flex-start",
        }}
        onMouseEnter={e => {
          if (status === "idle") {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
          }
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        {status === "idle" && (
          <>
            Send message
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "24px", height: "24px", borderRadius: "9999px",
              backgroundColor: "rgba(0,0,0,0.12)", flexShrink: 0,
            }}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" />
              </svg>
            </span>
          </>
        )}
        {status === "sending" && "Sending..."}
        {status === "sent" && "Sent — I'll be in touch"}
      </motion.button>
    </motion.form>
  );
}

/* ── Section ──────────────────────────────────────────── */
export function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        backgroundColor: "#0D0E13",
        padding: "140px 0 100px",
        overflow: "hidden",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Grainient — deep indigo/charcoal atmosphere */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          opacity: 0.55,
        }}
      >
        <Grainient
          color1="#2A3550"
          color2="#0D0E13"
          color3="#1C2440"
          timeSpeed={0.05}
          warpStrength={0.35}
          warpFrequency={2.5}
          warpSpeed={0.6}
          warpAmplitude={80}
          rotationAmount={180}
          noiseScale={1.1}
          grainAmount={0.06}
          grainScale={2.2}
          contrast={1.08}
          saturation={0.6}
          zoom={1.1}
          blendSoftness={0.2}
        />
      </div>

      {/* Edge vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, rgba(13,14,19,0.7) 100%)",
      }} />

      {/* Content */}
      <div
        style={{ position: "relative", zIndex: 2, maxWidth: "1100px", margin: "0 auto", padding: "0 40px", width: "100%" }}
        className="contact-wrapper"
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "80px", alignItems: "start" }}
          className="contact-grid"
        >
          {/* ── LEFT: headline + copy ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.05 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "28px" }}
            >
              <span style={{
                fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "var(--accent-contact)",
              }}>
                Available for work
              </span>
              <span style={{ width: "24px", height: "1px", backgroundColor: "var(--accent-contact)", opacity: 0.5 }} />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.12 }}
              style={{
                fontSize: "clamp(34px, 5vw, 58px)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.92)",
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                marginBottom: "8px",
              }}
            >
              Let&apos;s build
              <br />
              something{" "}
              <span style={{ position: "relative", display: "inline-block" }}>
                real.
                <span style={{ position: "absolute", left: 0, bottom: "-10px", width: "100%" }}>
                  <SquigglyUnderline width={100} />
                </span>
              </span>
            </motion.h2>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.22 }}
              style={{
                fontSize: "15.5px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.75,
                fontWeight: 450,
                maxWidth: "440px",
                marginTop: "36px",
                marginBottom: "20px",
              }}
            >
              Open to full-time roles, freelance, and interesting collaborations.
              I work best on products that genuinely matter — fintech, health, developer tools.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.3 }}
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.25)",
                fontWeight: 450,
                fontStyle: "italic",
                marginBottom: "40px",
              }}
            >
              No agencies. No recruiters. No deck-required pitches.
            </motion.p>

            {/* Timezone */}
            <TimezoneWidget />

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.65 }}
              style={{ display: "flex", gap: "20px", marginTop: "32px", flexWrap: "wrap" }}
            >
              {[
                { label: "GitHub",    href: "https://github.com/Manmeet64" },
                { label: "LinkedIn",  href: "https://www.linkedin.com/in/manmeetsingh64/" },
                { label: "Email",     href: "mailto:manmeetsingh642005@gmail.com" },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    borderBottom: "1px solid transparent",
                    paddingBottom: "2px",
                    transition: "color 0.22s ease, border-color 0.22s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent-contact)";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "var(--accent-contact)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: form ── */}
          <div style={{ position: "relative" }}>
            <CornerDoodle />

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...SPRING, delay: 0.2 }}
              style={{
                padding: "36px 32px",
                borderRadius: "20px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Inner top accent line */}
              <div style={{
                position: "absolute", top: 0, left: "20%", right: "20%", height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(245,241,235,0.15), transparent)",
              }} />

              <h3 style={{
                fontSize: "16px", fontWeight: 700,
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "-0.02em", marginBottom: "6px",
              }}>
                Send a message
              </h3>
              <p style={{
                fontSize: "12.5px", color: "rgba(255,255,255,0.3)",
                fontWeight: 450, marginBottom: "24px",
              }}>
                I read every message and reply to most.
              </p>

              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer micro-line */}
      <div style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        zIndex: 2, textAlign: "center",
      }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.18)", fontWeight: 450, letterSpacing: "0.04em" }}>
          Manmeet Singh · {new Date().getFullYear()} · Built with Next.js
        </p>
      </div>

      <style>{`
        :root { --accent-contact: #F5F1EB; }
        .dark { --accent-contact: #F5F1EB; }
        @keyframes ping-contact {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 768px) {
          .contact-wrapper { padding: 0 20px !important; }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Work",       href: "#projects"     },
  { label: "Experience", href: "#experience"   },
  { label: "Skills",     href: "#skills"       },
  { label: "Blog",       href: "#testimonials" },
  { label: "Contact",    href: "#contact"      },
];

const SPRING_NAV = { type: "spring", stiffness: 500, damping: 38 } as const;

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted]             = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredLink, setHoveredLink]     = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [scrolled, setScrolled]           = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── Floating pill nav ── */}
      <header
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "2px",
          /* Transparent at top, dark pill once scrolled */
          backgroundColor: scrolled
            ? "rgba(18, 18, 20, 0.88)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderRadius: "9999px",
          padding: "5px 5px 5px 16px",
          boxShadow: scrolled
            ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.28), 0 1px 0 rgba(0,0,0,0.15)"
            : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          whiteSpace: "nowrap",
          transition: "background-color 0.4s cubic-bezier(0.32,0.72,0,1), box-shadow 0.4s cubic-bezier(0.32,0.72,0,1), border-color 0.4s cubic-bezier(0.32,0.72,0,1), backdrop-filter 0.4s cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
          style={{
            fontWeight: 700,
            fontSize: "13.5px",
            color: "#fff",
            letterSpacing: "-0.02em",
            paddingRight: "12px",
            flexShrink: 0,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          MS
        </a>

        {/* Hairline divider */}
        <div style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.1)", marginRight: "4px", flexShrink: 0 }} />

        {/* Desktop nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0" }} className="hidden-mobile">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "6px 13px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: isActive ? "#fff" : scrolled ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.7)",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 1,
                    letterSpacing: "0.01em",
                    transition: "color 0.2s cubic-bezier(0.32,0.72,0,1)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-badge"
                      transition={SPRING_NAV}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "14px",
                        height: "14px",
                        borderRadius: "3px",
                        backgroundColor: "rgba(255,255,255,0.14)",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.6)",
                        letterSpacing: 0,
                        flexShrink: 0,
                      }}
                    >
                      /
                    </motion.span>
                  )}
                </a>
                <AnimatePresence>
                  {hoveredLink === link.label && (
                    <motion.div
                      layoutId="nav-hover-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={SPRING_NAV}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(255,255,255,0.07)",
                        borderRadius: "9999px",
                        zIndex: 0,
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "4px" }}>
          <div className="hidden-mobile" style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.1)", marginRight: "2px", flexShrink: 0 }} />

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              style={{
                width: "34px", height: "34px", borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.07)",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", color: "rgba(255,255,255,0.7)",
                fontSize: "13px",
                transition: "background-color 0.2s cubic-bezier(0.32,0.72,0,1), transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.13)";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              {theme === "dark" ? "☀" : "◐"}
            </button>
          )}

          <button
            className="show-mobile"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{
              width: "34px", height: "34px", borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.07)",
              cursor: "pointer", display: "none", alignItems: "center",
              justifyContent: "center", position: "relative", flexShrink: 0,
            }}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 0, width: "14px" } : { rotate: 0, y: -4, width: "14px" }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              style={{ position: "absolute", height: "1.5px", backgroundColor: "rgba(255,255,255,0.85)", borderRadius: "1px", transformOrigin: "center" }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: 0, width: "14px" } : { rotate: 0, y: 4, width: "14px" }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              style={{ position: "absolute", height: "1.5px", backgroundColor: "rgba(255,255,255,0.85)", borderRadius: "1px", transformOrigin: "center" }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 49,
              backgroundColor: "rgba(0,0,0,0.82)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "4px", padding: "80px 24px 40px",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.05, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontSize: "clamp(28px, 8vw, 42px)", fontWeight: 700,
                  color: activeSection === link.href.replace("#", "") ? "#fff" : "rgba(255,255,255,0.35)",
                  letterSpacing: "-0.03em", cursor: "pointer", padding: "8px 0",
                  transition: "color 0.2s", display: "block", textAlign: "center",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    activeSection === link.href.replace("#", "") ? "#fff" : "rgba(255,255,255,0.35)";
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              style={{ position: "absolute", bottom: "32px", display: "flex", gap: "20px" }}
            >
              {[
                { label: "GitHub",   href: "https://github.com/Manmeet64" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/manmeetsingh64/" },
                { label: "Email",    href: "mailto:manmeetsingh642005@gmail.com" },
              ].map(s => (
                <a key={s.label} href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)"; }}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}

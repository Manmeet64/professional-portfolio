import { Nav } from "@/components/layout/nav";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience + Education" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "achievements", label: "Achievements + Co-curriculars" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials + Blog" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <main>
      <Nav />
      <div style={{ paddingTop: "64px" }}>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "1px solid var(--border)",
              padding: "96px 24px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: "var(--text-muted)",
                letterSpacing: "-0.02em",
              }}
            >
              {section.label}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}

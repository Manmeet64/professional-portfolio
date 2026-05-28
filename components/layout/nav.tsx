export function Nav() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        zIndex: 50,
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          color: "var(--accent)",
          fontSize: "18px",
          letterSpacing: "-0.02em",
        }}
      >
        MS
      </span>
      <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
        Nav placeholder
      </span>
    </header>
  );
}

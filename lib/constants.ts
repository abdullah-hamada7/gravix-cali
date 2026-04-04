export const colors = {
  lime: "#bfff00",
  limeBright: "#d4ff4d",
  limeMuted: "#99cc00",
  emerald: "#00a86b",
  emeraldLight: "#00cc88",
  emeraldDark: "#007a4d",
  forest: "#0a1f0a",
  forestDeep: "#050f05",
  neutralLight: "#f0f2f0",
  neutralMid: "#c8ccc8",
} as const;

export const typography = {
  heading: {
    fontWeight: "800",
    letterSpacing: "-0.02em",
    textTransform: "uppercase" as const,
  },
  body: {
    fontWeight: "400",
    lineHeight: "1.6",
  },
  cta: {
    fontWeight: "700",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  },
  label: {
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    fontSize: "0.75rem",
  },
} as const;

export const spacing = {
  section: "clamp(3rem, 8vw, 6rem)",
  container: "clamp(1rem, 4vw, 2rem)",
  gap: "clamp(1rem, 3vw, 2rem)",
  cardGap: "1.5rem",
} as const;

export const borders = {
  sharp: "0",
  borderWidth: "2px",
  borderWidthThin: "1px",
} as const;

export const transitions = {
  fast: "150ms ease",
  base: "250ms ease",
} as const;

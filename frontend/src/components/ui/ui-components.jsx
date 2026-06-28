// ─────────────────────────────────────────────
//  ui-components.jsx
//  Shared design primitives for RoboLearn
//  Theme: dark navy (#061B33 / #0b2545) + cyan (#22d3ee) + white
//  Components: Card · Badge · Loader · Divider · SectionTag · StatCard
// ─────────────────────────────────────────────

// ── Card ──────────────────────────────────────
/**
 * Props:
 *   children   — content
 *   dark       — true = dark navy gradient bg (for navy sections like "Why Choose Us")
 *                false/omit = white bg (for light/white sections)
 *   hover      — true = lift + border highlight on hover
 *   glow       — true = cyan glow shadow on hover
 *   className  — extra Tailwind classes
 *   style      — inline style overrides
 */
export const Card = ({
  children,
  className = "",
  dark = false,
  hover = false,
  glow = false,
  style = {},
}) => (
  <div
    className={`
      rounded-2xl border transition-all duration-300
      ${dark
        ? "border-white/10"
        : "border-slate-200 bg-white shadow-sm"
      }
      ${hover ? "hover:-translate-y-1 cursor-pointer" : ""}
      ${hover && dark ? "hover:border-cyan-400/40" : ""}
      ${hover && !dark ? "hover:border-cyan-400/50 hover:shadow-md" : ""}
      ${glow ? "hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]" : ""}
      ${className}
    `}
    style={
      dark
        ? {
            background: "linear-gradient(135deg, #0b2545 0%, #061B33 100%)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
            ...style,
          }
        : style
    }
  >
    {children}
  </div>
);

// ── Badge ──────────────────────────────────────
/**
 * Variants: cyan · cyanDark · blue · green · red · yellow · gray
 *
 *   cyan     — for use on white/light backgrounds
 *   cyanDark — for use on dark navy backgrounds
 *   blue     — subtle electric blue
 *   green    — success
 *   red      — danger / alert
 *   yellow   — warning
 *   gray     — muted / inactive
 */
const badgeStyles = {
  cyan: {
    background: "rgba(6,182,212,0.12)",
    color: "#0891b2",
    border: "1px solid rgba(6,182,212,0.35)",
  },
  cyanDark: {
    background: "rgba(34,211,238,0.12)",
    color: "#22d3ee",
    border: "1px solid rgba(34,211,238,0.3)",
  },
  blue: {
    background: "rgba(37,99,235,0.12)",
    color: "#60a5fa",
    border: "1px solid rgba(37,99,235,0.3)",
  },
  green: {
    background: "rgba(16,185,129,0.12)",
    color: "#059669",
    border: "1px solid rgba(16,185,129,0.3)",
  },
  red: {
    background: "rgba(239,68,68,0.12)",
    color: "#dc2626",
    border: "1px solid rgba(239,68,68,0.3)",
  },
  yellow: {
    background: "rgba(245,158,11,0.12)",
    color: "#d97706",
    border: "1px solid rgba(245,158,11,0.3)",
  },
  gray: {
    background: "rgba(100,116,139,0.10)",
    color: "#64748b",
    border: "1px solid rgba(100,116,139,0.2)",
  },
};

export const Badge = ({ children, variant = "cyan", className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${className}`}
    style={badgeStyles[variant] || badgeStyles.cyan}
  >
    {children}
  </span>
);

// ── Loader ─────────────────────────────────────
/**
 * Props:
 *   size  — "sm" | "md" (default) | "lg"
 *   dark  — true = white spinner + white text (for dark navy sections)
 *           false/omit = cyan spinner + slate text (for white sections)
 *   text  — loading label, pass "" to hide
 */
export const Loader = ({ size = "md", dark = false, text = "Loading..." }) => {
  const sizes = { sm: "h-5 w-5", md: "h-9 w-9", lg: "h-14 w-14" };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className={`${sizes[size]} rounded-full animate-spin`}
        style={{
          border: dark
            ? "2px solid rgba(255,255,255,0.15)"
            : "2px solid rgba(6,182,212,0.18)",
          borderTopColor: dark ? "#ffffff" : "#22d3ee",
        }}
      />
      {text && (
        <p
          className="text-sm"
          style={{ color: dark ? "rgba(255,255,255,0.5)" : "#64748b" }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

// ── Divider ────────────────────────────────────
/**
 * Props:
 *   label — optional centered text label
 *   dark  — true = white/10 line (for navy sections)
 *           false/omit = slate-200 line (for white sections)
 */
export const Divider = ({ label, dark = false, className = "" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div
      className="flex-1 h-px"
      style={{ background: dark ? "rgba(255,255,255,0.10)" : "#e2e8f0" }}
    />
    {label && (
      <span
        className="text-xs px-2 font-medium"
        style={{ color: dark ? "rgba(255,255,255,0.35)" : "#94a3b8" }}
      >
        {label}
      </span>
    )}
    <div
      className="flex-1 h-px"
      style={{ background: dark ? "rgba(255,255,255,0.10)" : "#e2e8f0" }}
    />
  </div>
);

// ── SectionTag ─────────────────────────────────
/**
 * The small eyebrow pill shown above section headings.
 *
 * Props:
 *   icon  — optional React node (Lucide icon etc.)
 *   dark  — true = light cyan text on navy (for dark sections)
 *           false/omit = dark cyan text on white (for light sections)
 */
export const SectionTag = ({ children, icon, dark = false }) => (
  <div
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
    style={
      dark
        ? {
            background: "rgba(34,211,238,0.10)",
            border: "1px solid rgba(34,211,238,0.25)",
            color: "#22d3ee",
          }
        : {
            background: "rgba(6,182,212,0.08)",
            border: "1px solid rgba(6,182,212,0.22)",
            color: "#0891b2",
          }
    }
  >
    {icon && <span className="flex-shrink-0">{icon}</span>}
    {children}
  </div>
);

// ── StatCard ───────────────────────────────────
/**
 * Numbered stat highlight card.
 *
 * Props:
 *   value  — display value, e.g. "50+"
 *   label  — description below value
 *   icon   — optional emoji or React node
 *   color  — "cyan" (default) | "blue" | "green" | "yellow"
 *   dark   — true = navy bg card (for dark sections)
 *            false/omit = white bg card (for light sections)
 */
const statColors = {
  cyan:   { val: "#22d3ee", glow: "rgba(34,211,238,0.18)" },
  blue:   { val: "#60a5fa", glow: "rgba(37,99,235,0.18)"  },
  green:  { val: "#34d399", glow: "rgba(16,185,129,0.18)" },
  yellow: { val: "#fbbf24", glow: "rgba(245,158,11,0.18)" },
};

export const StatCard = ({
  value,
  label,
  icon,
  color = "cyan",
  dark = false,
}) => {
  const c = statColors[color] || statColors.cyan;
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300"
      style={
        dark
          ? {
              background: "linear-gradient(135deg, #0b2545 0%, #061B33 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: `0 0 28px ${c.glow}`,
            }
          : {
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: `0 2px 16px rgba(0,0,0,0.06), 0 0 20px ${c.glow}`,
            }
      }
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <div
        className="text-4xl font-bold mb-1 tabular-nums"
        style={{ color: c.val }}
      >
        {value}
      </div>
      <div
        className="text-sm font-medium"
        style={{ color: dark ? "rgba(255,255,255,0.55)" : "#64748b" }}
      >
        {label}
      </div>
    </div>
  );
};
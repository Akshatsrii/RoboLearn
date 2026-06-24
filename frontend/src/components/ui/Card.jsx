// ── Card ──
export const Card = ({ children, className = "", hover = false, glow = false, style = {} }) => (
  <div
    className={`
      rounded-[16px] border border-white/10 transition-all duration-300
      ${hover ? "hover:-translate-y-1 hover:border-[#2563eb]/30 cursor-pointer" : ""}
      ${glow ? "hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]" : ""}
      ${className}
    `}
    style={{
      background: "linear-gradient(135deg, #111827 0%, #1a2340 100%)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      ...style,
    }}
  >
    {children}
  </div>
);

// ── Badge ──
const badgeVariants = {
  default: { background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "1px solid rgba(37,99,235,0.3)" },
  cyan: { background: "rgba(6,182,212,0.15)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.3)" },
  green: { background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.3)" },
  red: { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" },
  yellow: { background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" },
  gray: { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" },
};

export const Badge = ({ children, variant = "default", className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${className}`}
    style={badgeVariants[variant] || badgeVariants.default}
  >
    {children}
  </span>
);

// ── Loader ──
export const Loader = ({ size = "md", text = "Loading..." }) => {
  const sizes = { sm: "h-6 w-6", md: "h-10 w-10", lg: "h-16 w-16" };
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div
        className={`${sizes[size]} rounded-full border-2 border-[#2563eb]/20 border-t-[#2563eb] animate-spin`}
      />
      {text && <p className="text-white/50 text-sm">{text}</p>}
    </div>
  );
};

// ── Divider ──
export const Divider = ({ label, className = "" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="flex-1 h-px bg-white/10" />
    {label && <span className="text-xs text-white/40 px-2">{label}</span>}
    <div className="flex-1 h-px bg-white/10" />
  </div>
);

// ── SectionTag ──
export const SectionTag = ({ children, icon }) => (
  <div
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
    style={{
      background: "rgba(37,99,235,0.12)",
      border: "1px solid rgba(37,99,235,0.25)",
      color: "#60a5fa",
    }}
  >
    {icon && <span>{icon}</span>}
    {children}
  </div>
);

// ── StatCard ──
export const StatCard = ({ value, label, icon, color = "electric" }) => {
  const colors = {
    electric: { val: "#60a5fa", glow: "rgba(37,99,235,0.2)" },
    cyan: { val: "#22d3ee", glow: "rgba(6,182,212,0.2)" },
    green: { val: "#34d399", glow: "rgba(16,185,129,0.2)" },
    yellow: { val: "#fbbf24", glow: "rgba(245,158,11,0.2)" },
  };
  const c = colors[color] || colors.electric;
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-[16px] border border-white/10"
      style={{ background: "linear-gradient(135deg, #111827, #1a2340)", boxShadow: `0 0 30px ${c.glow}` }}
    >
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <div className="text-4xl font-bold mb-1" style={{ color: c.val }}>{value}</div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  );
};
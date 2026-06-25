// ── Card ──
export const Card = ({ children, className = "", hover = false, glow = false, dark = false, style = {} }) => (
  <div
    className={`
      rounded-2xl border transition-all duration-300
      ${dark ? "border-white/10" : "border-slate-200"}
      ${hover ? "hover:-translate-y-1 hover:border-cyan-400/40 cursor-pointer" : ""}
      ${glow ? "hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]" : "hover:shadow-lg"}
      ${className}
    `}
    style={{
      background: dark
        ? "linear-gradient(135deg, #0b2545 0%, #061B33 100%)"
        : "#ffffff",
      boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.25)" : "0 1px 2px rgba(15,23,42,0.04)",
      ...style,
    }}
  >
    {children}
  </div>
);

// ── Badge ──
const badgeVariants = {
  default: { background: "rgba(11,37,69,0.08)", color: "#0b2545", border: "1px solid rgba(11,37,69,0.15)" },
  cyan: { background: "rgba(6,182,212,0.1)", color: "#0891b2", border: "1px solid rgba(6,182,212,0.25)" },
  green: { background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.25)" },
  red: { background: "rgba(239,68,68,0.1)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.25)" },
  yellow: { background: "rgba(245,158,11,0.1)", color: "#d97706", border: "1px solid rgba(245,158,11,0.25)" },
  gray: { background: "rgba(15,23,42,0.05)", color: "#64748b", border: "1px solid rgba(15,23,42,0.08)" },
  // for use on dark navy backgrounds
  cyanDark: { background: "rgba(34,211,238,0.12)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.3)" },
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
export const Loader = ({ size = "md", text = "Loading...", dark = false }) => {
  const sizes = { sm: "h-6 w-6", md: "h-10 w-10", lg: "h-16 w-16" };
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div
        className={`${sizes[size]} rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin`}
      />
      {text && (
        <p className={`text-sm ${dark ? "text-white/50" : "text-slate-500"}`}>{text}</p>
      )}
    </div>
  );
};

// ── Divider ──
export const Divider = ({ label, dark = false, className = "" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className={`flex-1 h-px ${dark ? "bg-white/10" : "bg-slate-200"}`} />
    {label && (
      <span className={`text-xs px-2 ${dark ? "text-white/40" : "text-slate-400"}`}>{label}</span>
    )}
    <div className={`flex-1 h-px ${dark ? "bg-white/10" : "bg-slate-200"}`} />
  </div>
);

// ── SectionTag ──
export const SectionTag = ({ children, icon, dark = false }) => (
  <div
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
    style={
      dark
        ? { background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)", color: "#22d3ee" }
        : { background: "rgba(8,145,178,0.08)", border: "1px solid rgba(8,145,178,0.2)", color: "#0891b2" }
    }
  >
    {icon && <span className="flex items-center">{icon}</span>}
    {children}
  </div>
);

// ── StatCard ──
export const StatCard = ({ value, label, icon, dark = false }) => (
  <div
    className={`flex flex-col items-center text-center p-6 rounded-2xl border ${
      dark ? "border-white/10" : "border-slate-200"
    }`}
    style={{
      background: dark
        ? "linear-gradient(135deg, #0b2545, #061B33)"
        : "#ffffff",
      boxShadow: dark ? "0 0 30px rgba(34,211,238,0.08)" : "0 1px 2px rgba(15,23,42,0.04)",
    }}
  >
    {icon && (
      <div
        className={`mb-3 ${dark ? "text-cyan-300" : "text-cyan-600"}`}
        style={{ fontSize: "1.75rem" }}
      >
        {icon}
      </div>
    )}
    <div className={`text-3xl md:text-4xl font-bold mb-1 ${dark ? "text-cyan-400" : "text-[#0b2545]"}`}>
      {value}
    </div>
    <div className={`text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>{label}</div>
  </div>
);
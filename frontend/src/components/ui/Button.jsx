import { forwardRef } from "react";

const variants = {
  primary: {
    base: "text-white font-semibold",
    style: {
      background: "linear-gradient(135deg, #2563eb, #06b6d4)",
      boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)",
    },
    hover: "hover:opacity-90 hover:scale-[1.02]",
  },
  secondary: {
    base: "bg-white/10 text-white font-semibold border border-white/20",
    style: {},
    hover: "hover:bg-white/20",
  },
  outline: {
    base: "bg-transparent font-semibold border-2",
    style: { borderColor: "#2563eb", color: "#2563eb" },
    hover: "hover:bg-[#2563eb] hover:text-white",
  },
  ghost: {
    base: "bg-transparent text-white/80 font-medium",
    style: {},
    hover: "hover:text-white hover:bg-white/10",
  },
  danger: {
    base: "bg-red-600 text-white font-semibold",
    style: {},
    hover: "hover:bg-red-700",
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-[6px]",
  md: "px-6 py-3 text-base rounded-[10px]",
  lg: "px-8 py-4 text-lg rounded-[12px]",
  xl: "px-10 py-5 text-xl rounded-[14px]",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    const v = variants[variant] || variants.primary;
    const s = sizes[size] || sizes.md;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={`
          inline-flex items-center justify-center gap-2
          transition-all duration-250 cursor-pointer
          ${v.base} ${v.hover} ${s}
          ${fullWidth ? "w-full" : ""}
          ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        style={v.style}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && <span>{icon}</span>}
        {children}
        {!loading && icon && iconPosition === "right" && <span>{icon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
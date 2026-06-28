import { Loader2 } from "lucide-react";

const variantStyles = {
  primary: "bg-[#0b2545] hover:bg-cyan-600 text-white border border-transparent",
  secondary: "bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-100",
  outline: "bg-transparent hover:border-cyan-400 hover:text-cyan-600 text-slate-700 border border-slate-200",
  ghost: "bg-transparent hover:bg-slate-50 text-slate-600 border border-transparent",
  danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-100",
};

const sizeStyles = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

/**
 * <Button variant="primary" size="md" icon={<ArrowRight size={16} />} loading={false}>
 *   Get Free Consultation
 * </Button>
 */
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "right",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => (
  <button
    disabled={disabled || loading}
    className={`
      inline-flex items-center justify-center gap-2 rounded-xl font-semibold
      transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
      ${variantStyles[variant] || variantStyles.primary}
      ${sizeStyles[size] || sizeStyles.md}
      ${className}
    `}
    {...props}
  >
    {loading ? (
      <Loader2 size={16} className="animate-spin" />
    ) : (
      <>
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </>
    )}
  </button>
);
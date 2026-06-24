import { forwardRef } from "react";

const inputBase = `
  w-full px-4 py-3 rounded-[10px] text-white placeholder-white/40
  border border-white/10 outline-none
  transition-all duration-250
  focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20
`;
const inputBg = { background: "rgba(17, 24, 39, 0.8)" };

// ── Input ──
export const Input = forwardRef(
  ({ label, error, helperText, className = "", icon, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-white/70">
          {label}
          {props.required && <span className="text-[#06b6d4] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`${inputBase} ${icon ? "pl-10" : ""} ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""} ${className}`}
          style={inputBg}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-white/40">{helperText}</p>}
    </div>
  )
);
Input.displayName = "Input";

// ── Textarea ──
export const Textarea = forwardRef(
  ({ label, error, helperText, className = "", rows = 4, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-white/70">
          {label}
          {props.required && <span className="text-[#06b6d4] ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`${inputBase} resize-y min-h-[100px] ${error ? "border-red-500" : ""} ${className}`}
        style={inputBg}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-white/40">{helperText}</p>}
    </div>
  )
);
Textarea.displayName = "Textarea";

// ── Select ──
export const Select = forwardRef(
  ({ label, error, options = [], placeholder = "Select an option", className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-white/70">
          {label}
          {props.required && <span className="text-[#06b6d4] ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={`${inputBase} cursor-pointer ${error ? "border-red-500" : ""} ${className}`}
        style={{ ...inputBg, color: props.value ? "white" : "rgba(255,255,255,0.4)" }}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: "#111827", color: "white" }}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
);
Select.displayName = "Select";

// ── Checkbox ──
export const Checkbox = forwardRef(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          {...props}
        />
        <span
          className={`
            w-5 h-5 rounded-[4px] border-2 flex items-center justify-center flex-shrink-0
            transition-all duration-200
            ${props.checked ? "border-[#2563eb] bg-[#2563eb]" : "border-white/30 bg-white/5"}
            group-hover:border-[#2563eb]
            ${className}
          `}
        >
          {props.checked && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
        {label && <span className="text-sm text-white/80 group-hover:text-white transition-colors">{label}</span>}
      </label>
      {error && <p className="text-xs text-red-400 ml-8">{error}</p>}
    </div>
  )
);
Checkbox.displayName = "Checkbox";
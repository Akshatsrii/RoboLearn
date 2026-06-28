import { useId } from "react";
import { Check } from "lucide-react";

const baseFieldCls =
  "w-full border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors disabled:bg-slate-50 disabled:text-slate-400";

const borderCls = (error) =>
  error
    ? "border-red-300 focus:ring-2 focus:ring-red-400/30 focus:border-red-400"
    : "border-slate-200 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500";

const FieldWrapper = ({ label, error, hint, htmlFor, children }) => (
  <div className="w-full">
    {label && (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
    )}
    {children}
    {error ? (
      <p className="text-xs text-red-500 mt-1.5">{error}</p>
    ) : hint ? (
      <p className="text-xs text-slate-400 mt-1.5">{hint}</p>
    ) : null}
  </div>
);

// ── Input ──
export const Input = ({ label, error, hint, className = "", id, ...props }) => {
  const autoId = useId();
  const fieldId = id || autoId;
  return (
    <FieldWrapper label={label} error={error} hint={hint} htmlFor={fieldId}>
      <input id={fieldId} className={`${baseFieldCls} ${borderCls(error)} ${className}`} {...props} />
    </FieldWrapper>
  );
};

// ── Textarea ──
export const Textarea = ({ label, error, hint, rows = 4, className = "", id, ...props }) => {
  const autoId = useId();
  const fieldId = id || autoId;
  return (
    <FieldWrapper label={label} error={error} hint={hint} htmlFor={fieldId}>
      <textarea
        id={fieldId}
        rows={rows}
        className={`${baseFieldCls} ${borderCls(error)} resize-none ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
};

// ── Select ──
export const Select = ({ label, error, hint, options = [], className = "", id, placeholder, ...props }) => {
  const autoId = useId();
  const fieldId = id || autoId;
  return (
    <FieldWrapper label={label} error={error} hint={hint} htmlFor={fieldId}>
      <select id={fieldId} className={`${baseFieldCls} ${borderCls(error)} ${className}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>{opt}</option>
          ) : (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          )
        )}
      </select>
    </FieldWrapper>
  );
};

// ── Checkbox ──
export const Checkbox = ({ label, checked, onChange, error, className = "", id, ...props }) => {
  const autoId = useId();
  const fieldId = id || autoId;
  return (
    <div className={className}>
      <label htmlFor={fieldId} className="flex items-center gap-2.5 cursor-pointer select-none">
        <span className="relative inline-flex flex-shrink-0">
          <input
            id={fieldId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <span
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
              checked ? "bg-cyan-600 border-cyan-600" : "bg-white border-slate-300 peer-focus:ring-2 peer-focus:ring-cyan-500/30"
            }`}
          >
            {checked && <Check size={13} className="text-white" strokeWidth={3} />}
          </span>
        </span>
        {label && <span className="text-sm text-slate-700">{label}</span>}
      </label>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
};
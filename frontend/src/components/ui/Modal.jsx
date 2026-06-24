import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

// ── Modal ──
export const Modal = ({ isOpen, onClose, title, children, size = "md", className = "" }) => {
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const sizes = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl", full: "max-w-7xl" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`w-full ${sizes[size] || sizes.md} rounded-[20px] border border-white/10 overflow-hidden animate-fade-in-up ${className}`}
        style={{ background: "linear-gradient(135deg, #111827, #1a2340)", boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ── Toast ──
export const Toast = ({ toasts = [], onRemove }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
    {toasts.map((toast) => {
      const styles = {
        success: { border: "rgba(16,185,129,0.4)", icon: "✓", color: "#34d399" },
        error: { border: "rgba(239,68,68,0.4)", icon: "✕", color: "#f87171" },
        info: { border: "rgba(37,99,235,0.4)", icon: "ℹ", color: "#60a5fa" },
        warning: { border: "rgba(245,158,11,0.4)", icon: "⚠", color: "#fbbf24" },
      };
      const s = styles[toast.type] || styles.info;

      return (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-[12px] border animate-fade-in-up min-w-[300px] max-w-[400px]"
          style={{
            background: "linear-gradient(135deg, #111827, #1a2340)",
            borderColor: s.border,
            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${s.border}`,
          }}
        >
          <span className="text-lg flex-shrink-0" style={{ color: s.color }}>{s.icon}</span>
          <p className="text-sm text-white/90 flex-1">{toast.message}</p>
          {onRemove && (
            <button
              onClick={() => onRemove(toast.id)}
              className="text-white/40 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={14} />
            </button>
          )}
        </div>
      );
    })}
  </div>
);

// ── useToast hook ──
import { useState } from "react";

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, removeToast, success: (m) => addToast(m, "success"), error: (m) => addToast(m, "error"), info: (m) => addToast(m, "info"), warning: (m) => addToast(m, "warning") };
};
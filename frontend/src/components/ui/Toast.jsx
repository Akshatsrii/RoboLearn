import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

const toastStyles = {
  success: { icon: CheckCircle2, bg: "bg-emerald-50", border: "border-emerald-200", color: "text-emerald-600" },
  error: { icon: XCircle, bg: "bg-red-50", border: "border-red-200", color: "text-red-600" },
  info: { icon: Info, bg: "bg-cyan-50", border: "border-cyan-200", color: "text-cyan-600" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", color: "text-amber-600" },
};

/**
 * Wrap your app once:
 *   <ToastProvider><App /></ToastProvider>
 *
 * Then anywhere:
 *   const { showToast } = useToast();
 *   showToast({ type: "success", message: "Product saved!" });
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ type = "info", message, duration = 3500 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2.5 w-[90vw] max-w-sm">
        <style>{`
          @keyframes toastIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        `}</style>
        {toasts.map(({ id, type, message }) => {
          const { icon: Icon, bg, border, color } = toastStyles[type] || toastStyles.info;
          return (
            <div
              key={id}
              style={{ animation: "toastIn .25s ease both" }}
              className={`flex items-start gap-3 ${bg} ${border} border rounded-xl px-4 py-3.5 shadow-lg`}
            >
              <Icon size={18} className={`${color} flex-shrink-0 mt-0.5`} />
              <p className="text-sm text-slate-700 flex-1">{message}</p>
              <button onClick={() => dismissToast(id)} className="text-slate-400 hover:text-slate-600 flex-shrink-0">
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
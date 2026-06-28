import { AlertTriangle, Info, CheckCircle2, HelpCircle } from "lucide-react";
import { Button } from "./Button.jsx";

const iconStyles = {
  info: { icon: Info, bg: "bg-cyan-50", color: "text-cyan-600" },
  success: { icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
  warning: { icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-600" },
  danger: { icon: AlertTriangle, bg: "bg-red-50", color: "text-red-600" },
  confirm: { icon: HelpCircle, bg: "bg-cyan-50", color: "text-cyan-600" },
};

/**
 * <Dialog
 *   isOpen={open}
 *   type="danger"
 *   title="Delete this product?"
 *   description="This action cannot be undone."
 *   confirmLabel="Delete"
 *   onConfirm={handleDelete}
 *   onCancel={() => setOpen(false)}
 * />
 */
export const Dialog = ({
  isOpen,
  type = "confirm",
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!isOpen) return null;

  const { icon: Icon, bg, color } = iconStyles[type] || iconStyles.confirm;
  const confirmVariant = type === "danger" ? "danger" : "primary";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#061B33]/50 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center animate-[modalPop_.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`@keyframes modalPop { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>

        <div className={`w-14 h-14 rounded-full ${bg} flex items-center justify-center mx-auto mb-4`}>
          <Icon size={26} className={color} />
        </div>

        <h3 className="text-lg font-bold text-[#0b2545] mb-1.5">{title}</h3>
        {description && <p className="text-sm text-slate-500 leading-relaxed mb-6">{description}</p>}

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={confirmVariant} className="flex-1" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
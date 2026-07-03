import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, User, Mail, Lock, Loader2, CheckCircle2, ShieldCheck, KeyRound, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("user");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", adminCode: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (mode === "admin" && !form.adminCode.trim()) { setError("Admin invite code is required"); return; }
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, mode === "admin" ? form.adminCode : undefined);
      navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
        {/* Left Brand */}
        <div className="hidden lg:flex flex-col justify-center relative bg-[#061B33] p-10 overflow-hidden">
          <div className="relative">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <Zap size={16} className="text-cyan-300" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">Robo<span className="text-cyan-400">Learn</span></span>
            </Link>
            <h2 className="text-3xl font-bold text-white leading-snug">
              {mode === "admin" ? <><span className="text-cyan-400">Admin</span> account setup</> : <>Join <span className="text-cyan-400">50+ schools</span> building with us</>}
            </h2>
            <div className="mt-6 space-y-3">
              {(mode === "user"
                ? ["Save resources & brochures", "Track consultation requests", "Get curriculum updates first"]
                : ["Manage blogs, products & gallery", "View and respond to leads", "Control all site content"]
              ).map((t) => (
                <div key={t} className="flex items-center gap-2.5 text-slate-300 text-sm">
                  {mode === "admin" ? <ShieldCheck size={16} className="text-cyan-400 flex-shrink-0" /> : <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />}
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#0b2545] mb-1">Create an account</h1>
          <p className="text-sm text-slate-500 mb-6">Choose account type to get started.</p>

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 rounded-xl p-1.5 mb-6">
            {[["user", "User Signup", User], ["admin", "Admin Signup", ShieldCheck]].map(([val, label, Icon]) => (
              <button key={val} type="button" onClick={() => { setMode(val); setError(""); }}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${mode === val ? "bg-white text-[#0b2545] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative"><User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input name="name" required placeholder="Full name" value={form.name} onChange={handleChange} className={`${inp} pl-10`} /></div>
            <div className="relative"><Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input name="email" type="email" required placeholder="Email address" value={form.email} onChange={handleChange} className={`${inp} pl-10`} /></div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="password" type={showPass ? "text" : "password"} required placeholder="Password (min. 6 characters)" value={form.password} onChange={handleChange} className={`${inp} pl-10 pr-10`} />
              <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>
            <div className="relative"><Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input name="confirmPassword" type="password" required placeholder="Confirm password" value={form.confirmPassword} onChange={handleChange} className={`${inp} pl-10`} /></div>

            {mode === "admin" && (
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="adminCode" required placeholder="Admin invite code *" value={form.adminCode} onChange={handleChange} className={`${inp} pl-10`} />
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : mode === "admin" ? "Create Admin Account" : "Create Account"}
            </button>
          </form>

          {mode === "admin" && <p className="text-xs text-slate-400 text-center mt-4 leading-relaxed">Admin invite code is provided by your site owner. Without it, registration will fail.</p>}
          <p className="text-sm text-slate-500 text-center mt-6">Already have an account? <Link to="/login" className="text-cyan-600 font-semibold hover:text-cyan-700">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
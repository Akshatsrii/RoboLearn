import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, User, Mail, Lock, Loader2, CheckCircle2, ShieldCheck, KeyRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("user"); // "user" | "admin"
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", adminCode: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (mode === "admin" && !form.adminCode.trim()) {
      setError("An admin invite code is required to create an admin account");
      return;
    }

    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, mode === "admin" ? form.adminCode : undefined);
      navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
      `}</style>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">

        {/* Left — Brand panel */}
        <div className="hidden lg:flex flex-col justify-center relative bg-[#061B33] p-10 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.16]" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice" fill="none">
            <g stroke="#22d3ee" strokeWidth="1.2">
              <path className="circuit-line" d="M0 120 H180 V260 H380" />
              <path className="circuit-line" d="M500 500 H320 V360 H120" />
            </g>
            <g fill="#22d3ee">
              <circle cx="180" cy="120" r="4" /><circle cx="380" cy="260" r="4" />
              <circle cx="320" cy="500" r="4" /><circle cx="120" cy="360" r="4" />
            </g>
          </svg>

          <div className="relative">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <Zap size={16} className="text-cyan-300" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">
                Robo<span className="text-cyan-400">Learn</span>
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white leading-snug">
              Join <span className="text-cyan-400">50+ schools</span> already building with us
            </h2>
            <div className="mt-6 space-y-3">
              {["Save resources & brochures", "Track your consultation requests", "Get curriculum updates first"].map((t) => (
                <div key={t} className="flex items-center gap-2.5 text-slate-300 text-sm">
                  <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#0b2545] mb-1">Create an account</h1>
          <p className="text-sm text-slate-500 mb-6">Choose the type of account you need.</p>

          {/* Mode tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 rounded-xl p-1.5 mb-6">
            <button
              type="button"
              onClick={() => { setMode("user"); setError(""); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                mode === "user" ? "bg-white text-[#0b2545] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User size={15} /> User Signup
            </button>
            <button
              type="button"
              onClick={() => { setMode("admin"); setError(""); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                mode === "admin" ? "bg-white text-[#0b2545] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <ShieldCheck size={15} /> Admin Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="name"
                required
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Password (min. 6 characters)"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
              />
            </div>

            {mode === "admin" && (
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="adminCode"
                  required
                  placeholder="Admin invite code"
                  value={form.adminCode}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : mode === "admin" ? "Create Admin Account" : "Create Account"}
            </button>
          </form>

          {mode === "admin" && (
            <p className="text-xs text-slate-400 text-center mt-4">
              Ask your site administrator for the invite code. Without it, this form will be rejected by the server.
            </p>
          )}

          <p className="text-sm text-slate-500 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 font-semibold hover:text-cyan-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
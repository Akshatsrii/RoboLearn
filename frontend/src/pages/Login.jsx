import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Zap, Mail, Lock, Loader2, User, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";

  const [mode, setMode] = useState("user"); // "user" | "admin"
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    // ===== Temporary Admin Login =====
    if (mode === "admin") {
      if (
        form.email === "admin@robolearn.com" &&
        form.password === "admin123"
      ) {
        const adminUser = {
          id: "1",
          name: "Administrator",
          email: "admin@robolearn.com",
          role: "admin",
        };

        localStorage.setItem("token", "temp-admin-token");
        localStorage.setItem("user", JSON.stringify(adminUser));

        navigate("/admin/dashboard");
        return;
      } else {
        setError("Invalid Admin Email or Password");
        return;
      }
    }

    // ===== Normal User Login =====
    const user = await login(form.email, form.password);

    navigate(user.role === "admin" ? "/admin/dashboard" : redirectTo);

  } catch (err) {
    setError(err.response?.data?.message || "Invalid email or password");
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
              Welcome back to your <span className="text-cyan-400">STEM journey</span>
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Log in to track your school's consultations, save resources, and stay updated on your robotics program.
            </p>
          </div>
        </div>

        {/* Right — Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#0b2545] mb-1">Sign in</h1>
          <p className="text-sm text-slate-500 mb-6">Choose how you'd like to sign in.</p>

          {/* Mode tabs */}
          <div className="grid grid-cols-2 gap-2 bg-slate-100 rounded-xl p-1.5 mb-6">
            <button
              type="button"
              onClick={() => { setMode("user"); setError(""); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                mode === "user" ? "bg-white text-[#0b2545] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <User size={15} /> User Login
            </button>
            <button
              type="button"
              onClick={() => { setMode("admin"); setError(""); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                mode === "admin" ? "bg-white text-[#0b2545] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <ShieldCheck size={15} /> Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : mode === "admin" ? "Sign In as Admin" : "Sign In"}
            </button>
          </form>

          {mode === "user" && (
            <p className="text-sm text-slate-500 text-center mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-600 font-semibold hover:text-cyan-700">
                Create one
              </Link>
            </p>
          )}
          {mode === "admin" && (
            <p className="text-xs text-slate-400 text-center mt-6">
              Admin accounts are created by an existing admin — contact your site administrator if you need access.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
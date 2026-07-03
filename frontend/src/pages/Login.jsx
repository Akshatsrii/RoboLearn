import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Zap,
  Mail,
  Lock,
  Loader2,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/dashboard";

  const [mode, setMode] = useState("user");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(form.email, form.password);

      // Admin tab selected but account is not admin
      if (mode === "admin" && user.role !== "admin") {
        setError("You are not authorized as an administrator.");
        return;
      }

      // Redirect
      if (user.role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate(redirectTo, {
          replace: true,
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }

        .circuit-line {
          stroke-dasharray: 6 6;
          stroke-dashoffset: 240;
          animation: dash 3s linear forwards .3s;
        }
      `}</style>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">

        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-center relative bg-[#061B33] p-10 overflow-hidden">

          <svg
            className="absolute inset-0 w-full h-full opacity-[0.16]"
            viewBox="0 0 500 600"
            fill="none"
          >
            <g stroke="#22d3ee" strokeWidth="1.2">
              <path className="circuit-line" d="M0 120 H180 V260 H380" />
              <path className="circuit-line" d="M500 500 H320 V360 H120" />
            </g>

            <g fill="#22d3ee">
              <circle cx="180" cy="120" r="4" />
              <circle cx="380" cy="260" r="4" />
              <circle cx="320" cy="500" r="4" />
              <circle cx="120" cy="360" r="4" />
            </g>
          </svg>

          <div className="relative">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <Zap
                  size={16}
                  className="text-cyan-300"
                />
              </div>

              <span className="text-xl font-bold text-white">
                Robo
                <span className="text-cyan-400">
                  Learn
                </span>
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white">
              Welcome back to your{" "}
              <span className="text-cyan-400">
                STEM journey
              </span>
            </h2>

            <p className="mt-4 text-slate-300">
              Log in to track your school's consultations,
              save resources and manage your account.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">

          <h1 className="text-2xl font-bold text-[#0b2545]">
            Sign In
          </h1>

          <p className="text-sm text-slate-500 mb-6">
            Choose how you'd like to sign in.
          </p>

          <div className="grid grid-cols-2 gap-2 bg-slate-100 rounded-xl p-1.5 mb-6">

            <button
              type="button"
              onClick={() => {
                setMode("user");
                setError("");
              }}
              className={`py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${
                mode === "user"
                  ? "bg-white shadow text-[#0b2545]"
                  : "text-slate-500"
              }`}
            >
              <User size={15} />
              User Login
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("admin");
                setError("");
              }}
              className={`py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${
                mode === "admin"
                  ? "bg-white shadow text-[#0b2545]"
                  : "text-slate-500"
              }`}
            >
              <ShieldCheck size={15} />
              Admin Login
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-xl pl-10 pr-4 py-3"
              />
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border rounded-xl pl-10 pr-4 py-3"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2545] hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                mode === "admin"
                  ? "Sign In as Admin"
                  : "Sign In"
              )}
            </button>

          </form>

          {mode === "user" && (
            <p className="text-center mt-6 text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-600 font-semibold"
              >
                Create one
              </Link>
            </p>
          )}

          {mode === "admin" && (
            <p className="text-center mt-6 text-xs text-slate-400">
              Use an administrator account created in the database.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Brain, Cpu, GraduationCap } from "lucide-react";

const grades = [
  {
    icon: Brain,
    label: "Grade 3–5",
    title: "Primary Level",
    topics: ["Basic Electronics", "Simple Machines", "Logical Thinking", "Block Coding", "Creative Robotics"],
  },
  {
    icon: Cpu,
    label: "Grade 6–8",
    title: "Middle Level",
    topics: ["Sensors & Motors", "Arduino Basics", "Coding with Python", "STEM Projects", "Robotics Competitions"],
  },
  {
    icon: GraduationCap,
    label: "Grade 9–12",
    title: "Senior Level",
    topics: ["Advanced Robotics", "AI & Machine Learning", "IoT Projects", "PCB Design", "Industry Applications"],
  },
];

const features = [
  "NEP 2020 & CBSE Aligned",
  "Project-Based Learning",
  "Teacher Guides & Lesson Plans",
  "Assessment & Evaluation Modules",
  "Competition Preparation",
  "Hands-On Practical Activities",
];

export default function Curriculum() {
  return (
    <div className="bg-white text-slate-900">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fadeup, .circuit-line { animation: none !important; }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#061B33] py-24 lg:py-28">
        <svg className="absolute inset-0 w-full h-full opacity-[0.16]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 90 H260 V210 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="90" r="4" /><circle cx="520" cy="210" r="4" />
            <circle cx="880" cy="60" r="4" /><circle cx="640" cy="180" r="4" />
          </g>
        </svg>

        <div className="relative max-w-4xl mx-auto px-6 text-center anim-fadeup">
          <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            STEM Curriculum
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Age-wise <span className="text-cyan-400">robotics curriculum</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Structured STEM curriculum for Grade 3 to 12 — aligned with NEP 2020,
            designed to build creativity, innovation, and problem-solving skills.
          </p>
        </div>
      </section>

      {/* ============ GRADE CARDS ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Learning Levels</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">Built for each cognitive stage</h2>
            <p className="mt-4 text-slate-600">Each level is designed for the cognitive abilities of that age group.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {grades.map(({ icon: Icon, label, title, topics }) => (
              <div key={label} className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0b2545] flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon size={22} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="inline-block text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full mt-5">{label}</span>
                <h3 className="text-xl font-bold text-[#0b2545] mt-3 mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {topics.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle size={14} className="text-cyan-500 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-24 bg-[#061B33] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">What's Included</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Everything in one curriculum pack</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all">
                <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
                <span className="text-slate-200 font-medium text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 text-white">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" /><circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>
            <h2 className="relative text-3xl md:text-4xl font-bold">Introduce STEM to your school</h2>
            <p className="relative mt-4 text-cyan-50/90">Get the full curriculum guide and a free demo session for your teachers.</p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors">
              Get Curriculum Guide <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
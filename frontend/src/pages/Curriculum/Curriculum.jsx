import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Brain, Cpu, GraduationCap } from "lucide-react";

const grades = [
  {
    icon: Brain,
    label: "Grade 3–5",
    title: "Primary Level",
    color: "bg-emerald-50 text-emerald-600",
    topics: ["Basic Electronics", "Simple Machines", "Logical Thinking", "Block Coding", "Creative Robotics"],
  },
  {
    icon: Cpu,
    label: "Grade 6–8",
    title: "Middle Level",
    color: "bg-blue-50 text-blue-600",
    topics: ["Sensors & Motors", "Arduino Basics", "Coding with Python", "STEM Projects", "Robotics Competitions"],
  },
  {
    icon: GraduationCap,
    label: "Grade 9–12",
    title: "Senior Level",
    color: "bg-purple-50 text-purple-600",
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
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            STEM Curriculum
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Age-Wise{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Robotics Curriculum
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Structured STEM curriculum for Grade 3 to 12 — aligned with NEP 2020,
            designed to build creativity, innovation and problem-solving skills.
          </p>
        </div>
      </section>

      {/* Grade Cards */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Learning Levels</h2>
            <p className="text-slate-500">Each level is designed for the cognitive abilities of that age group.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {grades.map(({ icon: Icon, label, title, color, topics }) => (
              <div key={label} className="border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-cyan-300 transition">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">{label}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-3 mb-4">{title}</h3>
                <ul className="space-y-2">
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

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">What's Included</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 hover:border-cyan-300 transition">
                <CheckCircle size={18} className="text-cyan-600 flex-shrink-0" />
                <span className="text-slate-700 font-medium text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Introduce STEM to Your School</h2>
            <p className="text-white/80 mb-8">Get the full curriculum guide and a free demo session for your teachers.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-cyan-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold transition">
              Get Curriculum Guide <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
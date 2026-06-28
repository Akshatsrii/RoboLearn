import { useState, useEffect } from "react";
import { FileText, Download, Search, BookOpen, ClipboardList, GraduationCap, Wrench } from "lucide-react";
import { getResources } from "../../services/resourceService";

const categories = ["All", "Brochures", "Curriculum Guides", "Case Studies", "Setup Guides"];

const categoryIcons = {
  Brochures: BookOpen,
  "Curriculum Guides": GraduationCap,
  "Case Studies": ClipboardList,
  "Setup Guides": Wrench,
};

const staticResources = [
  { _id: 1, title: "RoboLearn Company Brochure", category: "Brochures", description: "Overview of all our services, pricing process, and partner schools.", fileUrl: "#", fileSize: "2.4 MB" },
  { _id: 2, title: "STEM Curriculum Guide (Grade 3-12)", category: "Curriculum Guides", description: "Full breakdown of topics, learning outcomes, and NEP 2020 alignment.", fileUrl: "#", fileSize: "3.1 MB" },
  { _id: 3, title: "Robotics Lab Setup Checklist", category: "Setup Guides", description: "Everything a school needs to plan space, budget, and timelines.", fileUrl: "#", fileSize: "1.2 MB" },
  { _id: 4, title: "Case Study Compilation 2025-26", category: "Case Studies", description: "Detailed results from 6 partner schools across Rajasthan.", fileUrl: "#", fileSize: "4.6 MB" },
  { _id: 5, title: "Teacher Training Handbook", category: "Curriculum Guides", description: "Lesson plans, assessment rubrics, and classroom management tips.", fileUrl: "#", fileSize: "2.8 MB" },
  { _id: 6, title: "AMC & Maintenance Guide", category: "Setup Guides", description: "Annual maintenance schedule and troubleshooting reference.", fileUrl: "#", fileSize: "1.5 MB" },
];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getResources()
      .then((res) => setResources(res.data.data || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, []);

  const display = resources.length > 0 ? resources : staticResources;
  const filtered = display.filter((r) => {
    const matchesCategory = active === "All" || r.category === active;
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

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
            Resources
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Guides, brochures &amp; <span className="text-cyan-400">downloads</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to evaluate, plan, and present a robotics
            program to your school management.
          </p>

          <div className="mt-9 max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full bg-white/5 border border-white/15 text-white placeholder:text-slate-400 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-cyan-400/60 focus:bg-white/10 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ============ FILTER + LIST ============ */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  active === c
                    ? "bg-[#0b2545] text-white"
                    : "border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-6 animate-pulse flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 bg-slate-100 rounded" />
                    <div className="h-3 w-3/4 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-500">No resources match your search.</div>
          ) : (
            <div className="space-y-4">
              {filtered.map((r) => {
                const Icon = categoryIcons[r.category] || FileText;
                return (
                  <div
                    key={r._id}
                    className="group flex items-center gap-5 bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0b2545] flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 transition-colors duration-300">
                      <Icon size={20} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                        {r.category}
                      </span>
                      <h3 className="font-semibold text-slate-900 mt-2">{r.title}</h3>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">{r.description}</p>
                    </div>

                    <a
                      href={r.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-2 bg-slate-50 hover:bg-cyan-50 text-slate-700 hover:text-cyan-700 border border-slate-200 hover:border-cyan-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    >
                      <Download size={15} />
                      <span className="hidden sm:inline">{r.fileSize}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
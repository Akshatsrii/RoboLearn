import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Lightbulb, Settings, TrendingUp, School } from "lucide-react";
import { getCaseStudies } from "../../services/caseStudyService";

const staticCaseStudies = [
  {
    _id: 1,
    schoolName: "Sunrise Public School",
    location: "Bhilwara, Rajasthan",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    problem: "No structured robotics lab existed; teachers had no formal training and student interest in STEM was low.",
    solution: "Designed a complete robotics lab for Grades 6-12 with a phased curriculum aligned to CBSE, plus a 2-week teacher certification program.",
    implementation: "Installed 15 workstations with Arduino/ESP32 kits, trained 6 teachers, and launched with a hands-on robotics week for 200+ students.",
    result: "Student enrollment in the STEM elective grew 3x in one semester, and the school won a state-level robotics competition within the first year.",
    metric: "3x STEM enrollment",
  },
  {
    _id: 2,
    schoolName: "Greenfield Academy",
    location: "Udaipur, Rajasthan",
    coverImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
    problem: "Existing computer lab was underused for STEM; management wanted a future-ready program without hiring new full-time staff.",
    solution: "Proposed an AMC-backed model — RoboLearn trainers run weekly sessions while teachers shadow and gradually take over.",
    implementation: "Rolled out a hybrid model across 8 sections, with monthly teacher-training check-ins and a shared lesson-plan library.",
    result: "Within 9 months, 4 of 5 teachers were running sessions independently, cutting per-session vendor costs by 60%.",
    metric: "60% cost reduction",
  },
];

const stages = [
  { key: "problem", label: "Problem", icon: Target },
  { key: "solution", label: "Solution", icon: Lightbulb },
  { key: "implementation", label: "Implementation", icon: Settings },
  { key: "result", label: "Result", icon: TrendingUp },
];

export default function CaseStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getCaseStudies()
      .then((res) => setStudies(res.data.data || []))
      .catch(() => setStudies([]))
      .finally(() => setLoading(false));
  }, []);

  const display = studies.length > 0 ? studies : staticCaseStudies;
  const current = display[active];

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
            Case Studies
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Real schools, <span className="text-cyan-400">real results</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A closer look at how RoboLearn's lab setups and training programs
            changed outcomes for our partner schools.
          </p>
        </div>
      </section>

      {/* ============ SCHOOL SELECTOR ============ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-slate-400">Loading case studies...</div>
          ) : (
            <>
              <div className="flex flex-wrap gap-3 mb-12">
                {display.map((study, i) => (
                  <button
                    key={study._id}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active === i
                        ? "bg-[#0b2545] text-white"
                        : "border border-slate-200 text-slate-600 hover:border-cyan-300 hover:text-cyan-600"
                    }`}
                  >
                    <School size={15} />
                    {study.schoolName}
                  </button>
                ))}
              </div>

              {/* Cover + Metric */}
              <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={current.coverImage}
                    alt={current.schoolName}
                    className="w-full h-72 lg:h-96 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3">
                    <p className="text-2xl font-bold text-cyan-600 leading-none">{current.metric}</p>
                    <p className="text-xs text-slate-500 mt-1">Key outcome</p>
                  </div>
                </div>

                <div>
                  <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">
                    {current.location}
                  </span>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#0b2545]">
                    {current.schoolName}
                  </h2>
                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {current.problem}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-[#0b2545] hover:bg-cyan-600 text-white px-6 py-3 rounded-xl font-semibold mt-7 transition-colors"
                  >
                    Start a Similar Project <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Problem -> Solution -> Implementation -> Result */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stages.map(({ key, label, icon: Icon }, i) => (
                  <div key={key} className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#0b2545] flex items-center justify-center">
                        <Icon size={18} className="text-cyan-300" />
                      </div>
                      <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#0b2545] mb-2">{label}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{current[key]}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 text-white">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" /><circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>
            <h2 className="relative text-3xl md:text-4xl font-bold">Want results like these for your school?</h2>
            <p className="relative mt-4 text-cyan-50/90">Let's discuss a lab and training plan tailored to your goals.</p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors">
              Get Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
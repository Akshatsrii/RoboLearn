import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users, Cpu, GraduationCap, Clock, Lightbulb,
  ChevronRight, ArrowRight, CheckCircle2, BarChart3,
  School, Layers, Award, CalendarDays, RotateCcw
} from "lucide-react";
import SEO from "../components/SEO";

/* ================================================================
   DATA – Programs
   ================================================================ */
const programs = [
  {
    id: "starter",
    name: "Starter Robotics Program",
    badge: "Grades 3–5",
    hoursPerWeek: 1,
    weeksPerYear: 30,
    projectsPerYear: 4,
    teacherSessionsPerYear: 2,
    certifications: ["RoboLearn Foundations Badge"],
    outcomes: ["Block coding basics", "Simple circuit assembly", "Logical sequencing"],
  },
  {
    id: "standard",
    name: "Standard STEM Lab Program",
    badge: "Grades 6–8",
    hoursPerWeek: 2,
    weeksPerYear: 32,
    projectsPerYear: 8,
    teacherSessionsPerYear: 4,
    certifications: ["RoboLearn Explorer Badge", "Arduino Fundamentals"],
    outcomes: ["Arduino C++ programming", "IoT sensor integration", "App Inventor apps"],
  },
  {
    id: "advanced",
    name: "Advanced Innovation Lab",
    badge: "Grades 9–12",
    hoursPerWeek: 3,
    weeksPerYear: 34,
    projectsPerYear: 12,
    teacherSessionsPerYear: 6,
    certifications: ["RoboLearn Innovator Badge", "Python AI Certificate", "PCB Design Badge"],
    outcomes: ["Python + AI/ML basics", "PCB design & soldering", "Competition-ready robots"],
  },
];

const statCards = [
  { icon: Users,         label: "Students Impacted",       key: "studentsImpacted", suffix: "Students",  color: "#06b6d4" },
  { icon: Clock,         label: "Cumulative Learning Hours",key: "learningHours",    suffix: "Hrs",       color: "#8b5cf6" },
  { icon: Cpu,           label: "Projects Built / Year",   key: "projectsPerYear",   suffix: "Projects",  color: "#10b981" },
  { icon: GraduationCap, label: "Certifications Earned",   key: "certs",            suffix: "Certs",     color: "#f59e0b" },
  { icon: Award,         label: "Teacher Training Sessions",key: "teacherSessions",  suffix: "Sessions",  color: "#ef4444" },
  { icon: School,        label: "Recommended Program",     key: "recommendedProg",   suffix: "",          color: "#0ea5e9" },
];

export default function ImpactCalculator() {
  const [selectedProgram, setSelectedProgram] = useState(programs[1]);
  const [students, setStudents]   = useState(120);
  const [years, setYears]         = useState(3);

  const calc = useMemo(() => {
    const p = selectedProgram;
    const studentsImpacted = students * years;
    const learningHours    = students * p.hoursPerWeek * p.weeksPerYear * years;
    const projectsPerYear  = p.projectsPerYear;
    const certs            = studentsImpacted * p.certifications.length;
    const teacherSessions  = p.teacherSessionsPerYear * years;
    const recommendedProg  = p.name;
    return { studentsImpacted, learningHours, projectsPerYear, certs, teacherSessions, recommendedProg };
  }, [selectedProgram, students, years]);

  const fmt = (n) => typeof n === "number" ? n.toLocaleString("en-IN") : n;

  return (
    <>
      <SEO
        title="School STEM Impact Calculator | RoboLearn"
        description="Calculate the real educational impact of a RoboLearn robotics program at your school — students impacted, training hours, projects, and certifications."
      />
      <div className="min-h-screen bg-slate-50 text-slate-900">

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative pt-28 pb-12 px-6 text-center overflow-hidden bg-[#061B33]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <BarChart3 size={15} /> School Impact Calculator
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight text-white">
              Measure Your School's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                Educational Impact
              </span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Select a program and input your student strength to calculate concrete metrics showing learning outcomes, project outputs, and teacher enablement.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">

          {/* ── Program Cards ─────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {programs.map((prog) => (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedProgram.id === prog.id
                    ? "border-cyan-500 bg-cyan-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-cyan-400"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full">
                    {prog.badge}
                  </span>
                  {selectedProgram.id === prog.id && <CheckCircle2 size={18} className="text-cyan-600" />}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{prog.name}</h3>
                <div className="space-y-1">
                  {prog.outcomes.map((o, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                      <ChevronRight size={12} className="text-cyan-600 flex-shrink-0" />
                      {o}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Controls ──────────────────────────────────── */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
                <h2 className="text-lg font-bold text-[#0b2545] mb-5 flex items-center gap-2">
                  <School size={18} className="text-cyan-600" /> Input parameters
                </h2>

                {/* Students */}
                <div className="mb-6">
                  <label className="flex justify-between text-sm text-slate-600 mb-2">
                    <span className="flex items-center gap-1"><Users size={13} /> Students Enrolled</span>
                    <span className="font-bold text-cyan-600">{students}</span>
                  </label>
                  <input type="range" min={10} max={1000} step={10} value={students}
                    onChange={e => setStudents(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer" />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>10</span><span>1000</span></div>
                </div>

                {/* Years */}
                <div className="mb-6">
                  <label className="flex justify-between text-sm text-slate-600 mb-2">
                    <span className="flex items-center gap-1"><CalendarDays size={13} /> Plan Horizon (Years)</span>
                    <span className="font-bold text-cyan-600">{years} Yr</span>
                  </label>
                  <input type="range" min={1} max={5} step={1} value={years}
                    onChange={e => setYears(Number(e.target.value))}
                    className="w-full accent-cyan-600 cursor-pointer" />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>5</span></div>
                </div>

                <button
                  onClick={() => { setStudents(120); setYears(3); setSelectedProgram(programs[1]); }}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <RotateCcw size={13} /> Reset to defaults
                </button>
              </div>

              {/* Recommended Program Card */}
              <div className="bg-cyan-50/50 border border-cyan-100 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-[#0b2545] mb-3">Recommended Program Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class Focus</span>
                    <span className="text-slate-800 font-bold">{selectedProgram.badge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Projects / Year</span>
                    <span className="text-emerald-600 font-bold">{selectedProgram.projectsPerYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hours / Student / Yr</span>
                    <span className="text-cyan-600 font-bold">{selectedProgram.hoursPerWeek * selectedProgram.weeksPerYear} Hrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Stats Grid ────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {statCards.map(({ icon: Icon, label, key, suffix, color }) => (
                  <div key={key} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex flex-col gap-2 hover:border-cyan-300 hover:shadow-md transition-all justify-between">
                    <div>
                      <Icon size={20} style={{ color }} className="mb-2" />
                      <div className="text-xs text-slate-500 mb-1">{label}</div>
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 leading-tight">
                      {fmt(calc[key])}
                      {suffix && <span className="text-xs font-medium text-slate-500 ml-1 block mt-1">{suffix}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-[#0b2545] mb-3 flex items-center gap-2">
                  <GraduationCap size={16} className="text-amber-500" /> Student Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProgram.certifications.map((c, i) => (
                    <span key={i} className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-[#0b2545] mb-3 flex items-center gap-2">
                  <Lightbulb size={16} className="text-cyan-600" /> Real Learning Outcomes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProgram.outcomes.map((o, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />{o}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-[#0b2545] to-cyan-600 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <p className="text-white font-bold text-lg">Ready to bring this to your school?</p>
                  <p className="text-white/80 text-sm">Get a free consultation and custom proposal in 24 hours.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Link to="/contact" className="bg-white text-[#0b2545] font-bold px-5 py-2.5 rounded-xl hover:bg-cyan-50 transition-colors flex items-center gap-2 text-xs shadow">
                    Book Free Consultation <ArrowRight size={15} />
                  </Link>
                  <Link to="/lab-setup" className="border border-white/40 text-white px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-xs">
                    View Programs <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Cpu, Users, Trophy, Zap, BookOpen, Settings, Wifi, CircuitBoard, Factory, Sliders } from "lucide-react";

// Day 13 — Student Training (Beginner)
const beginnerPrograms = [
  { icon: Zap, title: "Beginner Robotics", desc: "Introduction to robotics concepts, mechanics, and how a robot senses and acts." },
  { icon: Cpu, title: "Arduino", desc: "Hands-on Arduino programming — inputs, outputs, sensors, and your first working circuits." },
  { icon: CircuitBoard, title: "Embedded Systems", desc: "How microcontrollers think — memory, I/O pins, and real-time control basics." },
  { icon: BookOpen, title: "AI Basics", desc: "An approachable first look at how machines learn, with simple hands-on demos." },
];

// Day 14 — Advanced Training
const advancedPrograms = [
  { icon: Wifi, title: "IoT", desc: "Connecting devices to the internet — ESP32, sensors, and cloud dashboards." },
  { icon: Settings, title: "PCB Design", desc: "Designing and laying out a custom circuit board from schematic to prototype." },
  { icon: Factory, title: "Industrial Robotics", desc: "An introduction to robotic arms, automation, and real factory-floor use cases." },
  { icon: Sliders, title: "Control Systems", desc: "Feedback loops, PID basics, and how robots correct themselves in real time." },
];

const teacherPrograms = [
  { title: "Robotics Teaching Methodology", desc: "How to teach robotics effectively in a classroom environment." },
  { title: "Lab Management", desc: "Day-to-day management of a robotics lab — safety, maintenance and scheduling." },
  { title: "Curriculum Integration", desc: "Integrating robotics with existing subjects like Math, Science and Computer Science." },
  { title: "Assessment & Evaluation", desc: "How to assess student projects and practical robotics skills." },
];

const benefits = [
  "Project-Based Learning Approach",
  "Industry Expert Trainers",
  "Hands-On Practical Sessions",
  "Coding & STEM Integration",
  "Competition Mentoring",
  "Certification on Completion",
];

export default function Training() {
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
            Training Programs
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Robotics training for <span className="text-cyan-400">students &amp; teachers</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From beginner to industrial expert — hands-on training programs
            designed for school students and educators.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#061B33] px-7 py-3.5 rounded-xl font-semibold mt-9 transition-colors"
          >
            Enroll Your School
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ============ STUDENT TRAINING — BEGINNER ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#0b2545] rounded-xl flex items-center justify-center">
              <Trophy size={20} className="text-cyan-300" />
            </div>
            <h2 className="text-3xl font-bold text-[#0b2545]">Student Training</h2>
          </div>
          <p className="text-slate-600 mb-12 max-w-xl">Where every student starts — the foundations of robotics, electronics, and AI.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {beginnerPrograms.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="group border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#0b2545] rounded-lg flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                    <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Level {i + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ADVANCED TRAINING ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#0b2545] rounded-xl flex items-center justify-center">
              <Cpu size={20} className="text-cyan-300" />
            </div>
            <h2 className="text-3xl font-bold text-[#0b2545]">Advanced Training</h2>
          </div>
          <p className="text-slate-600 mb-12 max-w-xl">For students ready to go further — connected devices, custom hardware, and real control systems.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {advancedPrograms.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-[#0b2545] rounded-lg flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                    <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Module {i + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEACHER TRAINING ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#0b2545] rounded-xl flex items-center justify-center">
              <Users size={20} className="text-cyan-300" />
            </div>
            <h2 className="text-3xl font-bold text-[#0b2545]">Teacher Training</h2>
          </div>
          <p className="text-slate-600 mb-12 max-w-xl">Equipping teachers with the skills and confidence to run a robotics lab effectively.</p>

          <div className="grid md:grid-cols-2 gap-5">
            {teacherPrograms.map(({ title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-[#0b2545] mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY OUR TRAINING ============ */}
      <section className="py-24 bg-[#061B33] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Why It Works</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Training that sticks</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all">
                <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
                <span className="font-medium text-slate-200 text-sm">{b}</span>
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
            <h2 className="relative text-3xl md:text-4xl font-bold">Start robotics training at your school</h2>
            <p className="relative mt-4 text-cyan-50/90">Empower students with future-ready skills — contact us today.</p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors">
              Book Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

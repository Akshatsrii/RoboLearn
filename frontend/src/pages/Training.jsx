import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Cpu, Users, Trophy, Zap, BookOpen, Settings, Wifi, CircuitBoard, Factory, Sliders, GraduationCap, Calendar, Compass, Medal } from "lucide-react";
import { getCourses } from "../services/courseService";
import SEO from "../components/SEO";

// Curated programs
const beginnerPrograms = [
  { icon: Zap, title: "Beginner Robotics", desc: "Introduction to robotics concepts, mechanics, and how a robot senses and acts." },
  { icon: Cpu, title: "Arduino", desc: "Hands-on Arduino programming — inputs, outputs, sensors, and your first working circuits." },
  { icon: CircuitBoard, title: "Embedded Systems", desc: "How microcontrollers think — memory, I/O pins, and real-time control basics." },
  { icon: BookOpen, title: "AI Basics", desc: "An approachable first look at how machines learn, with simple hands-on demos." },
];

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

// Interactive competitions timeline config
const competitions = [
  {
    id: "wro",
    name: "World Robot Olympiad (WRO)",
    dateBracket: "August – November",
    age: "Ages 8-19 years",
    kit: "Lego Mindstorms / Arduino compatible controllers",
    target: "Solve specific board challenges (e.g. waste sort, ocean navigation)",
    prepTime: "3-4 Months",
    guide: "Register online on the WRO India portal. Teams of 2-3 students build, code, and test robots to execute autonomous tasks on a predefined vinyl field. Local regional matches determine national qualifiers."
  },
  {
    id: "fll",
    name: "FIRST Lego League (FLL)",
    dateBracket: "October – February",
    age: "Ages 9-16 years",
    kit: "LEGO Spike Prime / EV3 core kits",
    target: "Robot games matches plus academic innovation project deck",
    prepTime: "4-5 Months",
    guide: "Requires Lego education components. Focuses heavily on student core values, an innovation research project, and a robot game segment. Highly popular for grades 5 to 9."
  },
  {
    id: "irc",
    name: "Indian Robotics Championship (IRC)",
    dateBracket: "December annually",
    age: "Middle & High Schools",
    kit: "RoboLearn Advanced kit, metal chassis elements",
    target: "Remote manual driving + autonomous maze traversal",
    prepTime: "2 Months",
    guide: "Great starter arena for schools new to metal fabrication. Teams assemble high-torque geared robots to transfer items across bridges and trigger manual gates in a head-to-head racing match."
  },
  {
    id: "atl_hackathon",
    name: "National ATL Hackathon",
    dateBracket: "July – September",
    age: "Grades 6-12 (ATL Schools)",
    kit: "ESP32, Arduino, environmental sensors, solar cells",
    target: "Innovate community social solutions (Smart farming, health tech)",
    prepTime: "3 Months",
    guide: "Organized by NITI Aayog under AIM. Teams submit online videos and project code files detailing working prototypes that target municipal, safety, or agricultural challenges in their local town."
  }
];

export default function Training() {
  const [adminCourses, setAdminCourses] = useState([]);
  const [activeComp, setActiveComp] = useState("wro");

  useEffect(() => {
    getCourses({ isActive: true, limit: 50 })
      .then((res) => setAdminCourses(res.data?.data || []))
      .catch(() => setAdminCourses([]));
  }, []);

  const adminStudentCourses = adminCourses.filter((c) => c.audience === "student");
  const adminTeacherCourses = adminCourses.filter((c) => c.audience === "teacher");

  const currentComp = competitions.find((c) => c.id === activeComp) || competitions[0];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-20 pb-16">
      <SEO
        title="STEM & Robotics Training Programs"
        description="Comprehensive robotics training courses for school students and teachers. Direct mentoring for World Robot Olympiad (WRO), FIRST Lego League (FLL), and ATL Hackathons."
        path="/training"
      />
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
      <section className="relative overflow-hidden bg-[#061B33] py-20 lg:py-24">
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
            STEM &amp; Robotics Training
          </h1>
          <p className="mt-6 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hands-on learning paths from visual block-coding to advanced C++ microcontrollers, IoT development, and national competition training.
          </p>
        </div>
      </section>

      {/* ============ STUDENT TRAINING — BEGINNER ============ */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#0b2545] rounded-xl flex items-center justify-center">
            <Trophy size={20} className="text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold text-[#0b2545]">Student Core Training</h2>
        </div>
        <p className="text-slate-500 text-sm mb-10 max-w-xl">Foundational programs introducing young minds to mechanical structures, sensors, and coding.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {beginnerPrograms.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#0b2545] rounded-lg flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Level {i + 1}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ADVANCED TRAINING ============ */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#0b2545] rounded-xl flex items-center justify-center">
            <Cpu size={20} className="text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold text-[#0b2545]">Advanced IoT &amp; Hardware Modules</h2>
        </div>
        <p className="text-slate-500 text-sm mb-10 max-w-xl">Advanced modules teaching connectivity protocols, custom board layouts, and feedback loops.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advancedPrograms.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#0b2545] rounded-lg flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Module {i + 1}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ INTERACTIVE COMPETITIONS TIMELINE ============ */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-1.5">
            <Medal size={15} /> Competition Mentorship
          </span>
          <h2 className="text-3xl font-extrabold text-[#0b2545] mt-2">Robotics Olympiad Arena</h2>
          <p className="text-slate-500 text-sm mt-2">
            Get structured team preparation guidance and target coaching for major regional and international robotics arenas.
          </p>
        </div>

        {/* Timeline Horizontal Line / Buttons */}
        <div className="relative border-b border-slate-200 pb-4 mb-8 flex justify-center gap-3 flex-wrap">
          {competitions.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setActiveComp(comp.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                activeComp === comp.id
                  ? "bg-[#0b2545] text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-200"
              }`}
            >
              {comp.name.split(" ")[0]} Arena
            </button>
          ))}
        </div>

        {/* Selected Competition Display card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 grid lg:grid-cols-[1fr_1.2fr] gap-8 shadow-sm">
          {/* Summary Column */}
          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {currentComp.age}
              </span>
              <h3 className="text-xl font-extrabold text-[#0b2545] mt-3">{currentComp.name}</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-cyan-600 shrink-0" />
                <span className="text-slate-600 font-medium">Timeline: <strong>{currentComp.dateBracket}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={15} className="text-cyan-600 shrink-0" />
                <span className="text-slate-600 font-medium">Hardware base: <strong>{currentComp.kit}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Compass size={15} className="text-cyan-600 shrink-0" />
                <span className="text-slate-600 font-medium">Prep Required: <strong>{currentComp.prepTime}</strong></span>
              </div>
            </div>
          </div>

          {/* Details / Guide Column */}
          <div className="bg-slate-50 rounded-2xl p-6 flex flex-col justify-between border border-slate-200/50">
            <div>
              <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-2">Challenge &amp; Guidelines</h4>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">{currentComp.target}</p>
              
              <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-2">How to Participate</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{currentComp.guide}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <Link
                to="/contact"
                className="bg-[#0b2545] hover:bg-cyan-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                Request Team Mentoring <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TEACHER TRAINING ============ */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#0b2545] rounded-xl flex items-center justify-center">
            <Users size={20} className="text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold text-[#0b2545]">Teacher Certifications</h2>
        </div>
        <p className="text-slate-500 text-sm mb-10 max-w-xl">Equipping teachers with lab leadership, instructional safety, and CBSE-aligned assessment frameworks.</p>

        <div className="grid md:grid-cols-2 gap-5">
          {teacherPrograms.map(({ title, desc }) => (
            <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#0b2545] text-base mb-2">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
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
      <section className="py-24 bg-white">
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
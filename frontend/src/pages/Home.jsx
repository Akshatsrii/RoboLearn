import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  FlaskConical,
  CheckCircle2,
  Quote,
  Lightbulb,
  Puzzle,
  Rocket,
  Brain,
  School,
  Heart,
  Building2,
  ClipboardList,
  Map,
  Wrench,
  Headphones,
} from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import SEO from "../components/SEO";

/* ---------------------------------------------------------
   Content
--------------------------------------------------------- */

const services = [
  {
    icon: Wrench,
    title: "Robotics Lab Design and Installation",
    desc: "End-to-end lab installation — layout customization, heavy wiring, and workstation setups designed for school safety.",
  },
  {
    icon: GraduationCap,
    title: "Student Training",
    desc: "Hands-on robotics and coding sessions that move students from basics to advanced industrial expert projects.",
  },
  {
    icon: Users,
    title: "Teacher Training",
    desc: "Detailed instructional development and certification so your local school teachers can run lab operations independently.",
  },
  {
    icon: FlaskConical,
    title: "Robotics Kits Supply",
    desc: "Procuring and compilation of durable school hardware kits, sensors, motors, and microcontrollers.",
  },
  {
    icon: BookOpen,
    title: "STEM Curriculum",
    desc: "Complete grade-wise learning frameworks, outcome binders, rubrics, and NEP 2020 syllabus binders.",
  },
  {
    icon: Headphones,
    title: "Annual Maintenance Support",
    desc: "On-call debugging, technical audits, replacement of component boards, and software IDE package updates.",
  },
];

const whyChooseUs = [
  "End-to-End Lab Setup",
  "Expert Trainers",
  "Age-Wise Curriculum",
  "Hands-On Learning",
  "Robotics Competitions",
  "Ongoing Support",
];

const stats = [
  { end: 50, suffix: "+", label: "Schools Equipped" },
  { end: 10000, suffix: "+", label: "Students Trained" },
  { end: 100, suffix: "+", label: "Workshops Conducted" },
  { end: 20, suffix: "+", label: "Certified Trainers" },
  { end: 15, suffix: "+", label: "Cities Reached" },
];

const whyRobotics = [
  { icon: Brain, title: "Critical Thinking", desc: "Students learn to break down real problems and reason through solutions, not just memorize answers." },
  { icon: Puzzle, title: "Hands-On Problem Solving", desc: "Building and debugging a robot teaches patience and logic in a way no textbook chapter can." },
  { icon: Rocket, title: "Future-Ready Skills", desc: "Coding, electronics, and AI basics prepare students for careers that don't fully exist yet." },
  { icon: Lightbulb, title: "Creativity in Action", desc: "Open-ended projects let students design their own solutions instead of following one fixed path." },
];

const targetAudience = [
  {
    icon: School,
    title: "Principals",
    desc: "A turnkey program that boosts your school's STEM credentials without adding to your admin workload.",
  },
  {
    icon: GraduationCap,
    title: "Teachers",
    desc: "Structured lesson plans and certification so you can teach robotics with confidence, not just supervise it.",
  },
  {
    icon: Heart,
    title: "Parents",
    desc: "Visible, hands-on learning that shows up in your child's confidence, curiosity, and report card.",
  },
  {
    icon: Building2,
    title: "School Management",
    desc: "A measurable, budget-friendly investment with clear ROI in enrollment, reputation, and outcomes.",
  },
];

const processSteps = [
  { icon: ClipboardList, title: "Consult", desc: "We understand your school's space, budget, and goals." },
  { icon: Map, title: "Plan", desc: "Custom lab design, equipment list, and curriculum mapping." },
  { icon: Wrench, title: "Install", desc: "Professional setup of hardware, software, and safety systems." },
  { icon: GraduationCap, title: "Train", desc: "Hands-on certification for teachers and a launch session for students." },
  { icon: Headphones, title: "Support", desc: "Ongoing AMC, troubleshooting, and curriculum refreshes." },
];

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <SEO
        title="Robotics & STEM Education for Schools"
        description="Complete robotics lab setup, teacher training, student programs, and CBSE-aligned STEM curriculum for schools across India. Trusted by 50+ schools."
        path="/"
      />
      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes floatSlower { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
        @keyframes pulseRing { 0% { transform: scale(0.9); opacity: .6; } 70% { transform: scale(1.4); opacity: 0; } 100% { opacity: 0; } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .anim-float { animation: floatSlow 6s ease-in-out infinite; }
        .anim-float-slow { animation: floatSlower 7s ease-in-out infinite; }
        .anim-ring { animation: pulseRing 2.4s ease-out infinite; }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-float, .anim-float-slow, .anim-ring, .anim-fadeup, .circuit-line { animation: none !important; }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#061B33]">
        {/* circuit-board backdrop */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.18]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 120 H260 V260 H520" />
            <path className="circuit-line" d="M1200 80 H880 V220 H640" />
            <path className="circuit-line" d="M0 620 H300 V480 H560" />
            <path className="circuit-line" d="M1200 700 H900 V560 H700" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="120" r="4" />
            <circle cx="520" cy="260" r="4" />
            <circle cx="880" cy="80" r="4" />
            <circle cx="640" cy="220" r="4" />
            <circle cx="300" cy="620" r="4" />
            <circle cx="560" cy="480" r="4" />
            <circle cx="900" cy="700" r="4" />
            <circle cx="700" cy="560" r="4" />
          </g>
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="anim-fadeup">
            <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              India&rsquo;s Leading Robotics Education Platform
            </span>

            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-white">
              Empowering Schools with
              <br />
              <span className="text-cyan-400">Future-Ready STEM</span>
              <br />
              <span className="text-xl sm:text-2xl font-bold text-slate-300 tracking-wide block mt-2">(Core Engineering) Education</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-lg leading-relaxed">
              Complete Robotics Lab Setup, Student Training, Teacher Development, and STEM Learning Solutions.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#061B33] px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Schedule a Demo
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#curriculum-brochure"
                onClick={(e) => {
                  e.preventDefault();
                  alert("RoboLearn Curriculum & Lab Installation Brochure Downloaded! (Sample PDF)");
                }}
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-colors"
              >
                Download Brochure
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                CBSE-aligned
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                On-site & remote support
              </div>
            </div>
          </div>

          {/* Right: animated visual */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 rounded-[2rem] border border-cyan-400/20 anim-ring" />
              <div className="relative rounded-[1.75rem] overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10 anim-float">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80"
                  alt="Students building a robotics kit"
                  className="w-full h-[420px] object-cover"
                  loading="eager"
                />
              </div>

              <div className="absolute -bottom-8 -left-8 w-40 rounded-2xl overflow-hidden border-4 border-[#061B33] shadow-xl anim-float-slow">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80"
                  alt="Arduino circuit board close-up"
                  className="w-full h-28 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute -top-6 -right-6 bg-white text-[#061B33] rounded-xl px-4 py-3 shadow-xl anim-float-slow">
                <p className="text-2xl font-bold text-cyan-600 leading-none">98%</p>
                <p className="text-xs text-slate-500 mt-1">Teacher satisfaction</p>
              </div>
            </div>

            {/* Animated stats strip — embedded in hero, per Day-6 spec */}
            <div className="mt-12 grid grid-cols-3 gap-3 max-w-md mx-auto">
              {[
                { end: 50, suffix: "+", label: "Schools" },
                { end: 10000, suffix: "+", label: "Students" },
                { end: 100, suffix: "+", label: "Workshops" },
              ].map((s) => (
                <div key={s.label} className="text-center bg-white/5 border border-white/10 rounded-xl py-3">
                  <AnimatedCounter
                    end={s.end}
                    suffix={s.suffix}
                    className="block text-xl font-bold text-cyan-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map(({ end, suffix, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:border-cyan-200 hover:shadow-md transition-all"
              >
                <AnimatedCounter
                  end={end}
                  suffix={suffix}
                  className="block text-3xl md:text-4xl font-bold text-[#0b2545]"
                />
                <p className="text-slate-500 mt-2 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY ROBOTICS EDUCATION ============ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">
              Why Robotics Education
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">
              More than a subject — a way of thinking
            </h2>
            <p className="mt-4 text-slate-600">
              Robotics gives students a hands-on reason to care about Math, Science, and Logic.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {whyRobotics.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center group-hover:bg-[#0b2545] transition-colors duration-300">
                  <Icon className="text-cyan-600 group-hover:text-cyan-300 transition-colors duration-300" size={22} />
                </div>
                <h3 className="text-base font-semibold mt-5 text-[#0b2545]">{title}</h3>
                <p className="mt-2.5 text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TARGET AUDIENCE ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">
              Who It's For
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">
              Built around everyone in the school ecosystem
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {targetAudience.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white border border-slate-200 rounded-2xl p-7 text-center hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0b2545] flex items-center justify-center mx-auto group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon size={24} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mt-5 text-[#0b2545]">{title}</h3>
                <p className="mt-2.5 text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">
              What we deliver
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">
              Everything a robotics program needs
            </h2>
            <p className="mt-4 text-slate-600">
              One partner for setup, training, content, and ongoing support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-white border border-slate-200 rounded-2xl p-7 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0b2545] flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                    <Icon className="text-cyan-300 group-hover:text-white transition-colors duration-300" size={22} />
                  </div>

                  <h3 className="text-lg font-semibold mt-5 text-[#0b2545]">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-slate-600 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROCESS TIMELINE ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">
              From first call to a running lab
            </h2>
          </div>

          <div className="relative mt-16">
            {/* connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-slate-200" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {processSteps.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="relative text-center">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#0b2545] flex items-center justify-center mx-auto shadow-sm">
                    <Icon size={22} className="text-cyan-300" />
                  </div>
                  <span className="block text-xs font-bold text-cyan-600 mt-3">Step {i + 1}</span>
                  <h3 className="font-semibold text-[#0b2545] mt-1">{title}</h3>
                  <p className="text-slate-500 text-sm mt-1.5 leading-relaxed max-w-[180px] mx-auto">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ROBOTICS KITS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">STEM Catalog</span>
            <h2 className="text-3xl font-extrabold text-[#0b2545] mt-3">Featured Robotics Kits</h2>
            <p className="text-slate-500 text-sm mt-2">Classroom-tested electronics, sensors, and microcontroller compiling kits mapping directly to CBSE standards.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "1", name: "Kids Robotics Kit", category: "Beginner", price: 2499, desc: "Introductory physical computing building blocks, snap-fit chassis assembly, no soldering.", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80" },
              { id: "2", name: "Arduino Learning Kit", category: "Intermediate", price: 3999, desc: "Arduino core microcontroller board, multi-sensor shield array, breadboard connections.", img: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=400&q=80" },
              { id: "3", name: "AI Starter Kit", category: "Advanced", price: 5499, desc: "Computer vision and machine learning starter kits with ESP32 high-res camera shield.", img: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=400&q=80" },
              { id: "4", name: "IoT Experiment Kit", category: "Advanced", price: 4899, desc: "Cloud communications node module with temperature, light, and soil humidity telemetry.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80" }
            ].map((kit) => (
              <div key={kit.id} className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-full h-36 rounded-xl overflow-hidden mb-4 bg-slate-50 border border-slate-100">
                    <img src={kit.img} alt={kit.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-[9px] font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full uppercase tracking-wider mb-2.5 inline-block">{kit.category}</span>
                  <h3 className="font-bold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors mb-2 text-sm">{kit.name}</h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed mb-4 line-clamp-2">{kit.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-50 mt-auto">
                  <span className="font-bold text-[#0b2545] text-sm">₹{kit.price}</span>
                  <Link to={`/products/${kit.id}`} className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                    Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#0b2545] hover:bg-cyan-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-md text-sm">
              Explore STEM Shop <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-24 bg-[#061B33] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">
              Why RoboLearn
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
              Built for schools, not just demos
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Most vendors stop at installation. We stay through the academic
              year — training teachers, refreshing curriculum, and keeping
              every lab competition-ready.
            </p>

            <div className="mt-9 grid sm:grid-cols-2 gap-3">
              {whyChooseUs.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <CheckCircle2 size={18} className="text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-slate-200 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl anim-float">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Teacher guiding students on a robotics lab project"
                className="w-full h-[380px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-xl flex items-center gap-3 anim-float-slow">
              <Quote size={20} className="text-cyan-600 shrink-0" />
              <p className="text-xs text-slate-600 max-w-[180px] leading-snug">
                "Our students built and presented their own bots in 6 weeks."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SUCCESS STORIES & CASE STUDIES ============ */}
      <section className="py-24 bg-white border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Impact &amp; Case Studies</span>
            <h2 className="text-3xl font-extrabold text-[#0b2545] mt-3">Success Stories from Our Schools</h2>
            <p className="text-slate-500 text-sm mt-2">See how implementing physical computing labs transformed teaching outcomes.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">Featured Institution</span>
              <h3 className="text-2xl font-black text-[#0b2545] mt-4">XYZ Public School</h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-4">
                Partnered with RoboLearn to transition their computer science classes from basic text editing to real, tactile hardware engineering.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  <span className="block text-2xl font-extrabold text-[#0b2545]">150+</span>
                  <span className="block text-xs text-slate-400 mt-1">Students Trained</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  <span className="block text-2xl font-extrabold text-cyan-600">100%</span>
                  <span className="block text-xs text-slate-400 mt-1">Teacher Certifications</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider">Key Project Results</h4>
              
              <div className="space-y-4">
                <div className="flex gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">Increased STEM Engagement</span>
                    <span className="block text-slate-500 text-xs mt-1">Students scored 24% higher on general science logical reasonings.</span>
                  </div>
                </div>

                <div className="flex gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="block font-bold text-slate-800 text-sm">Olympiad Participations</span>
                    <span className="block text-slate-500 text-xs mt-1">Two middle-school student squads qualified for National Robotics Olympiad.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS + PARTNERS + CERTIFICATIONS ============ */}
      <TestimonialsSection />

      {/* ============ CTA ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 md:p-16 text-center text-white shadow-xl">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" />
                <circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>

            <h2 className="relative text-3xl md:text-5xl font-black">
              Ready to Transform Your School into a Future Skills Learning Center?
            </h2>

            <p className="relative mt-4 text-cyan-50/90 text-sm max-w-xl mx-auto">
              Get an end-to-end lab consultation proposal and demo kit compilation for your school gate.
            </p>

            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] px-8 py-4 rounded-xl font-bold mt-9 hover:bg-cyan-50 transition-colors shadow-md text-sm"
            >
              Book Free Consultation
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

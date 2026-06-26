import { Link } from "react-router-dom";
import TestimonialsSection from "../../components/sections/TestimonialsSection";

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
} from "lucide-react";

/* ---------------------------------------------------------
   Content
--------------------------------------------------------- */

const services = [
  {
    icon: Cpu,
    title: "Robotics Lab Setup",
    desc: "End-to-end lab installation — hardware, wiring, and workstation layout designed for classrooms.",
  },
  {
    icon: GraduationCap,
    title: "Student Training",
    desc: "Hands-on robotics and STEM sessions that move students from theory to working builds.",
  },
  {
    icon: Users,
    title: "Teacher Development",
    desc: "Certification-backed training so teachers can run the lab independently, year after year.",
  },
  {
    icon: BookOpen,
    title: "STEM Curriculum",
    desc: "Grade-wise curriculum mapped to CBSE outcomes, with ready lesson plans and rubrics.",
  },
  {
    icon: FlaskConical,
    title: "Robotics Kits",
    desc: "Durable, classroom-tested kits — from beginner Arduino sets to advanced IoT modules.",
  },
  {
    icon: Award,
    title: "Competition Prep",
    desc: "Structured coaching for robotics olympiads, hackathons, and national-level competitions.",
  },
];

const whyChooseUs = [
  "Complete robotics lab setup, on schedule",
  "Teacher training that builds real independence",
  "Project-based student learning programs",
  "Curriculum integration with measurable outcomes",
  "Dedicated competition preparation tracks",
  "Annual maintenance & on-call technical support",
];

const stats = [
  ["50+", "Schools Equipped"],
  ["10,000+", "Students Trained"],
  ["20+", "Certified Trainers"],
  ["15+", "Cities Reached"],
];

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
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
              Build the lab.
              <br />
              <span className="text-cyan-400">Train the minds.</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-lg leading-relaxed">
              Complete robotics lab setup, teacher training, student programs,
              and CBSE-aligned STEM curriculum — delivered as one connected
              system for your school.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#061B33] px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Get Free Consultation
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/lab-setup"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/5 transition-colors"
              >
                Explore Labs
              </Link>
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
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-14 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:border-cyan-200 hover:shadow-md transition-all"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-[#0b2545]">
                  {value}
                </h3>
                <p className="text-slate-500 mt-2 text-sm font-medium">{label}</p>
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
      
{/* Testimonials */}
<TestimonialsSection />

      {/* ============ CTA ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 md:p-16 text-center text-white">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" />
                <circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>

            <h2 className="relative text-3xl md:text-5xl font-bold">
              Ready to set up your robotics lab?
            </h2>

            <p className="relative mt-4 text-lg text-cyan-50/90">
              Get a free consultation and lab plan for your school — no obligation.
            </p>

            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] px-8 py-4 rounded-xl font-semibold mt-9 hover:bg-cyan-50 transition-colors"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
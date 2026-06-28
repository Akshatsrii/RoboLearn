import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Cpu, Monitor, Wrench, GraduationCap, Shield, Settings } from "lucide-react";

const features = [
  "Complete Lab Design & Layout Planning",
  "Hardware Installation (Arduino, ESP32, Raspberry Pi)",
  "Software Setup (Arduino IDE, Python, Scratch)",
  "Safety Guidelines & Lab Rules",
  "Curriculum Design & Teacher Support",
  "Annual Maintenance Contract (AMC)",
];

const equipment = [
  { icon: Cpu, title: "Hardware Setup", desc: "Arduino, ESP32, Raspberry Pi, sensors, motors and robotics kits." },
  { icon: Monitor, title: "Software Setup", desc: "Arduino IDE, Python, Tinkercad, Scratch and coding tools." },
  { icon: Wrench, title: "Lab Infrastructure", desc: "Workstations, storage, wiring, lighting and safety equipment." },
  { icon: GraduationCap, title: "Teacher Training", desc: "Dedicated teacher training on lab management and curriculum." },
  { icon: Shield, title: "Safety Guidelines", desc: "Complete safety protocols and lab rules for student safety." },
  { icon: Settings, title: "AMC Support", desc: "Annual maintenance to keep your lab running smoothly." },
];

const process = [
  { num: "01", title: "School Consultation", desc: "We visit your school, understand needs, space and budget." },
  { num: "02", title: "Lab Planning", desc: "Custom design, equipment list and curriculum mapping." },
  { num: "03", title: "Installation", desc: "Professional setup of all hardware, software and safety systems." },
  { num: "04", title: "Teacher Training", desc: "Full training for teachers on lab operations and curriculum." },
  { num: "05", title: "Student Launch", desc: "First session with students — hands-on from day one." },
];

export default function LabSetup() {
  return (
    <div className="bg-white text-slate-900">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatSlow { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .anim-float { animation: floatSlow 6s ease-in-out infinite; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fadeup, .circuit-line, .anim-float { animation: none !important; }
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
            Robotics Lab Setup
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Complete <span className="text-cyan-400">robotics lab</span> for your school
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            End-to-end lab design, hardware installation, software setup,
            teacher training, and annual maintenance — all under one contract.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#061B33] px-7 py-3.5 rounded-xl font-semibold mt-9 transition-colors"
          >
            Get Free Lab Consultation
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ============ WHAT WE PROVIDE ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">What's Included</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">A world-class robotics lab, fully managed</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                We handle everything — from lab design and equipment procurement
                to installation, training, and long-term maintenance support.
              </p>
              <div className="space-y-3 mt-8">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-cyan-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl anim-float">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                  alt="Fully equipped robotics lab with student workstations"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {equipment.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="group border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-sm transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#0b2545] flex items-center justify-center mb-3 group-hover:bg-cyan-500 transition-colors duration-300">
                      <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="font-semibold text-[#0b2545] text-sm mb-1">{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Our Process</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">From first call to a running lab</h2>
            <p className="mt-4 text-slate-600">Seamlessly, in five clear stages.</p>
          </div>

          <div className="mt-14 space-y-4">
            {process.map(({ num, title, desc }) => (
              <div key={num} className="flex items-start gap-6 bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-sm transition-all">
                <div className="text-3xl font-bold text-cyan-600/25 w-10 flex-shrink-0">{num}</div>
                <div>
                  <h4 className="font-semibold text-[#0b2545] mb-1">{title}</h4>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
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
            <h2 className="relative text-3xl md:text-4xl font-bold">Ready to build your robotics lab?</h2>
            <p className="relative mt-4 text-cyan-50/90">Get a customized lab proposal for your school — free of charge.</p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors">
              Get Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Brain, Cpu, GraduationCap, Code, ShieldCheck, HelpCircle } from "lucide-react";
import SEO from "../components/SEO";

const curriculumLevels = {
  primary: {
    label: "Grades 3–5",
    title: "Elementary Foundation",
    desc: "Focuses on block coding, physical mechanics, and developing simple logical patterns through tangible building blocks.",
    outcomes: [
      "Understand algorithms using Scratch block-programming",
      "Learn mechanical force concepts (gears, pulleys, axles)",
      "Develop spatial reasoning and design patience"
    ],
    software: ["Scratch 3.0", "Tinkercad Circuits (Basic)", "RoboLearn Blockly App"],
    kitsUsed: [
      { id: "1", name: "Kids Robotics Kit", price: "₹2,499" }
    ],
    projects: [
      { name: "Smart Traffic Light", desc: "Builds logic of timers and sequence using LEDs and buttons." },
      { name: "Motorized Cable Car", desc: "Teaches gear ratios, pulley systems, and tension force." },
      { name: "Whistling Alarm Bot", desc: "Integrates sound sensors to trigger motor movements on command." }
    ]
  },
  middle: {
    label: "Grades 6–8",
    title: "Middle School Exploration",
    desc: "Steps into real microcontroller wiring (Arduino) and introduces textual syntax. Mapped directly to CBSE secondary standards.",
    outcomes: [
      "Understand input-output mapping using multiple sensors",
      "Write conditional statements and loop controls in C++",
      "Create automated loops for real-world scenarios (smart home, auto cars)"
    ],
    software: ["Arduino IDE", "Tinkercad Circuits (Full)", "Python IDLE"],
    kitsUsed: [
      { id: "2", name: "Arduino Learning Kit", price: "₹3,999" }
    ],
    projects: [
      { name: "Smart Waste Bin", desc: "Open lid automatically using ultrasonic sensor and servo motor." },
      { name: "Bluetooth Remote Car", desc: "Learn to send serial commands from a phone to steer a motor shield." },
      { name: "Automated Plant Watering", desc: "Read soil moisture values to activate water pump when dry." }
    ]
  },
  senior: {
    label: "Grades 9–12",
    title: "High School Innovation",
    desc: "Combines data science, advanced networking (IoT), computer vision, and Python development for real-world projects.",
    outcomes: [
      "Deploy custom machine learning models on edge sensors",
      "Set up cloud databases to read live sensor readings over Wi-Fi",
      "Design PCB routing diagrams and implement simple AI algorithms"
    ],
    software: ["Python 3.x", "VS Code", "MQTT Cloud broker", "EdgeImpulse ML Workspace"],
    kitsUsed: [
      { id: "3", name: "AI Starter Kit", price: "₹5,499" },
      { id: "4", name: "IoT Experiment Kit", price: "₹4,899" }
    ],
    projects: [
      { name: "Face-Recognition Gate Lock", desc: "Deploy OpenCV models on ESP32-CAM to actuate solenoid locks." },
      { name: "Weather Station Cloud Broker", desc: "Upload DHT22 telemetry data to live public dashboards over MQTT." },
      { name: "Gesture-Controlled Robot Arm", desc: "Map gyro values from hand glove sensor to wireless robotic servos." }
    ]
  }
};

const features = [
  "NEP 2020 & CBSE Aligned Outcomes",
  "Fully Interactive Project-Based Sheets",
  "Detailed Teacher Guide Books & Slides",
  "Rubric-Driven Semester Evaluations",
  "National Robotics Olympiad Trackers",
  "AMC & Lab Hardware Maintenance",
];

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState("primary");

  const currentLevel = curriculumLevels[activeTab];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pt-20 pb-16">
      <SEO
        title="Interactive STEM & Robotics Curriculum"
        description="NEP 2020 and CBSE aligned grade-wise robotics syllabus for primary, middle, and senior high schools, with sample coding projects and hardware kit requirements."
        path="/curriculum"
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
            STEM Curriculum
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Grade-Wise <span className="text-cyan-400">Robotics Syllabus</span>
          </h1>
          <p className="mt-6 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Age-appropriate STEM frameworks mapping design thinking, electronics, block programming, and Python AI algorithms for students in Grade 3 to 12.
          </p>
        </div>
      </section>

      {/* ============ INTERACTIVE BOARD ============ */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Interactive Board</span>
          <h2 className="mt-3 text-3xl font-bold text-[#0b2545]">Age-Appropriate Learning Paths</h2>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-10 flex-wrap">
          {[
            { id: "primary", label: "Primary (Grades 3-5)", icon: Brain },
            { id: "middle", label: "Middle School (Grades 6-8)", icon: Cpu },
            { id: "senior", label: "High School (Grades 9-12)", icon: GraduationCap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#0b2545] text-white shadow-md shadow-cyan-900/10 scale-102"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-cyan-200"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Level Details Grid */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Syllabus Details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-2.5 py-0.5 rounded-full inline-block">
                {currentLevel.label}
              </span>
              <h3 className="text-2xl font-extrabold text-[#0b2545] mt-3">{currentLevel.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-3">{currentLevel.desc}</p>
            </div>

            {/* Learning Outcomes */}
            <div className="space-y-2 border-t border-slate-100 pt-5">
              <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-3">Key Outcomes</h4>
              {currentLevel.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-slate-600 leading-normal">{outcome}</span>
                </div>
              ))}
            </div>

            {/* Hardware Kits Used (E-com Bridge) */}
            <div className="border-t border-slate-100 pt-5">
              <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-3">Hardware Kit Required</h4>
              <div className="flex flex-wrap gap-4">
                {currentLevel.kitsUsed.map((kit) => (
                  <Link
                    key={kit.id}
                    to={`/products/${kit.id}`}
                    className="flex items-center justify-between gap-6 border border-slate-200 rounded-xl p-3.5 hover:border-cyan-300 hover:bg-cyan-50/5 hover:shadow-sm transition-all text-xs w-full sm:max-w-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 block">{kit.name}</span>
                      <span className="text-slate-400 mt-0.5 block">{kit.price} (Student Pack)</span>
                    </div>
                    <span className="text-cyan-600 font-bold shrink-0 flex items-center gap-1">
                      Shop Kit <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Showcase Panel */}
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-4">Sample Student Projects</h4>
            <div className="space-y-4">
              {currentLevel.projects.map((project) => (
                <div key={project.name} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:border-cyan-100 transition-colors">
                  <span className="font-bold text-slate-800 text-sm block">{project.name}</span>
                  <span className="text-slate-500 text-xs mt-1.5 leading-relaxed block">{project.desc}</span>
                </div>
              ))}
            </div>

            {/* Software Used list */}
            <div className="mt-6 pt-5 border-t border-slate-200/60">
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Software Environments</h5>
              <div className="flex flex-wrap gap-1.5">
                {currentLevel.software.map((sw) => (
                  <span key={sw} className="text-[10px] font-bold text-slate-600 bg-slate-200/60 px-2.5 py-1 rounded-md">
                    {sw}
                  </span>
                ))}
              </div>
            </div>
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
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Full-Suite Academic Curriculum Pack</h2>
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
            <h2 className="relative text-3xl md:text-4xl font-bold">Bring STEM education to your school</h2>
            <p className="relative mt-4 text-cyan-50/90">Get a comprehensive curriculum catalog and arrange a free demonstration session for your teachers.</p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors">
              Request Full Curriculum Pack <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

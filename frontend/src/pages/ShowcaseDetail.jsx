import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft, Trophy, GraduationCap, Award, Cpu, Heart,
  Share2, ExternalLink, CheckCircle2, ChevronRight, Play, Users, Wrench, ShieldAlert
} from "lucide-react";
import SEO from "../components/SEO";
import { useState } from "react";

/* Shared dataset — Upgraded with rich project details */
const PROJECTS = [
  {
    id: 1,
    title: "Smart Irrigation Bot",
    student: "Priya Sharma",
    school: "DPS Rohini, Delhi",
    grade: "Grade 10",
    category: "IoT / Agriculture",
    year: 2024,
    featured: true,
    award: "National Robotics Championship – 1st Place",
    problemStatement: "Farmers face severe water wastage due to manual or scheduled watering of crops, leading to lower yields and high water utility bills in dry seasons.",
    description: "An autonomous irrigation system using soil moisture sensors and Arduino, reducing water usage by 40% in the school garden.",
    longDesc: "Priya built this project over 6 months as part of her school's ATL program. The system reads real-time soil moisture data and auto-activates a water pump only when moisture drops below a threshold, saving 40% water vs. manual irrigation. The ESP8266 sends live data to a custom dashboard viewable on any browser.",
    tech: ["Arduino UNO", "Soil Moisture Sensor", "Relay Module", "Water Pump", "ESP8266 WiFi"],
    steps: [
      "Calibrate soil moisture sensor values for dry vs wet soil",
      "Wire relay module to control external 9V water pump",
      "Program moisture threshold logic inside Arduino C++ loop",
      "Configure ESP8266 to host local web dashboard and transmit data",
      "Deploy and test structural casing in school garden"
    ],
    impact: "40% water reduction · Deployed in 3 school gardens · ATL Marathon National Winner",
    skillsLearned: ["Arduino Programming", "Circuit Design", "IoT & Data Integration", "Calibration & Sensing"],
    likes: 312,
    emoji: "🌱",
    gradient: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
    accentColor: "#10b981",
  },
  {
    id: 2,
    title: "Braille Printer 2.0",
    student: "Arjun Mehta",
    school: "Kendriya Vidyalaya, Pune",
    grade: "Grade 11",
    category: "Assistive Tech",
    year: 2024,
    featured: true,
    award: "CBSE Innovation Award",
    problemStatement: "Commercial Braille printers are priced out of reach (₹80,000+) for regional schools serving visually impaired students, limiting their learning resources.",
    description: "A low-cost Braille printing device made from salvaged printer parts and servo motors, printing 60 characters per minute.",
    longDesc: "Arjun designed this device to help visually impaired students in his district access printed materials. He salvaged old printer mechanics and used servo motors controlled by Arduino Mega to emboss Braille dots. A Python parser on a connected PC converts any typed text to Braille encoding and streams it character-by-character.",
    tech: ["Servo Motors", "Arduino Mega", "Python Text Parser", "3D Printed Frame"],
    steps: [
      "Salvage mechanical slider rods and rails from old inkjets",
      "Mount custom dual servo embossers calibrated for Braille dots",
      "Develop Python string parser to map standard letters to 6-dot Braille matrices",
      "Program Arduino to process serial emboss queues in real-time",
      "Calibrate embosser needle depth for clean indentations without tearing paper"
    ],
    impact: "Used by 3 local schools · Build Cost: ₹2,200 · CBSE Innovation Award Winner",
    skillsLearned: ["Python Parsing", "Digital Fabrication", "Mechanical Salvaging", "Calibration Standards"],
    likes: 278,
    emoji: "♿",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    accentColor: "#06b6d4",
  },
];

export default function ShowcaseDetail() {
  const { id } = useParams();
  const proj = PROJECTS.find(p => p.id === Number(id));
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  if (!proj) return <Navigate to="/showcase" replace />;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title={`${proj.title} | Student Showcase | RoboLearn`}
        description={proj.description}
      />
      <div className="min-h-screen bg-gradient-to-br from-[#040d1a] via-[#071428] to-[#040d1a] text-white">
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">

          {/* ── Back Link ──────────────────────────────────── */}
          <Link to="/showcase" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-semibold">
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          {/* ── Visual Showcase Hero Card ───────────────────── */}
          <div className={`bg-gradient-to-br ${proj.gradient} border-2 ${proj.border} rounded-3xl p-8 mb-8`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">{proj.category}</span>
                  <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">{proj.grade}</span>
                  <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">{proj.year}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{proj.title}</h1>
                <div className="flex items-center gap-2 text-slate-300 text-sm mb-4">
                  <GraduationCap size={15} />
                  <span>Built by: {proj.student} · {proj.school}</span>
                </div>
                {proj.award && (
                  <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-2 rounded-full mb-6">
                    <Award size={14} /> {proj.award}
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setLiked(l => !l)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      liked ? "bg-red-500/20 border border-red-500/30 text-red-400" : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    }`}>
                    <Heart size={14} fill={liked ? "currentColor" : "none"} />
                    {proj.likes + (liked ? 1 : 0)} Likes
                  </button>
                  <button onClick={handleCopy}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                    <Share2 size={14} />
                    {copied ? "Copied!" : "Share Link"}
                  </button>
                </div>
              </div>

              {/* Visual Project Video / Demo Loop container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center group shadow-2xl">
                {videoPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-sm font-mono text-cyan-400 mb-2">▶ STREAMING PROJECT DEMO VIDEO</span>
                    <span className="text-xs text-slate-400">Showing functioning chassis, sensors, and telemetry uploads...</span>
                    <button onClick={() => setVideoPlaying(false)} className="mt-4 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg">Stop Stream</button>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-[1px]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))" }} />
                    <span className="absolute top-3 left-3 text-xs bg-black/60 px-2.5 py-1 rounded-full font-mono text-slate-400">DEMO VIDEO</span>
                    <button
                      onClick={() => setVideoPlaying(true)}
                      className="relative z-10 w-16 h-16 rounded-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.1fr] gap-8">
            <div className="space-y-6">

              {/* Problem Statement Section */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white text-md mb-3 flex items-center gap-2 text-rose-400">
                  <ShieldAlert size={16} /> Problem Statement
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm">{proj.problemStatement}</p>
              </div>

              {/* Working Process / Step by Step */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white text-md mb-4 flex items-center gap-2">
                  <Wrench size={16} className="text-cyan-400" /> Working &amp; Construction Process
                </h3>
                <div className="space-y-4">
                  {proj.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ background: `${proj.accentColor}20`, border: `1px solid ${proj.accentColor}50`, color: proj.accentColor }}>
                        {i + 1}
                      </div>
                      <span className="text-slate-300 text-sm pt-0.5">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Impact */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white text-md mb-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> School Proof-of-Impact
                </h3>
                <div className="flex flex-wrap gap-2">
                  {proj.impact.split("·").map((item, i) => (
                    <span key={i} className="bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">

              {/* Student/Team profile */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                  <Users size={14} className="text-cyan-400" /> Student/Team Profile
                </h3>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-white">{proj.student}</p>
                  <p className="text-xs text-slate-400">{proj.school}</p>
                  <p className="text-xs text-slate-400">{proj.grade} Level Classmate</p>
                </div>
              </div>

              {/* Tech Stack / Components */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                  <Cpu size={14} className="text-cyan-400" /> Components Used
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-md font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills Learned */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-bold text-white text-sm mb-3">Skills Gained</h3>
                <div className="space-y-2">
                  {proj.skillsLearned.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <ChevronRight size={12} className="text-cyan-400" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order / Booking Banner */}
              <div className="bg-gradient-to-r from-cyan-600 to-violet-600 rounded-2xl p-5">
                <p className="text-white font-extrabold mb-1 text-sm">Want similar results?</p>
                <p className="text-white/70 text-xs mb-4">Set up a STEM Lab program in your school to train innovators.</p>
                <Link to="/contact" className="block text-center bg-white text-[#0b2545] font-bold px-4 py-2.5 rounded-xl text-xs hover:bg-cyan-50 transition-colors">
                  Contact Lab Consultant
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

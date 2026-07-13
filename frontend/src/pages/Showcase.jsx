import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy, Star, Filter, ChevronRight, GraduationCap,
  Heart, ExternalLink, Lightbulb, Award
} from "lucide-react";
import SEO from "../components/SEO";

/* ============================================================
   DATA
   ============================================================ */
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
    description:
      "An autonomous irrigation system using soil moisture sensors and Arduino, reducing water usage by 40% in the school garden. Showcased at ATL Marathon 2024.",
    tech: ["Arduino UNO", "Soil Moisture Sensor", "Relay Module", "Water Pump", "ESP8266 WiFi"],
    likes: 312,
    emoji: "🌱",
    gradient: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
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
    description:
      "A low-cost Braille printing device made from salvaged printer parts and servo motors, printing 60 characters per minute. Used by 3 local schools for the visually impaired.",
    tech: ["Servo Motors", "Arduino Mega", "Python Text Parser", "3D Printed Frame"],
    likes: 278,
    emoji: "♿",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    id: 3,
    title: "AI Waste Sorter",
    student: "Team GreenBot (5 members)",
    school: "Amity International, Noida",
    grade: "Grade 9–10",
    category: "AI / Environment",
    year: 2024,
    featured: false,
    award: "Smart India Hackathon – Regional Winner",
    description:
      "Uses a camera module + TensorFlow Lite to classify waste into bio/plastic/metal categories with 87% accuracy, automating dustbin sorting.",
    tech: ["Raspberry Pi 4", "Camera Module", "TensorFlow Lite", "Servo Arms", "Python"],
    likes: 245,
    emoji: "♻️",
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
  },
  {
    id: 4,
    title: "Gesture Robot Car",
    student: "Rahul & Team",
    school: "Ryan International, Mumbai",
    grade: "Grade 8",
    category: "Robotics",
    year: 2023,
    featured: false,
    award: "State Science Fair – Bronze",
    description:
      "A wireless robot car controlled by hand gestures using accelerometer gloves. Custom PCB designed for the glove controller.",
    tech: ["2x Arduino UNO", "MPU-6050 Gyro", "NRF24L01 Radio", "DC Motor Driver"],
    likes: 189,
    emoji: "🤖",
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
  },
  {
    id: 5,
    title: "Solar Charging Station",
    student: "Sneha Patel",
    school: "Navyug School, Ahmedabad",
    grade: "Grade 7",
    category: "Renewable Energy",
    year: 2023,
    featured: false,
    award: "District Science Exhibition – Gold",
    description:
      "A miniature solar panel array charging station with USB outputs and a battery level display. Powers 4 phones simultaneously.",
    tech: ["Solar Panels", "LiPo Battery", "Charge Controller", "Arduino Nano", "OLED Display"],
    likes: 167,
    emoji: "☀️",
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/30",
  },
  {
    id: 6,
    title: "Anti-Sleep Alert",
    student: "Kavya & Ritu",
    school: "St. Mary's School, Hyderabad",
    grade: "Grade 11",
    category: "Safety Tech",
    year: 2024,
    featured: false,
    award: "TechFest IIT Bombay – Top 10",
    description:
      "Detects driver drowsiness using eye-blink sensors and infrared proximity. Triggers buzzer + sends SMS alert to a saved contact.",
    tech: ["IR Sensor", "Arduino UNO", "GSM Module", "Buzzer", "LiPo Battery"],
    likes: 203,
    emoji: "😴",
    gradient: "from-red-500/20 to-rose-500/20",
    border: "border-red-500/30",
  },
];

const CATEGORIES = [
  "All",
  "IoT / Agriculture",
  "Assistive Tech",
  "AI / Environment",
  "Robotics",
  "Renewable Energy",
  "Safety Tech",
];

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Showcase() {
  const [filter, setFilter]   = useState("All");
  const [likedIds, setLikedIds] = useState(new Set());

  const visible = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  const toggleLike = (id) =>
    setLikedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <>
      <SEO
        title="Student Innovation Showcase | RoboLearn"
        description="Discover award-winning robotics projects built by Indian students using RoboLearn kits. From AI waste sorters to Braille printers — the future is being built in classrooms."
      />
      <div className="min-h-screen bg-gradient-to-br from-[#040d1a] via-[#071428] to-[#040d1a] text-white">

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative pt-28 pb-14 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Trophy size={15} /> Student Innovation Showcase
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Where Students{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                Build the Future
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Award-winning projects built by Indian students using RoboLearn kits. Real innovations. Real impact.
            </p>
            <div className="flex justify-center gap-8 mt-8">
              {[
                { n: "200+", l: "Projects Showcased" },
                { n: "48",   l: "Award Winners" },
                { n: "22",   l: "States Represented" },
              ].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-extrabold text-amber-400">{s.n}</div>
                  <div className="text-xs text-slate-400">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">

          {/* ── Filter ────────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center items-center">
            <Filter size={16} className="text-slate-400" />
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  filter === cat
                    ? "bg-amber-500 text-black"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:border-amber-400/50"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* ── Featured Projects ─────────────────────────── */}
          {filter === "All" && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star size={18} className="text-amber-400" /> Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.filter(p => p.featured).map(proj => (
                  <Link key={proj.id} to={`/showcase/${proj.id}`}
                    className={`relative bg-gradient-to-br ${proj.gradient} border-2 ${proj.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform block`}>
                    <div className="absolute top-4 right-4 text-4xl">{proj.emoji}</div>
                    <div className="flex gap-2 mb-3">
                      <span className="bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Trophy size={10} /> Featured
                      </span>
                      <span className="bg-white/10 text-slate-300 text-xs px-2 py-1 rounded-full">{proj.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{proj.title}</h3>
                    <div className="text-sm text-slate-400 mb-3 flex items-center gap-2">
                      <GraduationCap size={13} /> {proj.student} · {proj.school} · {proj.grade}
                    </div>
                    {proj.award && (
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-400/10 px-3 py-1.5 rounded-full w-fit mb-3">
                        <Award size={11} /> {proj.award}
                      </div>
                    )}
                    <p className="text-slate-300 text-sm line-clamp-2">{proj.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-1 flex-wrap">
                        {proj.tech.slice(0, 3).map((t, i) => (
                          <span key={i} className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                      <button onClick={e => { e.preventDefault(); toggleLike(proj.id); }}
                        className={`flex items-center gap-1 text-sm transition-colors ${likedIds.has(proj.id) ? "text-red-400" : "text-slate-400 hover:text-red-400"}`}>
                        <Heart size={14} fill={likedIds.has(proj.id) ? "currentColor" : "none"} />
                        {proj.likes + (likedIds.has(proj.id) ? 1 : 0)}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── All / Filtered Projects ───────────────────── */}
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-cyan-400" />
            {filter === "All" ? "All Projects" : filter}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.filter(p => filter !== "All" || !p.featured).map(proj => (
              <Link key={proj.id} to={`/showcase/${proj.id}`}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/30 hover:bg-white/[0.08] transition-all block">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{proj.emoji}</span>
                  <button onClick={e => { e.preventDefault(); toggleLike(proj.id); }}
                    className={`flex items-center gap-1 text-sm transition-colors ${likedIds.has(proj.id) ? "text-red-400" : "text-slate-400 hover:text-red-400"}`}>
                    <Heart size={14} fill={likedIds.has(proj.id) ? "currentColor" : "none"} />
                    {proj.likes + (likedIds.has(proj.id) ? 1 : 0)}
                  </button>
                </div>
                <span className="text-xs font-semibold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">{proj.category}</span>
                <h3 className="font-bold text-white mt-2 mb-1">{proj.title}</h3>
                <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                  <GraduationCap size={11} /> {proj.student} · {proj.grade}
                </p>
                {proj.award && (
                  <p className="text-xs text-amber-300 flex items-center gap-1 mb-2">
                    <Trophy size={11} /> {proj.award}
                  </p>
                )}
                <p className="text-slate-400 text-sm line-clamp-2">{proj.description}</p>
                <div className="flex items-center gap-1 mt-3 text-violet-400 text-xs font-semibold">
                  View Details <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>

          {/* ── Submit CTA ────────────────────────────────── */}
          <div className="mt-14 bg-gradient-to-r from-amber-600/20 to-rose-600/20 border border-amber-500/30 rounded-2xl p-8 text-center">
            <Trophy size={32} className="text-amber-400 mx-auto mb-3" />
            <h2 className="text-2xl font-extrabold text-white mb-2">Submit Your Project</h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Built something amazing with a RoboLearn kit? Submit it to be featured on our showcase and compete for
              national recognition.
            </p>
            <Link to="/contact"
              className="bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Submit My Project <ExternalLink size={15} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

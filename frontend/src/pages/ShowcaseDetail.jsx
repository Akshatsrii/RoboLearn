import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft, Trophy, GraduationCap, Award, Cpu, Heart,
  Share2, ExternalLink, CheckCircle2, ChevronRight
} from "lucide-react";
import SEO from "../components/SEO";
import { useState } from "react";

/* Shared dataset — mirrors Showcase.jsx */
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
    longDesc:
      "Priya built this project over 6 months as part of her school's ATL program. The system reads real-time soil moisture data and auto-activates a water pump only when moisture drops below a threshold, saving 40% water vs. manual irrigation. The ESP8266 sends live data to a custom dashboard viewable on any browser. The project was selected for the ATL Marathon 2024 nationals and won 1st place in the IoT category.",
    tech: ["Arduino UNO", "Soil Moisture Sensor", "Relay Module", "Water Pump", "ESP8266 WiFi"],
    steps: ["Calibrate soil moisture sensor", "Wire relay to water pump", "Program moisture threshold logic", "Add WiFi dashboard via ESP8266", "Test in school garden"],
    impact: "40% water reduction · Used in 3 school gardens · Featured in Times of India",
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
    description:
      "A low-cost Braille printing device made from salvaged printer parts and servo motors, printing 60 characters per minute.",
    longDesc:
      "Arjun designed this device to help visually impaired students in his district access printed materials. He salvaged old printer mechanics and used servo motors controlled by Arduino Mega to emboss Braille dots. A Python parser on a connected PC converts any typed text to Braille encoding and streams it character-by-character. The device prints at 60 chars/min and costs under ₹2,200 to build.",
    tech: ["Servo Motors", "Arduino Mega", "Python Text Parser", "3D Printed Frame"],
    steps: ["Design servo arm for Braille dot embossing", "Write Python Braille encoding parser", "Calibrate dot spacing to Grade 1 Braille standard", "Integrate Arduino serial communication", "Test with real visually impaired students"],
    impact: "Used by 3 local schools · Cost: ₹2,200 (vs ₹80,000 commercial printers) · Won CBSE Innovation Award",
    likes: 278,
    emoji: "♿",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    accentColor: "#06b6d4",
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
      "Uses a camera module + TensorFlow Lite to classify waste into bio/plastic/metal categories with 87% accuracy.",
    longDesc:
      "Team GreenBot trained a custom TensorFlow Lite model on 3,000 waste images to classify garbage into bio-degradable, plastic, and metal categories. A Raspberry Pi 4 with camera runs inference in real-time and signals a servo-based sorting arm to direct waste into the correct bin. The system achieves 87% accuracy and processes 1 item per second. It was deployed in the school cafeteria for a 30-day trial.",
    tech: ["Raspberry Pi 4", "Camera Module", "TensorFlow Lite", "Servo Arms", "Python"],
    steps: ["Collect and label 3,000 waste images", "Train TensorFlow Lite classification model", "Deploy model to Raspberry Pi 4", "Build 3-bin servo sorting mechanism", "Test and iterate for 30 days in cafeteria"],
    impact: "87% sorting accuracy · 30-day cafeteria deployment · Regional SIH winner",
    likes: 245,
    emoji: "♻️",
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    accentColor: "#8b5cf6",
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
    longDesc:
      "The team designed accelerometer-equipped gloves that transmit tilt/roll data wirelessly via NRF24L01 radio modules. An Arduino on the glove reads the MPU-6050 and encodes the gesture; the robot car's receiver Arduino decodes it and drives two DC motors via an L298N motor driver. The custom PCB for the glove was designed in KiCad and manufactured locally for ₹180.",
    tech: ["2x Arduino UNO", "MPU-6050 Gyro", "NRF24L01 Radio", "DC Motor Driver"],
    steps: ["Build glove with MPU-6050 accelerometer", "Design custom PCB in KiCad", "Program gesture → motor mapping", "Test radio range (up to 20m)", "Demonstrate at State Science Fair"],
    impact: "Radio range: 20m · PCB cost: ₹180 · State Science Fair Bronze Medal",
    likes: 189,
    emoji: "🤖",
    gradient: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    accentColor: "#f59e0b",
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
      "A miniature solar panel array charging station with USB outputs and a battery level display.",
    longDesc:
      "Sneha built a portable solar charging station from 4 small solar panels wired in parallel, feeding into a LiPo battery via a charge controller. An Arduino Nano reads the battery voltage and displays charge percentage on an OLED screen. Four USB-A ports are available for charging devices. The station powers 4 phones simultaneously from solar energy, with a full charge taking 6 hours of direct sunlight.",
    tech: ["Solar Panels", "LiPo Battery", "Charge Controller", "Arduino Nano", "OLED Display"],
    steps: ["Wire solar panels in parallel", "Add MPPT charge controller", "Connect LiPo battery pack", "Program battery level indicator", "Add USB output ports with protection"],
    impact: "Charges 4 phones · 6-hour full charge · District Exhibition Gold Medal",
    likes: 167,
    emoji: "☀️",
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/30",
    accentColor: "#f59e0b",
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
      "Detects driver drowsiness using eye-blink sensors and infrared proximity. Triggers buzzer + sends SMS alert.",
    longDesc:
      "The system uses an IR proximity sensor aimed at the driver's eyes to detect prolonged eye closure (blink duration > 300ms = alert). When drowsiness is detected, a buzzer sounds immediately. If the driver doesn't respond in 5 seconds, a GSM module sends an SMS to a preset emergency contact with the alert. The device runs on a LiPo battery and fits on a car visor.",
    tech: ["IR Sensor", "Arduino UNO", "GSM Module", "Buzzer", "LiPo Battery"],
    steps: ["Calibrate IR sensor for eye detection", "Set blink duration threshold (300ms)", "Program GSM SMS trigger logic", "Test false positive rate", "Mount on car visor prototype"],
    impact: "< 300ms detection latency · SMS alert in 5s · TechFest IIT Bombay Top 10",
    likes: 203,
    emoji: "😴",
    gradient: "from-red-500/20 to-rose-500/20",
    border: "border-red-500/30",
    accentColor: "#ef4444",
  },
];

export default function ShowcaseDetail() {
  const { id } = useParams();
  const proj = PROJECTS.find(p => p.id === Number(id));
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

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
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">

          {/* ── Back ──────────────────────────────────────── */}
          <Link to="/showcase" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm">
            <ArrowLeft size={16} /> Back to Showcase
          </Link>

          {/* ── Header Card ───────────────────────────────── */}
          <div className={`bg-gradient-to-br ${proj.gradient} border-2 ${proj.border} rounded-2xl p-8 mb-8`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">{proj.category}</span>
                  <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">{proj.grade}</span>
                  <span className="text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full">{proj.year}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">{proj.title}</h1>
                <div className="flex items-center gap-2 text-slate-300 text-sm mb-4">
                  <GraduationCap size={15} />
                  <span>{proj.student} · {proj.school} · {proj.grade}</span>
                </div>
                {proj.award && (
                  <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-semibold px-4 py-2 rounded-full">
                    <Award size={14} /> {proj.award}
                  </div>
                )}
              </div>
              <div className="text-6xl hidden md:block">{proj.emoji}</div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setLiked(l => !l)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  liked ? "bg-red-500/20 border border-red-500/30 text-red-400" : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                }`}>
                <Heart size={15} fill={liked ? "currentColor" : "none"} />
                {proj.likes + (liked ? 1 : 0)} Likes
              </button>
              <button onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                <Share2 size={15} />
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">

              {/* Story */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                  <Trophy size={16} className="text-amber-400" /> Project Story
                </h2>
                <p className="text-slate-300 leading-relaxed">{proj.longDesc}</p>
              </div>

              {/* Build Steps */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="font-bold text-white text-lg mb-4">How It Was Built</h2>
                <div className="space-y-3">
                  {proj.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ background: `${proj.accentColor}22`, border: `1.5px solid ${proj.accentColor}55`, color: proj.accentColor }}>
                        {i + 1}
                      </div>
                      <span className="text-slate-300 text-sm pt-1">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Real-World Impact
                </h2>
                <div className="flex flex-wrap gap-2">
                  {proj.impact.split("·").map((item, i) => (
                    <span key={i} className="bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-sm px-3 py-1.5 rounded-full">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Cpu size={15} className="text-cyan-400" /> Tech Stack
                </h3>
                <div className="space-y-2">
                  {proj.tech.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <ChevronRight size={12} style={{ color: proj.accentColor }} />{t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-600 to-violet-600 rounded-2xl p-5">
                <p className="text-white font-bold mb-1 text-sm">Inspired?</p>
                <p className="text-white/70 text-xs mb-4">Get the kits to build similar projects in your school.</p>
                <Link to="/products" className="block text-center bg-white text-[#0b2545] font-bold px-4 py-2 rounded-xl text-sm hover:bg-cyan-50 transition-colors mb-2">
                  Shop Kits
                </Link>
                <Link to="/contact" className="block text-center border border-white/30 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors">
                  Get Consultation
                </Link>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-sm text-slate-400 mb-3">Have a project like this?</p>
                <Link to="/contact" className="flex items-center gap-2 text-sm text-amber-400 font-semibold hover:text-amber-300 transition-colors">
                  Submit Your Project <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Cpu, Monitor, Wrench, GraduationCap, Shield, Zap, Send,
  CheckCircle2, ChevronRight, Users, BookOpen, School,
  Layers, Brain, Wifi, Code, ArrowRight, TrendingUp,
  Calculator, Building2, MapPin, IndianRupee, Ruler,
  Lightbulb, Target, Package, ClipboardCheck
} from "lucide-react";
import { submitContact } from "../services/contactService";
import SEO from "../components/SEO";

/* ================================================================
   RECOMMENDATION ENGINE — DATA & LOGIC
   ================================================================ */

const focusAreas = [
  { id: "robotics", label: "Robotics", icon: Cpu, color: "cyan", desc: "Arduino, motors, chassis, sensor kits" },
  { id: "ai", label: "AI & ML", icon: Brain, color: "violet", desc: "Camera modules, edge computing, TensorFlow" },
  { id: "iot", label: "IoT", icon: Wifi, color: "emerald", desc: "ESP32, cloud dashboards, smart sensors" },
  { id: "coding", label: "Coding", icon: Code, color: "amber", desc: "Python, Scratch, block programming" },
];

const gradeOptions = [
  { id: "1-5", label: "Grade 1–5", tag: "Primary" },
  { id: "6-8", label: "Grade 6–8", tag: "Middle" },
  { id: "9-12", label: "Grade 9–12", tag: "Senior" },
];

const budgetRanges = [
  { id: "low", label: "₹2L – ₹5L", min: 200000, max: 500000, tag: "Starter" },
  { id: "mid", label: "₹5L – ₹12L", min: 500000, max: 1200000, tag: "Standard" },
  { id: "high", label: "₹12L – ₹25L", min: 1200000, max: 2500000, tag: "Premium" },
  { id: "atl", label: "₹20L+ (ATL)", min: 2000000, max: 5000000, tag: "ATL Grant" },
];

const roomSizes = [
  { id: "small", label: "< 400 sq ft", sqft: 350, tag: "Compact" },
  { id: "medium", label: "400 – 800 sq ft", sqft: 600, tag: "Standard" },
  { id: "large", label: "800 – 1200 sq ft", sqft: 1000, tag: "Spacious" },
  { id: "xlarge", label: "1200+ sq ft", sqft: 1400, tag: "Large Hall" },
];

// Recommendation engine
function generateRecommendation({ students, grades, room, budget, focus }) {
  // Determine lab type
  let labType = "Robotics Starter Lab";
  let labTier = "starter";
  if (budget === "atl") { labType = "Atal Tinkering Lab (ATL)"; labTier = "atl"; }
  else if (budget === "high") { labType = "Advanced STEM Innovation Lab"; labTier = "premium"; }
  else if (budget === "mid") { labType = "Standard Robotics Lab"; labTier = "standard"; }

  // Curriculum level
  let curriculumLevel = "Foundation (Block Coding + Basic Electronics)";
  if (grades.includes("9-12")) curriculumLevel = "Advanced (Python, ML, PCB Design, IoT Projects)";
  else if (grades.includes("6-8")) curriculumLevel = "Intermediate (Arduino C++, Sensor Integration, App Inventor)";

  // Kit recommendations based on focus + budget
  const kitsMap = {
    robotics: {
      starter: [
        { name: "RoboLearn Arduino Starter Kit", qty: Math.ceil(students / 2), price: "₹2,500/kit" },
        { name: "Line-Following Robot Chassis Pack", qty: Math.ceil(students / 4), price: "₹1,800/set" },
        { name: "Basic Sensor Module Bundle (IR, Ultrasonic)", qty: Math.ceil(students / 2), price: "₹900/set" },
      ],
      standard: [
        { name: "RoboLearn Arduino Advanced Kit", qty: Math.ceil(students / 2), price: "₹4,200/kit" },
        { name: "Servo Motor & Gripper Arm Pack", qty: Math.ceil(students / 3), price: "₹3,500/set" },
        { name: "Multi-Sensor Module Bundle", qty: Math.ceil(students / 2), price: "₹1,600/set" },
        { name: "Competition-Grade Chassis Kit", qty: Math.ceil(students / 4), price: "₹5,200/set" },
      ],
      premium: [
        { name: "RoboLearn Pro Robotics Kit (Arduino + RPi)", qty: Math.ceil(students / 2), price: "₹7,800/kit" },
        { name: "6-DOF Robotic Arm Kit", qty: Math.ceil(students / 6), price: "₹12,000/unit" },
        { name: "Autonomous Navigation Module", qty: Math.ceil(students / 4), price: "₹6,500/set" },
        { name: "3D Printer (Entry-Level FDM)", qty: 1, price: "₹28,000/unit" },
        { name: "Soldering Station & Multimeter Set", qty: Math.ceil(students / 6), price: "₹3,200/set" },
      ],
      atl: [
        { name: "ATL STEM Innovation Kit Bundle (P1-P3)", qty: "10–20 Sets", price: "NITI Aayog Listed" },
        { name: "DIY 3D Printer + Filaments", qty: "1 Unit", price: "₹45,000" },
        { name: "Industrial Soldering + PCB Fabrication Station", qty: "2 Units", price: "₹18,000/unit" },
        { name: "Drone Assembly Kit", qty: Math.ceil(students / 8), price: "₹9,500/kit" },
        { name: "CNC Mini Engraver", qty: "1 Unit", price: "₹35,000" },
      ],
    },
    ai: {
      starter: [
        { name: "ESP32-CAM Module Kit", qty: Math.ceil(students / 3), price: "₹1,200/unit" },
        { name: "Pre-loaded AI Activity Cards", qty: 1, price: "₹4,500/pack" },
      ],
      standard: [
        { name: "ESP32-CAM + Edge AI Module", qty: Math.ceil(students / 2), price: "₹2,800/kit" },
        { name: "Raspberry Pi 4B Starter Pack", qty: Math.ceil(students / 4), price: "₹6,200/unit" },
        { name: "Machine Learning Project Cards", qty: 1, price: "₹3,800/pack" },
      ],
      premium: [
        { name: "Nvidia Jetson Nano Developer Kit", qty: Math.ceil(students / 6), price: "₹14,500/unit" },
        { name: "Raspberry Pi 4B (8GB) Cluster Pack", qty: Math.ceil(students / 4), price: "₹7,500/unit" },
        { name: "Computer Vision Camera Array", qty: Math.ceil(students / 6), price: "₹4,200/set" },
        { name: "AI Model Training Workstation License", qty: 1, price: "₹22,000/yr" },
      ],
      atl: [
        { name: "AI & ML Complete Lab Module", qty: "1 Set", price: "NITI Aayog Listed" },
        { name: "Jetson Nano + RPi Cluster", qty: "6 Units", price: "₹85,000" },
        { name: "Smart Vision & NLP Project Kit", qty: "4 Sets", price: "₹12,000/set" },
      ],
    },
    iot: {
      starter: [
        { name: "ESP32 IoT Starter Kit", qty: Math.ceil(students / 2), price: "₹1,500/kit" },
        { name: "DHT11/DHT22 Sensor Pack", qty: Math.ceil(students / 2), price: "₹600/set" },
      ],
      standard: [
        { name: "ESP32 Advanced IoT Kit", qty: Math.ceil(students / 2), price: "₹3,200/kit" },
        { name: "Cloud Dashboard License (Blynk/ThingSpeak)", qty: 1, price: "₹8,000/yr" },
        { name: "Smart Home Automation Module", qty: Math.ceil(students / 4), price: "₹2,800/set" },
      ],
      premium: [
        { name: "Industrial IoT Gateway Kit", qty: Math.ceil(students / 4), price: "₹5,500/kit" },
        { name: "LoRa WAN Communication Module", qty: Math.ceil(students / 6), price: "₹3,800/unit" },
        { name: "Solar-Powered Weather Station Kit", qty: 2, price: "₹7,200/unit" },
        { name: "MQTT & Node-RED Server License", qty: 1, price: "₹12,000/yr" },
      ],
      atl: [
        { name: "ATL IoT Innovation Bundle", qty: "1 Set", price: "NITI Aayog Listed" },
        { name: "Smart City Model Kit", qty: "2 Units", price: "₹15,000/unit" },
        { name: "Environmental Monitoring Cluster", qty: "4 Units", price: "₹6,500/unit" },
      ],
    },
    coding: {
      starter: [
        { name: "Scratch + Block Coding License", qty: "Unlimited", price: "Free (Open Source)" },
        { name: "micro:bit Starter Pack", qty: Math.ceil(students / 2), price: "₹2,400/unit" },
      ],
      standard: [
        { name: "Python Learning Workstation Setup", qty: Math.ceil(students / 2), price: "₹3,000/seat" },
        { name: "micro:bit Advanced + App Inventor", qty: Math.ceil(students / 2), price: "₹3,800/unit" },
        { name: "Competitive Coding Platform License", qty: 1, price: "₹6,500/yr" },
      ],
      premium: [
        { name: "Full-Stack Development Workstation", qty: Math.ceil(students / 3), price: "₹5,200/seat" },
        { name: "Raspberry Pi Coding Lab Pack", qty: Math.ceil(students / 3), price: "₹6,200/unit" },
        { name: "GitHub Education + VS Code Licenses", qty: "Unlimited", price: "Free (Education)" },
        { name: "Competitive Programming Training Module", qty: 1, price: "₹8,000/yr" },
      ],
      atl: [
        { name: "ATL Coding & Innovation Lab Module", qty: "1 Set", price: "NITI Aayog Listed" },
        { name: "Raspberry Pi 4B Cluster (20 units)", qty: "1 Cluster", price: "₹1,20,000" },
        { name: "Coding Bootcamp Curriculum Pack", qty: 1, price: "₹15,000" },
      ],
    },
  };

  const kits = kitsMap[focus]?.[labTier] || kitsMap.robotics[labTier];

  // Workstation capacity
  const maxStudentsInRoom = room === "small" ? 20 : room === "medium" ? 35 : room === "large" ? 50 : 80;
  const workstations = Math.min(Math.ceil(students / 2), Math.floor(maxStudentsInRoom / 2));

  // Teacher training hours
  let trainingHours = 16;
  if (labTier === "standard") trainingHours = 24;
  if (labTier === "premium") trainingHours = 40;
  if (labTier === "atl") trainingHours = 60;

  // Additional requirements
  const requirements = [
    `${workstations} workstations with power outlets & USB hubs`,
    "Dedicated 15A power line with MCB protection",
    "Ventilation system / exhaust fan (for soldering areas)",
    labTier !== "starter" ? "Wall-mounted instructional charts & safety posters" : null,
    labTier === "premium" || labTier === "atl" ? "Fire extinguisher (ABC type) & first-aid kit" : null,
    labTier === "atl" ? "CCTV monitoring (NITI Aayog compliance)" : null,
    "Lockable storage cabinet for kits & components",
    "Whiteboard / Smartboard for demonstrations",
  ].filter(Boolean);

  // Budget warning
  const budgetObj = budgetRanges.find(b => b.id === budget);
  const roomObj = roomSizes.find(r => r.id === room);
  let warnings = [];
  if (students > maxStudentsInRoom) {
    warnings.push(`Your room can comfortably hold ~${maxStudentsInRoom} students. Consider batching ${students} students into multiple sessions.`);
  }

  return { labType, labTier, curriculumLevel, kits, workstations, trainingHours, requirements, warnings, maxStudentsInRoom };
}

/* ================================================================
   COMPONENT
   ================================================================ */

export default function LabPlanner() {
  // Form states
  const [students, setStudents] = useState(30);
  const [selectedGrades, setSelectedGrades] = useState(["6-8"]);
  const [room, setRoom] = useState("medium");
  const [budget, setBudget] = useState("mid");
  const [focus, setFocus] = useState("robotics");

  // Proposal form
  const [showProposal, setShowProposal] = useState(false);
  const [proposalForm, setProposalForm] = useState({ name: "", email: "", phone: "", schoolName: "", city: "", message: "" });
  const [proposalLoading, setProposalLoading] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [proposalError, setProposalError] = useState("");

  // Step tracking
  const [currentStep, setCurrentStep] = useState(1);

  const toggleGrade = (id) => {
    setSelectedGrades(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const recommendation = useMemo(
    () => generateRecommendation({ students, grades: selectedGrades, room, budget, focus }),
    [students, selectedGrades, room, budget, focus]
  );

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    setProposalLoading(true);
    setProposalError("");
    try {
      await submitContact({
        ...proposalForm,
        type: "lab_planner_proposal",
        message: `[Lab Planner Proposal]\nLab Type: ${recommendation.labType}\nStudents: ${students}\nGrades: ${selectedGrades.join(", ")}\nRoom: ${room}\nBudget: ${budget}\nFocus: ${focus}\n\nAdditional Notes: ${proposalForm.message}`
      });
      setProposalSuccess(true);
    } catch {
      setProposalError("Something went wrong. Please try again.");
    } finally {
      setProposalLoading(false);
    }
  };

  const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors text-sm bg-white";

  const sectionBg = (step) => currentStep >= step ? "opacity-100" : "opacity-50 pointer-events-none";

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <SEO
        title="Interactive Robotics Lab Planner | RoboLearn"
        description="Plan your school's robotics lab — select students, grades, room size, budget & focus area. Get instant recommendations for lab type, kits, curriculum and requirements."
        path="/lab-planner"
      />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse-dot { 0%,100% { transform: scale(1); } 50% { transform: scale(1.5); } }
        .anim-fadeup { animation: fadeUp .6s ease both; }
        .anim-slidein { animation: slideIn .5s ease both; }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 22px; width: 22px; border-radius: 50%; background: #0b2545; cursor: pointer; border: 3px solid #06b6d4; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
        input[type=range]::-moz-range-thumb { height: 20px; width: 20px; border-radius: 50%; background: #0b2545; cursor: pointer; border: 3px solid #06b6d4; }
        @media (prefers-reduced-motion: reduce) { .anim-fadeup, .anim-slidein, .pulse-dot { animation: none !important; } }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2545] via-[#13315c] to-[#0b2545] pt-28 pb-20 lg:pt-32 lg:pb-24">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

        <div className="relative max-w-5xl mx-auto px-6 text-center anim-fadeup">
          <span className="inline-flex items-center gap-2 bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" />
            Interactive Lab Configurator
          </span>
          <h1 className="mt-7 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-white">
            Plan Your School's <span className="text-cyan-400">STEM Lab</span> in Minutes
          </h1>
          <p className="mt-5 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tell us about your school — we'll instantly recommend the right lab type, kits, curriculum level, and infrastructure requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-slate-400">
            {[
              { icon: Target, label: "Smart Recommendations" },
              { icon: Calculator, label: "Instant Estimates" },
              { icon: ClipboardCheck, label: "Custom Proposals" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <Icon size={14} className="text-cyan-400" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONFIGURATOR ============ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Step Progress */}
          <div className="flex items-center justify-center gap-0 mb-14">
            {["School Details", "Focus Area", "Your Lab Plan"].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  currentStep > i + 1 ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                  currentStep === i + 1 ? "bg-[#0b2545] text-white shadow-md" :
                  "bg-slate-100 text-slate-400 border border-slate-200"
                }`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    currentStep > i + 1 ? "bg-emerald-500 text-white" :
                    currentStep === i + 1 ? "bg-cyan-400 text-[#0b2545]" :
                    "bg-slate-200 text-slate-500"
                  }`}>
                    {currentStep > i + 1 ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{step}</span>
                </div>
                {i < 2 && <ChevronRight size={16} className="mx-2 text-slate-300" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">

            {/* LEFT — Configuration Controls */}
            <div className="space-y-10">

              {/* STEP 1: School Details */}
              <div className={`space-y-8 transition-opacity duration-300 ${sectionBg(1)}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-[#0b2545] text-white rounded-lg flex items-center justify-center text-xs font-black">1</div>
                  <h3 className="text-lg font-bold text-[#0b2545]">School Details</h3>
                </div>

                {/* Number of Students */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold text-[#0b2545] uppercase tracking-wider flex items-center gap-1.5">
                      <Users size={14} className="text-cyan-500" /> Number of Students
                    </label>
                    <span className="bg-[#0b2545] text-cyan-400 text-sm font-bold px-3 py-1 rounded-full">
                      {students} Students
                    </span>
                  </div>
                  <input
                    type="range" min="10" max="120" step="5" value={students}
                    onChange={(e) => setStudents(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2">
                    <span>10</span><span>40</span><span>80</span><span>120</span>
                  </div>
                </div>

                {/* Grade Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-cyan-500" /> Target Grades
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {gradeOptions.map((g) => (
                      <button key={g.id} onClick={() => toggleGrade(g.id)}
                        className={`p-3 border rounded-xl text-center transition-all duration-200 ${
                          selectedGrades.includes(g.id)
                            ? "border-cyan-500 bg-cyan-50 ring-1 ring-cyan-400"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}>
                        <span className={`block text-sm font-bold ${selectedGrades.includes(g.id) ? "text-cyan-700" : "text-[#0b2545]"}`}>{g.label}</span>
                        <span className={`block text-[10px] mt-0.5 ${selectedGrades.includes(g.id) ? "text-cyan-500" : "text-slate-400"}`}>{g.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Room Size */}
                <div>
                  <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Ruler size={14} className="text-cyan-500" /> Available Room Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {roomSizes.map((r) => (
                      <button key={r.id} onClick={() => setRoom(r.id)}
                        className={`p-3 border rounded-xl text-center transition-all duration-200 ${
                          room === r.id
                            ? "border-cyan-500 bg-cyan-50 ring-1 ring-cyan-400"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}>
                        <span className={`block text-xs font-bold ${room === r.id ? "text-cyan-700" : "text-[#0b2545]"}`}>{r.label}</span>
                        <span className={`block text-[10px] mt-0.5 ${room === r.id ? "text-cyan-500" : "text-slate-400"}`}>{r.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <IndianRupee size={14} className="text-cyan-500" /> Budget Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {budgetRanges.map((b) => (
                      <button key={b.id} onClick={() => { setBudget(b.id); setCurrentStep(Math.max(currentStep, 2)); }}
                        className={`p-3 border rounded-xl text-left transition-all duration-200 ${
                          budget === b.id
                            ? "border-cyan-500 bg-cyan-50 ring-1 ring-cyan-400"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}>
                        <span className={`block text-sm font-bold ${budget === b.id ? "text-cyan-700" : "text-[#0b2545]"}`}>{b.label}</span>
                        <span className={`block text-[10px] mt-0.5 ${budget === b.id ? "text-cyan-500" : "text-slate-400"}`}>{b.tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* STEP 2: Focus Area */}
              <div className={`transition-opacity duration-300 ${sectionBg(2)}`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${currentStep >= 2 ? "bg-[#0b2545] text-white" : "bg-slate-200 text-slate-500"}`}>2</div>
                  <h3 className={`text-lg font-bold ${currentStep >= 2 ? "text-[#0b2545]" : "text-slate-400"}`}>Focus Area</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {focusAreas.map((f) => (
                    <button key={f.id} onClick={() => { setFocus(f.id); setCurrentStep(3); }}
                      className={`flex flex-col text-left p-4 border rounded-2xl transition-all duration-200 group ${
                        focus === f.id
                          ? "border-cyan-500 bg-cyan-50 ring-1 ring-cyan-400 shadow-sm"
                          : "border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}>
                      <f.icon size={22} className={focus === f.id ? "text-cyan-600" : "text-slate-400 group-hover:text-slate-600"} />
                      <span className={`block text-sm font-bold mt-2.5 ${focus === f.id ? "text-cyan-700" : "text-[#0b2545]"}`}>{f.label}</span>
                      <span className={`block text-[10px] mt-1 leading-snug ${focus === f.id ? "text-cyan-500" : "text-slate-400"}`}>{f.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Recommendation Output */}
            <div className={`transition-opacity duration-500 ${sectionBg(3)}`}>
              <div className="sticky top-24 space-y-6">

                {/* Lab Recommendation Card */}
                <div className="bg-gradient-to-br from-[#0b2545] to-[#13315c] rounded-3xl p-6 text-white shadow-xl anim-fadeup">
                  <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Lightbulb size={13} /> Your Recommended Lab
                  </div>
                  <h2 className="text-xl font-bold leading-tight">{recommendation.labType}</h2>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                    Optimized for {students} students across {selectedGrades.map(g => gradeOptions.find(o => o.id === g)?.label).join(", ")} with {focusAreas.find(f => f.id === focus)?.label} focus.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="bg-white/10 rounded-xl p-3">
                      <span className="block text-[10px] text-slate-400 font-semibold">Workstations</span>
                      <span className="text-lg font-extrabold text-cyan-400">{recommendation.workstations}</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3">
                      <span className="block text-[10px] text-slate-400 font-semibold">Training Hours</span>
                      <span className="text-lg font-extrabold text-cyan-400">{recommendation.trainingHours}h</span>
                    </div>
                  </div>
                </div>

                {/* Curriculum Level */}
                <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-cyan-700 text-[10px] font-bold uppercase tracking-widest mb-2">
                    <BookOpen size={13} /> Curriculum Level
                  </div>
                  <p className="text-sm font-semibold text-cyan-900">{recommendation.curriculumLevel}</p>
                </div>

                {/* Suggested Kits */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#0b2545] text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Package size={13} className="text-cyan-500" /> Suggested Kits & Equipment
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {recommendation.kits.map((kit, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 gap-3 anim-slidein" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-slate-700 block truncate">{kit.name}</span>
                          <span className="text-slate-400 text-[10px]">{kit.price}</span>
                        </div>
                        <span className="bg-[#0b2545] text-cyan-400 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                          ×{kit.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-[#0b2545] text-[10px] font-bold uppercase tracking-widest mb-3">
                    <ClipboardCheck size={13} className="text-cyan-500" /> Infrastructure Requirements
                  </div>
                  <div className="space-y-2">
                    {recommendation.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warnings */}
                {recommendation.warnings.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                    {recommendation.warnings.map((w, i) => (
                      <p key={i} className="text-xs text-red-600 font-medium">{w}</p>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => setShowProposal(true)}
                  className="w-full bg-[#0b2545] hover:bg-cyan-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg text-sm"
                >
                  <Send size={16} /> Request Custom Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROPOSAL MODAL ============ */}
      {showProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => !proposalLoading && setShowProposal(false)}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl anim-fadeup" onClick={(e) => e.stopPropagation()}>
            {proposalSuccess ? (
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-5 border border-emerald-100">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-[#0b2545] mb-2">Proposal Request Received!</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Our lab setup team will prepare a customized proposal and contact you within 24 hours.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mt-5 text-xs text-left w-full space-y-1">
                  <div className="flex justify-between"><span className="text-slate-400">Lab Type:</span><span className="font-bold text-slate-700">{recommendation.labType}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Students:</span><span className="font-bold text-slate-700">{students}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Focus:</span><span className="font-bold text-slate-700">{focusAreas.find(f => f.id === focus)?.label}</span></div>
                </div>
                <button onClick={() => { setShowProposal(false); setProposalSuccess(false); }} className="mt-6 text-cyan-600 font-semibold text-sm hover:underline">Close</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#0b2545]">Request Custom Proposal</h3>
                    <p className="text-xs text-slate-400 mt-1">For: {recommendation.labType} ({students} students)</p>
                  </div>
                  <button onClick={() => setShowProposal(false)} className="text-slate-400 hover:text-slate-600 transition">✕</button>
                </div>
                <form onSubmit={handleProposalSubmit} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input name="name" required placeholder="Contact Person *" value={proposalForm.name} onChange={(e) => setProposalForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                    <input name="phone" required placeholder="Phone Number *" value={proposalForm.phone} onChange={(e) => setProposalForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
                  </div>
                  <input name="email" type="email" required placeholder="Email Address *" value={proposalForm.email} onChange={(e) => setProposalForm(p => ({ ...p, email: e.target.value }))} className={inputCls} />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input name="schoolName" required placeholder="School Name *" value={proposalForm.schoolName} onChange={(e) => setProposalForm(p => ({ ...p, schoolName: e.target.value }))} className={inputCls} />
                    <input name="city" placeholder="City" value={proposalForm.city} onChange={(e) => setProposalForm(p => ({ ...p, city: e.target.value }))} className={inputCls} />
                  </div>
                  <textarea name="message" rows={2} placeholder="Any special requirements or questions?" value={proposalForm.message} onChange={(e) => setProposalForm(p => ({ ...p, message: e.target.value }))} className={inputCls} />
                  {proposalError && <p className="text-red-500 text-xs font-semibold">{proposalError}</p>}
                  <button type="submit" disabled={proposalLoading}
                    className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md text-sm">
                    {proposalLoading ? "Submitting..." : <><Send size={15} /> Submit Proposal Request</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

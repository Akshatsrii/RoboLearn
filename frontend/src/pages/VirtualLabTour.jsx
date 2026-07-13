import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  X, ChevronRight, ChevronLeft, Play, Pause, ShoppingBag,
  BookOpen, Cpu, Monitor, Wifi, Shield, GraduationCap,
  Zap, Package, MapPin, ArrowRight, RotateCcw, Maximize2
} from "lucide-react";
import SEO from "../components/SEO";

/* ===================================================================
   HOTSPOT DATA
   =================================================================== */
const hotspots = [
  {
    id: "robotics-kits",
    label: "Robotics Kits Station",
    icon: Cpu,
    color: "cyan",
    x: 22, y: 38,
    description: "Complete Arduino & RPi robotics starter to advanced kits for hands-on building. Each station equipped for 2 students.",
    specs: ["Arduino Uno R3 + Mega 2560", "RPi 4B (4GB) modules", "Servo motor packs (6-DOF)", "Chassis, wheels, gripper arms"],
    grades: ["Grade 6–8", "Grade 9–12"],
    price: "₹2,500 – ₹7,800 / kit",
    productLink: "/products",
    curriculumLink: "/curriculum",
    badge: "Core Equipment",
  },
  {
    id: "controller-station",
    label: "Controller & Programming Hub",
    icon: Zap,
    color: "amber",
    x: 62, y: 25,
    description: "Central programming station with Arduino IDEs, Python environments, and Scratch for all grade levels.",
    specs: ["Arduino IDE + VS Code", "Python 3 + MicroPython", "Scratch 3.0 + MIT App Inventor", "Tinkercad Circuits (simulation)"],
    grades: ["Grade 1–5", "Grade 6–8", "Grade 9–12"],
    price: "Included in lab setup",
    productLink: "/lab-setup",
    curriculumLink: "/curriculum",
    badge: "Software Stack",
  },
  {
    id: "sensor-shelf",
    label: "Sensor Array Shelf",
    icon: Wifi,
    color: "emerald",
    x: 80, y: 42,
    description: "Wall-mounted sensor library with 30+ sensor types for IoT, robotics, and environmental monitoring projects.",
    specs: ["Ultrasonic (HC-SR04)", "IR Obstacle & Line sensors", "DHT22 Temp/Humidity", "PIR Motion, Gas, Sound sensors", "ESP32 WiFi + BLE modules"],
    grades: ["Grade 6–8", "Grade 9–12"],
    price: "₹900 – ₹3,200 / bundle",
    productLink: "/products",
    curriculumLink: "/curriculum",
    badge: "30+ Sensor Types",
  },
  {
    id: "student-pcs",
    label: "Student Coding Workstations",
    icon: Monitor,
    color: "violet",
    x: 42, y: 55,
    description: "Individual coding stations — each PC pre-configured with all STEM software, simulators, and cloud-based IDEs.",
    specs: ["Core i5 / Ryzen 5 PCs", "21\" Full HD monitors", "Pre-loaded STEM software suite", "Cloud IDE access (Google Colab, Tinkercad)", "Local file server for project saves"],
    grades: ["Grade 1–5", "Grade 6–8", "Grade 9–12"],
    price: "₹28,000 – ₹45,000 / station",
    productLink: "/lab-setup",
    curriculumLink: "/curriculum",
    badge: "Per-Student Stations",
  },
  {
    id: "robot-arena",
    label: "Demo Robot Arena",
    icon: Package,
    color: "rose",
    x: 45, y: 72,
    description: "Central competition-grade arena floor for robot testing, line-following, maze solving, and battle competitions.",
    specs: ["4m × 3m anti-static mat", "Line-following track (3 difficulties)", "Maze modular walls (50 pieces)", "Sumo ring marking", "Overhead camera mount for AI vision projects"],
    grades: ["Grade 6–8", "Grade 9–12"],
    price: "Included in premium packages",
    productLink: "/lab-setup",
    curriculumLink: "/curriculum",
    badge: "Competition Ready",
  },
  {
    id: "curriculum-wall",
    label: "Curriculum Resource Wall",
    icon: BookOpen,
    color: "sky",
    x: 20, y: 60,
    description: "Interactive display wall with project sheets, circuit diagrams, grade-wise curriculum posters, and milestone trackers.",
    specs: ["Grade 1–12 curriculum wall charts", "Project reference cards (laminated)", "Milestone tracker boards", "Smart TV (55\") for instructor demos", "Digital resource QR codes"],
    grades: ["Grade 1–5", "Grade 6–8", "Grade 9–12"],
    price: "Included in all packages",
    productLink: "/curriculum",
    curriculumLink: "/curriculum",
    badge: "All Grades",
  },
  {
    id: "safety-zone",
    label: "Safety & First Aid Zone",
    icon: Shield,
    color: "orange",
    x: 76, y: 70,
    description: "Dedicated safety corner with fire safety equipment, first aid, soldering safety guidelines, and ESD protection.",
    specs: ["ABC Fire extinguisher", "First Aid kit (OSHA standard)", "ESD wrist straps + mats", "Safety goggles cabinet (30 pairs)", "Emergency power cut-off switch"],
    grades: ["All grades"],
    price: "Mandatory — included in all setups",
    productLink: "/lab-setup",
    curriculumLink: null,
    badge: "Safety Compliant",
  },
  {
    id: "teachers-desk",
    label: "Teacher's Control Desk",
    icon: GraduationCap,
    color: "indigo",
    x: 55, y: 38,
    description: "Instructor station with multi-display control, screen sharing to all student PCs, and lab management software.",
    specs: ["Dual 27\" monitor setup", "Screen share to all stations", "Digital attendance & progress tracking", "Lab management software (LMS integrated)", "Overhead projector control"],
    grades: ["Instructor"],
    price: "Included in all packages",
    productLink: "/training",
    curriculumLink: "/training",
    badge: "Instructor Station",
  },
];

/* Color map */
const colorMap = {
  cyan:    { dot: "#22d3ee", ring: "rgba(34,211,238,0.35)", bg: "bg-cyan-50",    border: "border-cyan-200",  text: "text-cyan-700",    badge: "bg-cyan-100 text-cyan-800"  },
  amber:   { dot: "#f59e0b", ring: "rgba(245,158,11,0.35)",  bg: "bg-amber-50",   border: "border-amber-200", text: "text-amber-700",   badge: "bg-amber-100 text-amber-800" },
  emerald: { dot: "#10b981", ring: "rgba(16,185,129,0.35)",  bg: "bg-emerald-50", border: "border-emerald-200",text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800"},
  violet:  { dot: "#8b5cf6", ring: "rgba(139,92,246,0.35)",  bg: "bg-violet-50",  border: "border-violet-200", text: "text-violet-700",  badge: "bg-violet-100 text-violet-800"},
  rose:    { dot: "#f43f5e", ring: "rgba(244,63,94,0.35)",   bg: "bg-rose-50",    border: "border-rose-200",   text: "text-rose-700",    badge: "bg-rose-100 text-rose-800"  },
  sky:     { dot: "#0ea5e9", ring: "rgba(14,165,233,0.35)",  bg: "bg-sky-50",     border: "border-sky-200",    text: "text-sky-700",     badge: "bg-sky-100 text-sky-800"    },
  orange:  { dot: "#f97316", ring: "rgba(249,115,22,0.35)",  bg: "bg-orange-50",  border: "border-orange-200", text: "text-orange-700",  badge: "bg-orange-100 text-orange-800"},
  indigo:  { dot: "#6366f1", ring: "rgba(99,102,241,0.35)",  bg: "bg-indigo-50",  border: "border-indigo-200", text: "text-indigo-700",  badge: "bg-indigo-100 text-indigo-800"},
};

/* ===================================================================
   ISOMETRIC LAB SVG SCENE
   =================================================================== */
function LabScene({ activeId, onHotspotClick, isFullscreen }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 800);
    return () => clearInterval(id);
  }, []);

  const screenBlink = tick % 2 === 0;
  const screenBlink2 = tick % 3 === 0;
  const robotArm = (tick % 4) * 5; // 0,5,10,15

  return (
    <div className="relative w-full h-full select-none" style={{ minHeight: 440 }}>
      {/* ---- Background Grid ---- */}
      <svg viewBox="0 0 900 520" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="0.8"/>
          </pattern>
          <radialGradient id="roomGrad" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#0f1e38"/>
            <stop offset="100%" stopColor="#060e1d"/>
          </radialGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d1f3c"/>
            <stop offset="100%" stopColor="#091630"/>
          </linearGradient>
          <linearGradient id="wallTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#112244"/>
            <stop offset="100%" stopColor="#0d1a36"/>
          </linearGradient>
          <linearGradient id="wallRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0c1830"/>
            <stop offset="100%" stopColor="#091428"/>
          </linearGradient>
          <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a5f"/>
            <stop offset="100%" stopColor="#152d4a"/>
          </linearGradient>
          <linearGradient id="ledBar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0"/>
            <stop offset="20%" stopColor="#22d3ee"/>
            <stop offset="80%" stopColor="#818cf8"/>
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Room background */}
        <rect width="900" height="520" fill="url(#roomGrad)"/>
        <rect width="900" height="520" fill="url(#grid)"/>

        {/* Ambient ceiling light beams */}
        <ellipse cx="450" cy="100" rx="320" ry="60" fill="rgba(34,211,238,0.04)" filter="url(#glow)"/>
        <ellipse cx="450" cy="100" rx="180" ry="30" fill="rgba(99,102,241,0.06)" filter="url(#glow)"/>

        {/* ---- FLOOR AREA ---- */}
        <rect x="60" y="140" width="780" height="340" rx="4" fill="url(#floorGrad)" stroke="rgba(34,211,238,0.12)" strokeWidth="1.5"/>

        {/* Floor grid lines */}
        {[200,260,320,380,440,500,560,620,680,740].map(x => (
          <line key={x} x1={x} y1="140" x2={x} y2="480" stroke="rgba(148,163,184,0.07)" strokeWidth="1"/>
        ))}
        {[200,260,320,380,440].map(y => (
          <line key={y} x1="60" y1={y} x2="840" y2={y} stroke="rgba(148,163,184,0.07)" strokeWidth="1"/>
        ))}

        {/* LED ceiling strip */}
        <rect x="100" y="145" width="700" height="3" rx="2" fill="url(#ledBar)" opacity={screenBlink ? 1 : 0.7}/>

        {/* ===================== WALL BACK (top) ===================== */}
        <rect x="60" y="80" width="780" height="65" fill="url(#wallTop)" stroke="rgba(34,211,238,0.15)" strokeWidth="1"/>

        {/* Window on back wall */}
        <rect x="340" y="90" width="220" height="45" rx="3" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.25)" strokeWidth="1"/>
        <line x1="450" y1="90" x2="450" y2="135" stroke="rgba(34,211,238,0.2)" strokeWidth="1"/>
        <line x1="340" y1="112" x2="560" y2="112" stroke="rgba(34,211,238,0.2)" strokeWidth="1"/>
        {/* Window glow */}
        <ellipse cx="450" cy="112" rx="80" ry="18" fill="rgba(34,211,238,0.05)" filter="url(#glow)"/>

        {/* RoboLearn logo sign on wall */}
        <rect x="120" y="90" width="150" height="40" rx="4" fill="rgba(11,37,69,0.8)" stroke="rgba(34,211,238,0.4)" strokeWidth="1"/>
        <text x="195" y="107" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold" fontFamily="monospace">ROBOLEARN</text>
        <text x="195" y="121" textAnchor="middle" fill="rgba(34,211,238,0.6)" fontSize="7" fontFamily="monospace">INNOVATION LAB</text>

        {/* Safety poster on wall right */}
        <rect x="650" y="92" width="80" height="38" rx="3" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.4)" strokeWidth="1"/>
        <text x="690" y="108" textAnchor="middle" fill="#f97316" fontSize="7" fontWeight="bold">⚠ SAFETY</text>
        <text x="690" y="120" textAnchor="middle" fill="rgba(249,115,22,0.7)" fontSize="6">WEAR GOGGLES</text>

        {/* ===================== WORKSTATIONS — LEFT COLUMN ===================== */}
        {/* Robotics Kit Station */}
        <g>
          <rect x="80" y="165" width="130" height="80" rx="4" fill="url(#deskGrad)" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5"/>
          {/* Kit boxes stacked */}
          <rect x="90" y="175" width="40" height="28" rx="2" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.4)" strokeWidth="1"/>
          <rect x="94" y="179" width="32" height="4" rx="1" fill="rgba(34,211,238,0.5)"/>
          <rect x="90" y="205" width="40" height="20" rx="2" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.25)" strokeWidth="1"/>
          {/* Arduino board */}
          <rect x="140" y="178" width="55" height="35" rx="2" fill="rgba(0,100,50,0.6)" stroke="rgba(34,211,238,0.3)" strokeWidth="1"/>
          <rect x="145" y="183" width="8" height="6" rx="1" fill="rgba(34,211,238,0.8)"/>
          <rect x="157" y="183" width="4" height="4" rx="0.5" fill="rgba(255,180,0,0.9)"/>
          <rect x="165" y="183" width="4" height="4" rx="0.5" fill={screenBlink ? "rgba(34,211,238,1)" : "rgba(34,211,238,0.3)"}/>
          <rect x="145" y="193" width="45" height="3" rx="1" fill="rgba(34,211,238,0.15)"/>
          <rect x="145" y="198" width="35" height="3" rx="1" fill="rgba(34,211,238,0.1)"/>
          <text x="145" y="222" fill="rgba(34,211,238,0.6)" fontSize="6" fontFamily="monospace">ROBOTICS KITS</text>
        </g>

        {/* Curriculum Wall (left side) */}
        <g>
          <rect x="62" y="275" width="110" height="120" rx="3" fill="rgba(14,165,233,0.08)" stroke="rgba(14,165,233,0.3)" strokeWidth="1.5"/>
          {/* Curriculum posters */}
          {[0,1,2].map(i => (
            <rect key={i} x={74} y={285 + i*36} width="88" height="28" rx="2" fill={`rgba(14,165,233,${0.08 + i*0.04})`} stroke="rgba(14,165,233,0.2)" strokeWidth="0.8"/>
          ))}
          <text x="118" y="300" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6.5" fontWeight="bold">GRADE 1–5</text>
          <text x="118" y="336" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6.5" fontWeight="bold">GRADE 6–8</text>
          <text x="118" y="372" textAnchor="middle" fill="rgba(14,165,233,0.7)" fontSize="6.5" fontWeight="bold">GRADE 9–12</text>
          <text x="118" y="405" textAnchor="middle" fill="rgba(14,165,233,0.5)" fontSize="6">CURRICULUM BOARD</text>
        </g>

        {/* ===================== TEACHER DESK — CENTER ===================== */}
        <g>
          <rect x="320" y="170" width="200" height="90" rx="6" fill="rgba(17,34,64,0.95)" stroke="rgba(99,102,241,0.5)" strokeWidth="2"/>
          {/* Dual monitors */}
          <rect x="335" y="178" width="70" height="48" rx="3" fill="rgba(0,0,0,0.8)" stroke="rgba(99,102,241,0.5)" strokeWidth="1"/>
          <rect x="337" y="180" width="66" height="40" rx="2" fill={screenBlink2 ? "rgba(99,102,241,0.25)" : "rgba(99,102,241,0.15)"}/>
          <text x="370" y="196" textAnchor="middle" fill="rgba(99,102,241,0.9)" fontSize="5.5" fontFamily="monospace">TEACHER CTRL</text>
          <text x="370" y="205" textAnchor="middle" fill="rgba(99,102,241,0.6)" fontSize="5">LAB DASHBOARD</text>
          <text x="370" y="214" textAnchor="middle" fill={screenBlink ? "rgba(34,211,238,0.9)" : "rgba(34,211,238,0.4)"} fontSize="5">● LIVE SESSION</text>

          <rect x="415" y="178" width="90" height="48" rx="3" fill="rgba(0,0,0,0.8)" stroke="rgba(99,102,241,0.4)" strokeWidth="1"/>
          <rect x="417" y="180" width="86" height="40" rx="2" fill="rgba(17,34,64,0.9)"/>
          {[0,1,2,3,4].map(i => (
            <rect key={i} x={422} y={183 + i*7} width={screenBlink2 ? 76-i*8 : 70-i*5} height="4" rx="1" fill={`rgba(99,102,241,${0.3+i*0.06})`}/>
          ))}

          {/* Keyboard */}
          <rect x="340" y="230" width="170" height="18" rx="3" fill="rgba(30,58,95,0.8)" stroke="rgba(99,102,241,0.2)" strokeWidth="1"/>
          {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
            <rect key={i} x={345+i*14} y={233} width="10" height="10" rx="1.5" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5"/>
          ))}
          <text x="420" y="267" textAnchor="middle" fill="rgba(99,102,241,0.5)" fontSize="6">TEACHER'S CONTROL DESK</text>
        </g>

        {/* ===================== STUDENT PC STATIONS ===================== */}
        {[
          { x: 260, y: 280 },
          { x: 360, y: 280 },
          { x: 460, y: 280 },
          { x: 560, y: 280 },
        ].map((pos, i) => (
          <g key={i}>
            <rect x={pos.x} y={pos.y} width="80" height="60" rx="3" fill="rgba(17,34,64,0.85)" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
            {/* Monitor */}
            <rect x={pos.x+5} y={pos.y+4} width="70" height="42" rx="2" fill="rgba(0,0,0,0.9)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8"/>
            <rect x={pos.x+7} y={pos.y+6} width="66" height="36" rx="1" fill={`rgba(${i===0?'34,211,238':i===1?'139,92,246':i===2?'16,185,129':'245,158,11'},${(tick+i)%3===0?0.2:0.12})`}/>
            {/* Code lines */}
            {[0,1,2].map(l => (
              <rect key={l} x={pos.x+12} y={pos.y+11+l*9} width={30+Math.sin(tick+i+l)*15} height="3" rx="1" fill="rgba(255,255,255,0.12)"/>
            ))}
            {/* Power LED */}
            <circle cx={pos.x+72} cy={pos.y+50} r="2" fill={(tick+i)%3===0?"#22d3ee":"rgba(34,211,238,0.3)"}/>
          </g>
        ))}
        <text x="430" y="355" textAnchor="middle" fill="rgba(139,92,246,0.5)" fontSize="6">STUDENT CODING WORKSTATIONS</text>

        {/* ===================== ROBOT ARENA (center floor) ===================== */}
        <g>
          {/* Arena mat */}
          <ellipse cx="450" cy="430" rx="160" ry="50" fill="rgba(30,20,60,0.9)" stroke="rgba(244,63,94,0.4)" strokeWidth="2"/>
          <ellipse cx="450" cy="430" rx="140" ry="42" fill="rgba(20,10,45,0.8)" stroke="rgba(244,63,94,0.2)" strokeWidth="1"/>
          {/* Line following track */}
          <ellipse cx="450" cy="430" rx="100" ry="30" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeDasharray="8 4"/>
          {/* Robot on track */}
          <g transform={`translate(${450 + Math.cos((tick*0.4)*Math.PI/2)*90}, ${430 + Math.sin((tick*0.4)*Math.PI/2)*27})`}>
            <rect x="-10" y="-8" width="20" height="14" rx="3" fill="#1e3a5f" stroke="rgba(244,63,94,0.9)" strokeWidth="1.5"/>
            <circle cx="-7" cy="6" r="3" fill="rgba(244,63,94,0.8)"/>
            <circle cx="7" cy="6" r="3" fill="rgba(244,63,94,0.8)"/>
            <circle cx="0" cy="-5" r="2" fill={tick%2===0?"rgba(34,211,238,1)":"rgba(34,211,238,0.3)"} filter="url(#glow)"/>
          </g>
          {/* Sumo ring inner */}
          <circle cx="450" cy="430" r="18" fill="none" stroke="rgba(244,63,94,0.3)" strokeWidth="1"/>
          <text x="450" y="478" textAnchor="middle" fill="rgba(244,63,94,0.6)" fontSize="7">DEMO ROBOT ARENA</text>
        </g>

        {/* ===================== SENSOR SHELF — RIGHT WALL ===================== */}
        <g>
          <rect x="740" y="165" width="100" height="200" rx="3" fill="rgba(17,34,64,0.9)" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5"/>
          {/* Shelf boards */}
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <rect x="744" y={172+i*36} width="92" height="22" rx="2" fill="rgba(16,185,129,0.07)" stroke="rgba(16,185,129,0.15)" strokeWidth="0.8"/>
              {/* Sensor modules */}
              {[0,1,2,3].map(j => (
                <rect key={j} x={748+j*22} y={175+i*36} width="16" height="14" rx="1.5"
                  fill={`rgba(${i===0?'34,211,238':i===1?'16,185,129':i===2?'245,158,11':i===3?'139,92,246':'249,115,22'},0.2)`}
                  stroke={`rgba(${i===0?'34,211,238':i===1?'16,185,129':i===2?'245,158,11':i===3?'139,92,246':'249,115,22'},0.5)`}
                  strokeWidth="0.8"/>
              ))}
              <rect x="744" y={193+i*36} width="92" height="1.5" fill="rgba(16,185,129,0.3)"/>
            </g>
          ))}
          <text x="790" y="375" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="6">SENSOR ARRAY</text>
        </g>

        {/* ===================== SAFETY ZONE — BOTTOM RIGHT ===================== */}
        <g>
          <rect x="700" y="390" width="130" height="85" rx="4" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.35)" strokeWidth="1.5" strokeDasharray="6 3"/>
          {/* Fire extinguisher */}
          <rect x="718" y="400" width="16" height="36" rx="4" fill="#f97316" opacity="0.9"/>
          <rect x="720" y="397" width="12" height="6" rx="2" fill="#fb923c"/>
          <rect x="726" y="394" width="4" height="4" rx="1" fill="#fdba74"/>
          {/* First aid box */}
          <rect x="750" y="405" width="32" height="26" rx="3" fill="rgba(239,68,68,0.7)" stroke="rgba(239,68,68,0.5)" strokeWidth="1"/>
          <text x="766" y="420" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">+</text>
          {/* Goggles */}
          <ellipse cx="808" cy="416" rx="14" ry="8" fill="rgba(249,115,22,0.2)" stroke="rgba(249,115,22,0.5)" strokeWidth="1"/>
          <ellipse cx="808" cy="416" rx="8" ry="5" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth="1"/>
          <text x="765" y="460" textAnchor="middle" fill="rgba(249,115,22,0.6)" fontSize="6.5">⚠ SAFETY ZONE</text>
        </g>

        {/* ===================== CONTROLLER HUB — TOP RIGHT ===================== */}
        <g>
          <rect x="620" y="165" width="115" height="80" rx="4" fill="rgba(17,34,64,0.9)" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5"/>
          {/* Oscilloscope */}
          <rect x="630" y="173" width="55" height="36" rx="3" fill="rgba(0,0,0,0.9)" stroke="rgba(245,158,11,0.4)" strokeWidth="1"/>
          <rect x="632" y="175" width="51" height="28" rx="1" fill="#001800"/>
          {/* Wave */}
          <polyline
            points={`633,189 638,${184+Math.sin(tick)*3} 643,189 648,${194+Math.sin(tick+1)*3} 653,189 658,${184+Math.sin(tick+2)*3} 663,189 668,${194+Math.sin(tick+3)*3} 673,189 678,${184+Math.sin(tick+4)*3} 683,189`}
            fill="none" stroke="#00ff41" strokeWidth="1.5"/>
          {/* Raspberry Pi */}
          <rect x="694" y="173" width="34" height="26" rx="2" fill="rgba(100,30,80,0.8)" stroke="rgba(245,158,11,0.3)" strokeWidth="1"/>
          <rect x="697" y="176" width="5" height="5" rx="0.5" fill="rgba(245,158,11,0.8)"/>
          <rect x="706" y="176" width="5" height="5" rx="0.5" fill="rgba(34,211,238,0.6)"/>
          <rect x="697" y="185" width="28" height="3" rx="1" fill="rgba(245,158,11,0.15)"/>
          <text x="675" y="224" textAnchor="middle" fill="rgba(245,158,11,0.55)" fontSize="6">CONTROLLER HUB</text>
        </g>

        {/* ===================== ROBOT ARM (animated) ===================== */}
        <g transform={`translate(480, 195) rotate(${robotArm - 8})`}>
          <rect x="-4" y="-40" width="8" height="40" rx="2" fill="#1e3a5f" stroke="rgba(34,211,238,0.5)" strokeWidth="1"/>
          <rect x="-3" y="-65" width="6" height="28" rx="1.5" fill="#152d4a" stroke="rgba(34,211,238,0.4)" strokeWidth="1" transform={`rotate(${-robotArm * 1.5} 0 -40)`}/>
          <circle cx="0" cy="-40" r="4" fill="rgba(34,211,238,0.9)" filter="url(#glow)"/>
          <circle cx="0" cy="-65" r="3" fill="rgba(34,211,238,0.6)"/>
          <circle cx="0" cy="0" r="6" fill="rgba(17,34,64,0.9)" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5"/>
        </g>

        {/* ===================== HOTSPOT OVERLAYS ===================== */}
        {hotspots.map((h) => {
          const cx = 60 + (h.x / 100) * 780;
          const cy = 140 + (h.y / 100) * 340;
          const c = colorMap[h.color];
          const isActive = activeId === h.id;

          return (
            <g key={h.id} onClick={() => onHotspotClick(h.id)} style={{ cursor: "pointer" }}>
              {/* Outer pulsing ring */}
              <circle cx={cx} cy={cy} r={isActive ? 22 : 16}
                fill="none"
                stroke={c.dot}
                strokeWidth={isActive ? 2 : 1.5}
                opacity={isActive ? 0.9 : 0.5}
                style={{ transition: "all 0.3s ease" }}
              />
              {/* Mid ring */}
              <circle cx={cx} cy={cy} r={isActive ? 14 : 10}
                fill={`rgba(${c.dot.slice(1).match(/../g).map(h => parseInt(h, 16)).join(',')},0.15)`}
                stroke={c.dot}
                strokeWidth="1"
                opacity={isActive ? 1 : 0.7}
              />
              {/* Center dot */}
              <circle cx={cx} cy={cy} r={isActive ? 6 : 4}
                fill={c.dot}
                filter="url(#strongGlow)"
                opacity={isActive ? 1 : 0.85}
              />
              {/* Label pill */}
              {isActive && (
                <g>
                  <rect x={cx - 52} y={cy - 32} width="104" height="16" rx="8"
                    fill="rgba(6,14,29,0.92)" stroke={c.dot} strokeWidth="1"/>
                  <text x={cx} y={cy - 21} textAnchor="middle" fill={c.dot} fontSize="7.5" fontWeight="bold">{h.label}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ===================================================================
   INFO PANEL
   =================================================================== */
function InfoPanel({ hotspot, onClose, onPrev, onNext, currentIdx, total }) {
  if (!hotspot) return null;
  const c = colorMap[hotspot.color];
  const Icon = hotspot.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`px-5 py-4 flex items-start justify-between border-b ${c.border} ${c.bg}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={c.text}/>
          </div>
          <div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge} mb-1 inline-block`}>{hotspot.badge}</span>
            <h3 className="font-bold text-[#0b2545] text-sm leading-tight">{hotspot.label}</h3>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100 flex-shrink-0 ml-2">
          <X size={16}/>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-sm">
        <p className="text-slate-600 leading-relaxed text-xs">{hotspot.description}</p>

        {/* Specs */}
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Includes / Specs</p>
          <ul className="space-y-1.5">
            {hotspot.specs.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.text.replace("text-", "bg-")}`}/>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Grade tags */}
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Grade Level</p>
          <div className="flex flex-wrap gap-1.5">
            {hotspot.grades.map(g => (
              <span key={g} className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${c.badge}`}>{g}</span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className={`rounded-xl p-3 border ${c.border} ${c.bg}`}>
          <p className="text-xs font-bold text-slate-500 mb-0.5">Estimated Price</p>
          <p className={`font-bold text-sm ${c.text}`}>{hotspot.price}</p>
        </div>
      </div>

      {/* Footer CTAs */}
      <div className="px-5 py-4 border-t border-slate-100 space-y-2">
        <div className="flex gap-2">
          <Link to={hotspot.productLink}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold bg-[#0b2545] text-white py-2.5 rounded-xl hover:bg-cyan-700 transition-colors">
            <ShoppingBag size={13}/> View Products
          </Link>
          {hotspot.curriculumLink && (
            <Link to={hotspot.curriculumLink}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold border ${c.border} ${c.text} py-2.5 rounded-xl hover:${c.bg} transition-colors`}>
              <BookOpen size={13}/> Curriculum
            </Link>
          )}
        </div>
        <Link to="/contact"
          className="flex w-full items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 py-2 rounded-xl hover:text-slate-700 transition-colors">
          Book a Lab Consultation <ArrowRight size={12}/>
        </Link>

        {/* Nav arrows */}
        <div className="flex items-center justify-between pt-1">
          <button onClick={onPrev} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition">
            <ChevronLeft size={14}/> Prev
          </button>
          <span className="text-xs text-slate-400">{currentIdx + 1} / {total}</span>
          <button onClick={onNext} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition">
            Next <ChevronRight size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===================================================================
   MAIN PAGE
   =================================================================== */
export default function VirtualLabTour() {
  const [activeId, setActiveId] = useState(null);
  const [isTourMode, setIsTourMode] = useState(false);
  const [tourIdx, setTourIdx] = useState(0);
  const tourRef = useRef(null);

  const activeHotspot = hotspots.find(h => h.id === activeId) ?? null;
  const activeIdx = hotspots.findIndex(h => h.id === activeId);

  /* Tour mode auto-cycle */
  useEffect(() => {
    if (!isTourMode) { clearInterval(tourRef.current); return; }
    setActiveId(hotspots[tourIdx].id);
    tourRef.current = setInterval(() => {
      setTourIdx(i => {
        const next = (i + 1) % hotspots.length;
        setActiveId(hotspots[next].id);
        return next;
      });
    }, 4000);
    return () => clearInterval(tourRef.current);
  }, [isTourMode, tourIdx]);

  const handleHotspotClick = useCallback((id) => {
    if (isTourMode) { setIsTourMode(false); clearInterval(tourRef.current); }
    setActiveId(prev => prev === id ? null : id);
  }, [isTourMode]);

  const handleClose = () => setActiveId(null);

  const handlePrev = () => {
    const prev = (activeIdx - 1 + hotspots.length) % hotspots.length;
    setActiveId(hotspots[prev].id);
  };
  const handleNext = () => {
    const next = (activeIdx + 1) % hotspots.length;
    setActiveId(hotspots[next].id);
  };

  const startTour = () => {
    setTourIdx(0);
    setIsTourMode(true);
  };
  const stopTour = () => {
    setIsTourMode(false);
    clearInterval(tourRef.current);
  };

  return (
    <>
      <SEO
        title="Virtual Robotics Lab Tour | RoboLearn"
        description="Explore our STEM robotics lab in an immersive interactive tour. Click hotspots to discover kits, sensors, workstations, and safety zones."
      />
      <style>{`
        @keyframes hotspotPulse {
          0%,100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.4); opacity: 0.3; }
        }
        @keyframes heroSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes panelSlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scanLine {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .hero-anim { animation: heroSlide 0.6s ease both; }
        .panel-anim { animation: panelSlide 0.3s ease both; }
        .scan-line { animation: scanLine 4s linear infinite; }
        .tour-label-scroll {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lab-scroll::-webkit-scrollbar { width: 5px; }
        .lab-scroll::-webkit-scrollbar-thumb { background: rgba(11,37,69,0.2); border-radius: 999px; }
        @media (prefers-reduced-motion: reduce) {
          .hero-anim, .panel-anim { animation: none !important; }
        }
      `}</style>

      {/* ============ HERO HEADER ============ */}
      <section className="bg-[#060e1d] pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto hero-anim">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
            <ChevronRight size={12}/>
            <span className="text-cyan-400">Virtual Lab Tour</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/25 text-cyan-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
                LIVE INTERACTIVE TOUR
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                Virtual Robotics Lab <span className="text-cyan-400">Tour</span>
              </h1>
              <p className="text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
                Explore every corner of a fully-equipped STEM robotics lab. Click the glowing hotspots to discover equipment, pricing, and curriculum connections — or let Auto-Tour guide you through everything.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={isTourMode ? stopTour : startTour}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                  isTourMode
                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                    : "bg-cyan-400 hover:bg-cyan-500 text-[#060e1d]"
                }`}
              >
                {isTourMode ? <><Pause size={16}/> Stop Tour</> : <><Play size={16}/> Auto Tour</>}
              </button>
              <button
                onClick={() => { setActiveId(null); setIsTourMode(false); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition"
              >
                <RotateCcw size={15}/> Reset
              </button>
            </div>
          </div>

          {/* Tour progress bar */}
          {isTourMode && (
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-cyan-400 font-medium flex-shrink-0">
                {hotspots[tourIdx].label}
              </span>
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${((tourIdx + 1) / hotspots.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 flex-shrink-0">{tourIdx + 1}/{hotspots.length}</span>
            </div>
          )}
        </div>
      </section>

      {/* ============ MAIN LAB CANVAS ============ */}
      <section className="bg-[#060e1d] px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col xl:flex-row gap-4">

            {/* Lab View */}
            <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl" style={{ minHeight: 480 }}>
              {/* Scan line effect */}
              <div className="scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none z-10"/>

              {/* Corner labels */}
              <div className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur border border-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                <MapPin size={11} className="text-cyan-400"/>
                <span className="text-xs text-white/80 font-medium">RoboLearn STEM Lab · Floor Plan A</span>
              </div>
              <div className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur border border-white/10 rounded-lg px-2.5 py-1.5">
                <span className="text-xs text-cyan-400 font-medium font-mono">
                  {hotspots.length} ZONES MAPPED
                </span>
              </div>

              {/* Click hint */}
              {!activeId && !isTourMode && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur border border-white/10 rounded-full px-4 py-2">
                  <span className="text-xs text-white/60">✦ Click a glowing dot to explore</span>
                </div>
              )}

              <LabScene activeId={activeId} onHotspotClick={handleHotspotClick} />
            </div>

            {/* Info Panel */}
            <div className="xl:w-72 2xl:w-80 flex-shrink-0">
              {activeHotspot ? (
                <div className="panel-anim bg-white rounded-2xl border border-slate-200 shadow-xl h-full overflow-hidden" style={{ minHeight: 480 }}>
                  <InfoPanel
                    hotspot={activeHotspot}
                    onClose={handleClose}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    currentIdx={activeIdx}
                    total={hotspots.length}
                  />
                </div>
              ) : (
                <div className="bg-[#0d1a30] rounded-2xl border border-slate-700/50 h-full flex flex-col p-6" style={{ minHeight: 480 }}>
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center mb-4">
                      <Cpu size={28} className="text-cyan-400"/>
                    </div>
                    <h3 className="text-white font-bold mb-2">Explore the Lab</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      Click any glowing hotspot on the lab floor plan to see detailed info about equipment, pricing & curriculum links.
                    </p>
                    <button onClick={startTour}
                      className="flex items-center gap-2 bg-cyan-400 hover:bg-cyan-500 text-[#060e1d] font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-lg">
                      <Play size={14}/> Start Auto Tour
                    </button>
                  </div>

                  {/* Hotspot quick list */}
                  <div className="mt-6 space-y-1.5">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-2">Quick Access</p>
                    {hotspots.map((h) => {
                      const c = colorMap[h.color];
                      const Icon = h.icon;
                      return (
                        <button key={h.id} onClick={() => handleHotspotClick(h.id)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition text-left group">
                          <Icon size={13} className={c.text}/>
                          <span className="text-xs text-slate-400 group-hover:text-white transition tour-label-scroll flex-1">{h.label}</span>
                          <ChevronRight size={11} className="text-slate-600 group-hover:text-slate-400 transition flex-shrink-0"/>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="bg-[#060e1d] border-t border-slate-800 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Lab Zones Mapped", value: "8", sub: "Interactive Hotspots" },
              { label: "Equipment Categories", value: "30+", sub: "Kits, sensors, tools" },
              { label: "Grade Coverage", value: "1–12", sub: "All CBSE/ICSE grades" },
              { label: "Setup Time", value: "4–6 weeks", sub: "From order to ready lab" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-cyan-400">{s.value}</p>
                <p className="text-white font-semibold text-sm mt-0.5">{s.label}</p>
                <p className="text-slate-500 text-xs">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="bg-gradient-to-r from-cyan-600 to-[#0b2545] px-6 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white">Ready to build your school's robotics lab?</h2>
            <p className="text-cyan-200 text-sm mt-1">Get a custom proposal based on your grades, space, and budget in 24 hours.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/lab-planner"
              className="bg-white text-[#0b2545] font-bold px-5 py-3 rounded-xl text-sm hover:bg-cyan-50 transition shadow-lg whitespace-nowrap">
              Lab Planner →
            </Link>
            <Link to="/contact"
              className="bg-cyan-400 text-[#0b2545] font-bold px-5 py-3 rounded-xl text-sm hover:bg-cyan-300 transition shadow-lg whitespace-nowrap">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

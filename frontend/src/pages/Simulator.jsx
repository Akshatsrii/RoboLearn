import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play, RotateCcw, Cpu, Lightbulb, Thermometer,
  Radio, Zap, AlertTriangle, CheckCircle, ChevronRight
} from "lucide-react";
import SEO from "../components/SEO";

/* ============================================================
   PROJECT DATA
   ============================================================ */
const PROJECTS = [
  {
    id: "traffic",
    title: "Smart Traffic Light",
    grade: "Grade 3–5",
    category: "Electronics",
    description: "Program a 3-light LED traffic signal using timed sequences. Learn about algorithms and timing logic.",
    code: `// Smart Traffic Light
const redPin = 9, yellowPin = 10, greenPin = 11;

function setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

function loop() {
  digitalWrite(greenPin, HIGH);  // Green ON
  delay(5000);                   // Wait 5s
  digitalWrite(greenPin, LOW);
  digitalWrite(yellowPin, HIGH); // Yellow ON
  delay(2000);                   // Wait 2s
  digitalWrite(yellowPin, LOW);
  digitalWrite(redPin, HIGH);    // Red ON
  delay(5000);                   // Wait 5s
  digitalWrite(redPin, LOW);
}`,
    components: ["Arduino UNO", "3x LEDs", "3x 220Ω Resistors", "Breadboard", "Jumper Wires"],
    steps: [
      { label: "Wire up Red LED to Pin 9",   icon: Zap },
      { label: "Wire Yellow LED to Pin 10",  icon: Zap },
      { label: "Wire Green LED to Pin 11",   icon: Zap },
      { label: "Upload code to Arduino",     icon: Cpu },
      { label: "Test timing sequence",       icon: CheckCircle },
    ],
    simulation: "traffic",
  },
  {
    id: "temp",
    title: "Temperature Monitor",
    grade: "Grade 6–8",
    category: "IoT / Sensors",
    description: "Read DHT11 sensor data and display temperature/humidity on an LCD. Build your first IoT device.",
    code: `// Temperature & Humidity Monitor
#include <DHT.h>
#include <LiquidCrystal.h>

DHT dht(2, DHT11);
LiquidCrystal lcd(12,11,5,4,3,2);

void setup() {
  dht.begin();
  lcd.begin(16, 2);
  lcd.print("RoboLearn Temp");
}

void loop() {
  float temp = dht.readTemperature();
  float hum  = dht.readHumidity();
  lcd.setCursor(0, 1);
  lcd.print("T:");
  lcd.print(temp);
  lcd.print("C H:");
  lcd.print(hum);
  lcd.print("%");
  delay(2000);
}`,
    components: ["Arduino UNO", "DHT11 Sensor", "16x2 LCD", "10kΩ Potentiometer", "Breadboard"],
    steps: [
      { label: "Connect DHT11 data pin to Pin 2",  icon: Thermometer },
      { label: "Wire LCD RS, E, D4-D7 pins",       icon: Cpu },
      { label: "Add potentiometer for contrast",   icon: Radio },
      { label: "Install DHT & LCD libraries",      icon: Lightbulb },
      { label: "Upload and monitor readings",      icon: CheckCircle },
    ],
    simulation: "temp",
  },
  {
    id: "obstacle",
    title: "Obstacle Avoiding Robot",
    grade: "Grade 9–12",
    category: "Robotics",
    description: "Build an autonomous robot that detects and avoids obstacles using ultrasonic sensors and motor control.",
    code: `// Obstacle Avoiding Robot
#define TRIG 7
#define ECHO 6
#define IN1 2
#define IN2 3

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

long getDistance() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  return pulseIn(ECHO, HIGH) * 0.034 / 2;
}

void loop() {
  long dist = getDistance();
  if (dist < 20) {
    // Turn right
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    delay(500);
  } else {
    // Move forward
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, HIGH);
  }
}`,
    components: ["Arduino UNO", "HC-SR04 Ultrasonic", "L298N Motor Driver", "2x DC Motors", "Robot Chassis", "9V Battery"],
    steps: [
      { label: "Assemble robot chassis & motors", icon: Cpu },
      { label: "Connect L298N motor driver",      icon: Zap },
      { label: "Wire HC-SR04 to Pin 6 & 7",       icon: Radio },
      { label: "Test motor directions",            icon: CheckCircle },
      { label: "Upload and run autonomously",      icon: Play },
    ],
    simulation: "robot",
  },
];

/* ============================================================
   TRAFFIC LIGHT SIMULATION
   ============================================================ */
function TrafficSim({ running }) {
  const [phase, setPhase] = useState(0);
  const intervalRef = useRef(null);
  const durations = [2000, 800, 2000];
  const phases = [
    { color: "#22c55e", label: "GREEN — GO!" },
    { color: "#f59e0b", label: "YELLOW — SLOW" },
    { color: "#ef4444", label: "RED — STOP" },
  ];

  useEffect(() => {
    if (running) {
      let i = 0;
      setPhase(0);
      const tick = () => {
        i = (i + 1) % 3;
        setPhase(i);
      };
      intervalRef.current = setInterval(tick, 2000);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setPhase(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const current = phases[phase];
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="bg-gray-900 border-4 border-gray-700 rounded-2xl p-4 flex flex-col gap-3 w-20">
        {phases.map((p, i) => (
          <div key={i} className="w-10 h-10 rounded-full mx-auto transition-all duration-300"
            style={{ background: phase === i ? p.color : "#1f2937", boxShadow: phase === i ? `0 0 20px ${p.color}` : "none" }} />
        ))}
      </div>
      <span className="text-sm font-bold" style={{ color: current.color }}>{current.label}</span>
    </div>
  );
}

/* ============================================================
   TEMPERATURE SIMULATION
   ============================================================ */
function TempSim() {
  const [temp] = useState(28.4);
  const [hum]  = useState(62);
  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-xl p-4 font-mono text-sm w-60 mx-auto my-6">
      <div className="text-green-400 text-xs mb-2">LCD DISPLAY — 16×2</div>
      <div className="text-green-300 leading-relaxed">
        <div>RoboLearn Temp  </div>
        <div>T:{temp}°C H:{hum}%  </div>
      </div>
      <div className="mt-3 flex gap-4 text-xs">
        <span className="text-cyan-400">🌡 {temp}°C</span>
        <span className="text-blue-400">💧 {hum}%</span>
      </div>
    </div>
  );
}

/* ============================================================
   ROBOT SIMULATION
   ============================================================ */
function RobotSim({ running }) {
  const [robotX, setRobotX] = useState(5);
  const [turning, setTurning] = useState(false);
  const obstacleX = 72;
  const ref = useRef(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setRobotX(x => {
          const dist = obstacleX - x;
          if (dist < 15) { setTurning(true); return x >= 90 ? 5 : x + 0.3; }
          setTurning(false);
          return x >= 90 ? 5 : x + 0.8;
        });
      }, 40);
    } else {
      clearInterval(ref.current);
      ref.current = null;
      setRobotX(5);
      setTurning(false);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden h-32 border-2 border-gray-700 my-4">
      <div className="absolute bottom-4 text-3xl transition-all duration-75" style={{ left: `${robotX}%` }}>
        {turning ? "🔄" : "🤖"}
      </div>
      <div className="absolute bottom-4 text-2xl" style={{ left: `${obstacleX}%` }}>🚧</div>
      <div className="absolute top-2 right-3 text-xs text-slate-500">
        Ultrasonic: {Math.max(0, Math.round(obstacleX - robotX))}cm
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700" />
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Simulator() {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [running, setRunning]     = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleProjectChange = useCallback((proj) => {
    setRunning(false);
    setActiveProject(proj);
    setActiveTab("overview");
  }, []);

  const renderSim = () => {
    if (activeProject.simulation === "traffic") return <TrafficSim running={running} />;
    if (activeProject.simulation === "temp")    return <TempSim />;
    if (activeProject.simulation === "robot")   return <RobotSim running={running} />;
    return null;
  };

  return (
    <>
      <SEO
        title="Virtual Project Playground | RoboLearn"
        description="Explore interactive robotics project simulations for grades 3–12. Try traffic lights, temperature sensors, and obstacle-avoiding robots in your browser."
      />
      <div className="min-h-screen bg-gradient-to-br from-[#040d1a] via-[#071428] to-[#040d1a] text-white">

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative pt-28 pb-12 px-6 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-1/3 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Play size={14} /> Virtual Project Playground
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Try Projects{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                Before You Build
              </span>
            </h1>
            <p className="text-slate-400 text-lg">
              Run interactive simulations of real robotics projects — no hardware needed. Learn the code, see it in
              action, then build it in class.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">

          {/* ── Project Selector ──────────────────────────── */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {PROJECTS.map(proj => (
              <button key={proj.id} onClick={() => handleProjectChange(proj)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeProject.id === proj.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:border-violet-400/50"
                }`}
              >
                {proj.title}
                <span className="ml-2 text-xs opacity-60">{proj.grade}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ── Left: Info ────────────────────────────────── */}
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-bold text-violet-400 bg-violet-400/10 px-2 py-1 rounded-full">{activeProject.grade}</span>
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">{activeProject.category}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">{activeProject.title}</h2>
                <p className="text-slate-400 text-sm">{activeProject.description}</p>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                {["overview", "code", "steps"].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                      activeTab === tab ? "bg-violet-600 text-white" : "bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}>{tab}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2"><Cpu size={16} className="text-cyan-400" /> Components Needed</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {activeProject.components.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <ChevronRight size={12} className="text-violet-400" />{c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "code" && (
                <div className="bg-gray-950 border border-white/10 rounded-2xl p-5 overflow-auto max-h-72">
                  <pre className="text-green-300 text-xs leading-relaxed whitespace-pre-wrap">{activeProject.code}</pre>
                </div>
              )}

              {activeTab === "steps" && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                  {activeProject.steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-violet-400">{i + 1}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Icon size={13} className="text-violet-400" />{step.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── Right: Simulator ──────────────────────────── */}
            <div className="space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2"><Play size={16} className="text-violet-400" /> Live Simulator</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setRunning(r => !r)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                        running
                          ? "bg-red-500/20 border border-red-500/30 text-red-400"
                          : "bg-violet-600 text-white hover:bg-violet-700"
                      }`}>
                      {running ? <AlertTriangle size={14} /> : <Play size={14} />}
                      {running ? "Stop" : "Run"}
                    </button>
                    <button onClick={() => setRunning(false)}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors">
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>
                {renderSim()}
                {!running && (
                  <p className="text-center text-slate-500 text-sm mt-2">
                    Press <span className="text-violet-400 font-semibold">Run</span> to start the simulation
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl p-6">
                <p className="text-white font-bold mb-1">Want to build this for real?</p>
                <p className="text-white/70 text-sm mb-4">Order the kit and get this project in your school lab.</p>
                <div className="flex gap-3">
                  <Link to="/products" className="bg-white text-[#0b2545] font-bold px-5 py-2 rounded-xl text-sm hover:bg-cyan-50 transition-colors">Shop Kits</Link>
                  <Link to="/contact" className="border border-white/30 text-white px-5 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors">Get Consultation</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

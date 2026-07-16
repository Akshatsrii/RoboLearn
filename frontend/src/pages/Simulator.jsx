import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Play, RotateCcw, Cpu, Lightbulb, Thermometer,
  Radio, Zap, AlertTriangle, CheckCircle, ChevronRight,
  Plus, Trash2, ArrowRight
} from "lucide-react";
import SEO from "../components/SEO";

// Available components for students to add
const SPARE_COMPONENTS = [
  { id: "arduino", name: "Arduino Uno", icon: Cpu, desc: "Microcontroller board" },
  { id: "led", name: "Red LED", icon: Lightbulb, desc: "Light Emitting Diode" },
  { id: "motor", name: "DC Motor", icon: Zap, desc: "Rotational actuator" },
  { id: "ultrasonic", name: "Ultrasonic Sensor", icon: Radio, desc: "HC-SR04 distance sensor" },
];

export default function Simulator() {
  const [workspace, setWorkspace] = useState(["arduino"]); // start with arduino placed
  const [wired, setWired] = useState(false);
  const [running, setRunning] = useState(false);
  const [distance, setDistance] = useState(50); // distance slider for ultrasonic sensor
  const [codeType, setCodeType] = useState("blink");

  const addComponent = (id) => {
    if (workspace.includes(id)) return; // no duplicates for simplicity
    setWorkspace(prev => [...prev, id]);
  };

  const removeComponent = (id) => {
    if (id === "arduino") return; // keep arduino
    setWorkspace(prev => prev.filter(c => c !== id));
    setWired(false);
    setRunning(false);
  };

  const handleReset = () => {
    setWorkspace(["arduino"]);
    setWired(false);
    setRunning(false);
  };

  // Determine code based on selected logic
  const codeSnippet = useMemo(() => {
    if (codeType === "blink") {
      return `// LED Blink Logic
void setup() {
  pinMode(9, OUTPUT);
}
void loop() {
  digitalWrite(9, HIGH); // Turn LED ON
  delay(1000);
  digitalWrite(9, LOW);  // Turn LED OFF
  delay(1000);
}`;
    }
    if (codeType === "motor") {
      return `// Motor Speed Control
void setup() {
  pinMode(3, OUTPUT);
}
void loop() {
  analogWrite(3, 255); // Full Speed
  delay(3000);
  analogWrite(3, 0);   // Stop
  delay(2000);
}`;
    }
    return `// Ultrasonic Distance Alert
#define TRIG 7
#define ECHO 6
#define LED 9

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
}
void loop() {
  long dist = readDistance();
  if (dist < 20) {
    digitalWrite(LED, HIGH); // Danger Alert
  } else {
    digitalWrite(LED, LOW);
  }
}`;
  }, [codeType]);

  return (
    <>
      <SEO
        title="Virtual STEM Playground | RoboLearn"
        description="Build virtual circuits and test logical programs with Arduino, LEDs, motors, and ultrasonic sensors."
      />
      <div className="min-h-screen bg-slate-50 text-slate-900">

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative pt-28 pb-12 px-6 text-center bg-[#061B33]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 left-1/3 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Play size={14} /> Virtual Playground
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
              STEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Project Simulator</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Drag components onto the breadboard canvas, click "Wire Components" to connect them, and run your Arduino loop in real-time!
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6">

            {/* 1. COMPONENT DRAWER (Left) */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-[#0b2545] border-b border-slate-200 pb-2">Components Box</h3>
              <div className="space-y-3">
                {SPARE_COMPONENTS.map(comp => {
                  const Icon = comp.icon;
                  const placed = workspace.includes(comp.id);
                  return (
                    <button
                      key={comp.id}
                      onClick={() => addComponent(comp.id)}
                      disabled={placed}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                        placed
                          ? "bg-slate-50 border-dashed border-slate-200 opacity-50 cursor-not-allowed"
                          : "bg-slate-50 border-slate-200 hover:border-cyan-500/50 hover:bg-cyan-50/20 text-slate-700 cursor-pointer"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0b2545]">{comp.name}</p>
                        <p className="text-[10px] text-slate-500 leading-tight">{comp.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleReset}
                className="w-full mt-4 flex items-center justify-center gap-2 border border-slate-200 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                <RotateCcw size={12} /> Clear Board
              </button>
            </div>

            {/* 2. MAIN CANVAS & SIMULATION (Center) */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden min-h-[380px] flex flex-col justify-between shadow-sm">
                {/* Glow grids */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />

                {/* Header controls */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">BREADBOARD WORKSPACE</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWired(w => !w)}
                      disabled={workspace.length < 2}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        wired
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-[#0b2545] text-white hover:bg-cyan-600 disabled:opacity-40"
                      }`}
                    >
                      {wired ? "✓ Connected" : "Connect Wires"}
                    </button>
                    <button
                      onClick={() => setRunning(r => !r)}
                      disabled={!wired}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        running
                          ? "bg-rose-500 text-white shadow-md animate-pulse"
                          : "bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-40"
                      }`}
                    >
                      <Play size={12} />
                      {running ? "Running" : "Start Simulation"}
                    </button>
                  </div>
                </div>

                {/* Canvas grid visualization */}
                <div className="relative z-10 flex-1 my-6 border border-slate-800 bg-slate-950 rounded-2xl p-6 flex flex-wrap gap-4 items-center justify-center min-h-[220px]">
                  {/* Arduino Uno (static anchor) */}
                  <div className="bg-gradient-to-br from-cyan-900/60 to-cyan-800/40 border border-cyan-400/40 rounded-xl p-4 flex flex-col items-center relative w-28 text-center shadow-lg">
                    <Cpu className="text-cyan-300 mb-2" size={24} />
                    <span className="text-[10px] font-mono font-bold text-cyan-300">Arduino Uno</span>
                    {wired && <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                  </div>

                  {/* Dynamic placed components */}
                  {workspace.includes("led") && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col items-center relative w-24 text-center group shadow-md text-slate-100">
                      <button onClick={() => removeComponent("led")} className="absolute -top-1 -right-1 bg-red-500/20 border border-red-500/40 text-red-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={10} />
                      </button>
                      <Lightbulb className={`mb-2 transition-all duration-300 ${
                        running && wired && codeType === "blink"
                          ? "text-red-500 filter drop-shadow-[0_0_8px_#ef4444] scale-110"
                          : running && wired && codeType === "ultrasonic" && distance < 20
                          ? "text-red-500 filter drop-shadow-[0_0_12px_#ef4444] animate-ping"
                          : "text-slate-500"
                      }`} size={24} />
                      <span className="text-[10px] font-mono text-slate-300">Red LED</span>
                    </div>
                  )}

                  {workspace.includes("motor") && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col items-center relative w-24 text-center group shadow-md text-slate-100">
                      <button onClick={() => removeComponent("motor")} className="absolute -top-1 -right-1 bg-red-500/20 border border-red-500/40 text-red-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={10} />
                      </button>
                      <Zap className={`mb-2 transition-all duration-300 ${
                        running && wired && codeType === "motor"
                          ? "text-yellow-400 animate-spin"
                          : "text-slate-500"
                      }`} size={24} />
                      <span className="text-[10px] font-mono text-slate-300">DC Motor</span>
                    </div>
                  )}

                  {workspace.includes("ultrasonic") && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col items-center relative w-28 text-center group shadow-md text-slate-100">
                      <button onClick={() => removeComponent("ultrasonic")} className="absolute -top-1 -right-1 bg-red-500/20 border border-red-500/40 text-red-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={10} />
                      </button>
                      <Radio className={`mb-2 ${running && wired ? "text-violet-400" : "text-slate-500"}`} size={24} />
                      <span className="text-[10px] font-mono text-slate-300">Ultrasonic</span>
                    </div>
                  )}

                  {/* Wire graphics overlay */}
                  {wired && (
                    <div className="absolute inset-0 pointer-events-none border border-emerald-500/20 rounded-2xl flex items-center justify-center">
                      <span className="text-[10px] font-mono text-emerald-400/60 bg-[#091120] px-2 py-0.5 rounded border border-emerald-500/20">JUMPER LINES CONNECTED</span>
                    </div>
                  )}
                </div>

                {/* Ultrasonic sensor interactive distance trigger */}
                {workspace.includes("ultrasonic") && running && (
                  <div className="relative z-10 bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Ultrasonic Obstacle Distance:</span>
                      <span className={`font-bold font-mono ${distance < 20 ? "text-red-400" : "text-cyan-400"}`}>{distance} cm</span>
                    </div>
                    <input
                      type="range" min="5" max="100" value={distance}
                      onChange={e => setDistance(Number(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                    {distance < 20 && (
                      <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                        <AlertTriangle size={10} /> Logic Triggered: Red LED Danger blinking!
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 3. ARDUINO LOGIC SELECTOR & EDITOR (Right) */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-[#0b2545] border-b border-slate-200 pb-2">Program Selector</h3>
                
                {/* Selector */}
                <div className="space-y-2">
                  {[
                    { id: "blink", label: "LED Logic Control", icon: Lightbulb },
                    { id: "motor", label: "Motor Speed Control", icon: Zap },
                    { id: "ultrasonic", label: "Ultrasonic Distance Alert", icon: Radio },
                  ].map(prog => (
                    <button
                      key={prog.id}
                      onClick={() => { setCodeType(prog.id); setRunning(false); }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        codeType === prog.id
                          ? "bg-cyan-50 border-cyan-400 text-cyan-700 shadow-sm font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <prog.icon size={13} />
                      {prog.label}
                    </button>
                  ))}
                </div>

                {/* Code display */}
                <div className="mt-4">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Arduino C++ Code</p>
                  <pre className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-[10px] text-green-400 overflow-x-auto max-h-52 leading-relaxed whitespace-pre">
                    {codeSnippet}
                  </pre>
                </div>
              </div>

              {/* Inspiration */}
              <div className="bg-gradient-to-r from-[#0b2545] to-cyan-600 rounded-2xl p-4 mt-6">
                <p className="text-white font-bold text-xs mb-1">Want to build this for real?</p>
                <p className="text-white/70 text-[10px] mb-3">Order the kits to execute physical logic in class.</p>
                <div className="flex gap-2">
                  <Link to="/products" className="bg-white text-[#0b2545] font-bold px-3 py-1.5 rounded-lg text-[10px] hover:bg-cyan-50 transition-colors">Shop Kits</Link>
                  <Link to="/contact" className="border border-white/30 text-white px-3 py-1.5 rounded-lg text-[10px] hover:bg-white/10 transition-colors">Consultation</Link>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

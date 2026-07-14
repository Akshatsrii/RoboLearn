import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Brain, Cpu, GraduationCap, Code, ShieldCheck, Wifi, BookOpen, Layers } from "lucide-react";
import SEO from "../components/SEO";

/* ================================================================
   INTERACTIVE CURRICULUM EXPLORER DATA
   ================================================================ */
const EXPLORER_DATA = {
  "3-5": {
    label: "Grades 3–5 (Primary)",
    subjects: {
      coding: {
        label: "Coding",
        levels: {
          foundation: {
            label: "Foundation",
            modules: {
              blocks: {
                label: "Block Programming",
                projects: [
                  { name: "Scratch Storytelling", skills: "Scratch 3.0 + Sequencing + Logic Flow" },
                  { name: "Interactive Animation", skills: "Block Coding + Loops + Conditional Triggers" }
                ]
              }
            }
          }
        }
      },
      robotics: {
        label: "Robotics",
        levels: {
          foundation: {
            label: "Foundation",
            modules: {
              mechanics: {
                label: "Simple Mechanics",
                projects: [
                  { name: "Motorized Cable Car", skills: "Gears + Pulleys + Tension Forces" },
                  { name: "Gear-Driven Trash Bot", skills: "Motor control + Gear Ratios + Basic Wiring" }
                ]
              },
              circuits: {
                label: "Intro to Circuits",
                projects: [
                  { name: "Smart Traffic Light", skills: "LEDs + Resistors + Breadboard Layout" }
                ]
              }
            }
          }
        }
      }
    }
  },
  "6-8": {
    label: "Grades 6–8 (Middle School)",
    subjects: {
      robotics: {
        label: "Robotics",
        levels: {
          intermediate: {
            label: "Intermediate",
            modules: {
              sensors: {
                label: "Sensors",
                projects: [
                  { name: "Obstacle Avoiding Robot", skills: "Arduino + Logic + Electronics + Ultrasonic Sensing" },
                  { name: "Smart Waste Bin", skills: "Servo Motor + Ultrasonic Range Mapping + Arduino C++" }
                ]
              },
              actuators: {
                label: "Actuators & Controls",
                projects: [
                  { name: "Bluetooth RC Rover", skills: "DC Motor Shield + HC-05 serial control + C++ coding" }
                ]
              }
            }
          }
        }
      },
      iot: {
        label: "IoT",
        levels: {
          intermediate: {
            label: "Intermediate",
            modules: {
              telemetry: {
                label: "Telemetry",
                projects: [
                  { name: "Automated Plant Watering", skills: "Soil Moisture Sensor + Relays + Pump Control" }
                ]
              }
            }
          }
        }
      }
    }
  },
  "9-12": {
    label: "Grades 9–12 (High School)",
    subjects: {
      ai: {
        label: "AI & ML",
        levels: {
          advanced: {
            label: "Advanced",
            modules: {
              vision: {
                label: "Computer Vision",
                projects: [
                  { name: "Face-Recognition Gate Lock", skills: "Python + OpenCV + ESP32-CAM + Solenoid Locks" }
                ]
              },
              inference: {
                label: "Edge Inference",
                projects: [
                  { name: "Smart Attendance System", skills: "Raspberry Pi + CNN Models + Local Database" }
                ]
              }
            }
          }
        }
      },
      iot: {
        label: "IoT",
        levels: {
          advanced: {
            label: "Advanced",
            modules: {
              networking: {
                label: "Cloud Sync & Networking",
                projects: [
                  { name: "Weather Station Cloud Broker", skills: "ESP32 Wi-Fi + MQTT Broker + DHT22 Telemetry" }
                ]
              }
            }
          }
        }
      }
    }
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
  const [selectedGrade, setSelectedGrade] = useState("6-8");
  const [selectedSubject, setSelectedSubject] = useState("robotics");
  const [selectedLevel, setSelectedLevel] = useState("intermediate");
  const [selectedModule, setSelectedModule] = useState("sensors");

  // Dynamically resolve options based on selection tree
  const gradeData = EXPLORER_DATA[selectedGrade];
  
  // Safe subject fallback if current subject is not in selected grade
  const subjectKeys = Object.keys(gradeData.subjects);
  const activeSubjectKey = subjectKeys.includes(selectedSubject) ? selectedSubject : subjectKeys[0];
  const subjectData = gradeData.subjects[activeSubjectKey];

  // Safe level fallback
  const levelKeys = Object.keys(subjectData.levels);
  const activeLevelKey = levelKeys.includes(selectedLevel) ? selectedLevel : levelKeys[0];
  const levelData = subjectData.levels[activeLevelKey];

  // Safe module fallback
  const moduleKeys = Object.keys(levelData.modules);
  const activeModuleKey = moduleKeys.includes(selectedModule) ? selectedModule : moduleKeys[0];
  const moduleData = levelData.modules[activeModuleKey];

  const handleGradeChange = (gradeKey) => {
    setSelectedGrade(gradeKey);
    const subKeys = Object.keys(EXPLORER_DATA[gradeKey].subjects);
    const firstSub = subKeys[0];
    setSelectedSubject(firstSub);

    const lvlKeys = Object.keys(EXPLORER_DATA[gradeKey].subjects[firstSub].levels);
    const firstLvl = lvlKeys[0];
    setSelectedLevel(firstLvl);

    const modKeys = Object.keys(EXPLORER_DATA[gradeKey].subjects[firstSub].levels[firstLvl].modules);
    const firstMod = modKeys[0];
    setSelectedModule(firstMod);
  };

  const handleSubjectChange = (subKey) => {
    setSelectedSubject(subKey);
    const lvlKeys = Object.keys(gradeData.subjects[subKey].levels);
    const firstLvl = lvlKeys[0];
    setSelectedLevel(firstLvl);

    const modKeys = Object.keys(gradeData.subjects[subKey].levels[firstLvl].modules);
    const firstMod = modKeys[0];
    setSelectedModule(firstMod);
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen pt-20 pb-16">
      <SEO
        title="Interactive STEM & Robotics Curriculum"
        description="NEP 2020 and CBSE aligned grade-wise robotics syllabus for primary, middle, and senior high schools, with sample coding projects and hardware kit requirements."
        path="/curriculum"
      />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061225] via-[#0b2545] to-[#061225] py-20 lg:py-24 text-center">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-semibold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Curriculum Explorer
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white">
            Interactive <span className="text-cyan-400">Robotics Syllabus</span>
          </h1>
          <p className="mt-6 text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Select a Grade, Subject, Level, and Module below to instantly view corresponding student projects and skills learned.
          </p>
        </div>
      </section>

      {/* ============ INTERACTIVE CURRICULUM EXPLORER ============ */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-lg font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Layers size={18} /> Drill-Down Curriculum Board
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Step 1: Grade Selection */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">1. Select Grade</p>
              <div className="space-y-2">
                {Object.keys(EXPLORER_DATA).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleGradeChange(key)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-bold transition-all ${
                      selectedGrade === key
                        ? "bg-[#0b2545] border-cyan-400 text-white shadow-lg"
                        : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {EXPLORER_DATA[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Subject Selector */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">2. Select Subject</p>
              <div className="space-y-2">
                {Object.keys(gradeData.subjects).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSubjectChange(key)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-bold transition-all ${
                      activeSubjectKey === key
                        ? "bg-[#0b2545] border-cyan-400 text-white shadow-lg"
                        : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {gradeData.subjects[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Level & Module Selector */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">3. Level &amp; Modules</p>
              <div className="space-y-4">
                {/* Level Tag */}
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 text-center">
                  <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider">Level: {levelData.label}</span>
                </div>
                
                {/* Modules list */}
                <div className="space-y-2">
                  {Object.keys(levelData.modules).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedModule(key)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all ${
                        activeModuleKey === key
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md"
                          : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
                      }`}
                    >
                      {levelData.modules[key].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Output Project & Skills Learned */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:col-span-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">4. Suggested Projects</p>
              
              <div className="space-y-4">
                {moduleData.projects.map((proj, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-[#0b2545] to-[#123057] border border-cyan-400/20 rounded-xl p-4">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">Project</span>
                    <h4 className="font-extrabold text-sm text-white mb-2">{proj.name}</h4>
                    
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Skills Learned</span>
                    <p className="text-xs text-emerald-300 font-mono leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5">
                      {proj.skills}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-20 bg-black/20">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Structured Syllabus</span>
            <h2 className="mt-3 text-3xl font-bold text-white">Full-Suite Academic Curriculum Pack</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 text-white shadow-2xl">
            <h2 className="relative text-3xl font-bold">Bring STEM education to your school</h2>
            <p className="relative mt-4 text-cyan-50/90">Get a comprehensive curriculum catalog and arrange a free demonstration session for your teachers.</p>
            <Link to="/contact" className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors text-sm">
              Request Full Curriculum Pack <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

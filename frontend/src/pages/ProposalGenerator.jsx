import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Send, CheckCircle2, ChevronRight, Users,
  BookOpen, IndianRupee, Cpu, Wifi, Brain, Code, Calendar,
  ArrowRight, Download, Printer
} from "lucide-react";
import SEO from "../components/SEO";
import { submitContact } from "../services/contactService";

export default function ProposalGenerator() {
  const [formData, setFormData] = useState({
    schoolName: "",
    students: 150,
    grades: "6-8",
    focus: "robotics",
    budget: "mid",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const proposal = useMemo(() => {
    const { students, grades, focus, budget } = formData;
    
    // Lab Type
    let labType = "Robotics Starter Lab";
    let estCost = "₹3,50,000";
    if (budget === "atl") { labType = "Atal Tinkering Lab (ATL)"; estCost = "₹20,00,000 (Govt. Grant)"; }
    else if (budget === "high") { labType = "Advanced STEM Innovation Lab"; estCost = "₹14,50,000"; }
    else if (budget === "mid") { labType = "Standard Robotics Lab"; estCost = "₹7,50,000"; }

    // Training hours
    let trainingHours = "24 Hours";
    if (budget === "high") trainingHours = "40 Hours";
    else if (budget === "atl") trainingHours = "60 Hours";

    // Modules/Curriculum
    let modules = ["Intro to Circuits", "Block Programming", "Simple Chassis Construction"];
    if (grades === "6-8") modules = ["Arduino C++ Basics", "Ultrasonic Sensor Mapping", "Servo Actuation & Drivers"];
    else if (grades === "9-12") modules = ["Python Coding", "TensorFlow Lite Inference", "ESP32 Wi-Fi & MQTT Cloud Data"];

    return { labType, estCost, trainingHours, modules };
  }, [formData]);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact({
        name: "Principal Lead",
        schoolName: formData.schoolName,
        phone: "Submitted via Generator",
        email: "principal@school.edu",
        type: "proposal_lead",
        message: `[Personalized Proposal generated on site]\nLab Type: ${proposal.labType}\nGrades: ${formData.grades}\nFocus Area: ${formData.focus}\nEst. Budget: ${formData.estCost}`
      });
      setSubmitted(true);
    } catch {
      alert("Error sending request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Personalized Proposal Generator | RoboLearn"
        description="Principals can generate a customized, printable proposal for installing a STEM robotics lab in their school."
      />
      <div className="min-h-screen bg-slate-50 text-slate-900 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_1.3fr] gap-10">

          {/* Left Panel: Parameters Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 self-start shadow-md text-slate-800">
            <div>
              <span className="text-xs font-bold text-cyan-700 uppercase bg-cyan-100 px-3 py-1 rounded-full inline-block mb-3">Principal Configurator</span>
              <h1 className="text-2xl font-extrabold text-[#0b2545]">Generate Lab Proposal</h1>
              <p className="text-xs text-slate-500 mt-1">Configure your target capacity and focus to instantly render your proposal document.</p>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-4 text-slate-900">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">School Name</label>
                <input required value={formData.schoolName} onChange={e => setFormData(p => ({ ...p, schoolName: e.target.value }))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none" placeholder="e.g. Heritage School, Pune" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Students Count</label>
                  <input type="number" min={20} max={1200} value={formData.students} onChange={e => setFormData(p => ({ ...p, students: parseInt(e.target.value) || 100 }))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Target Grades</label>
                  <select value={formData.grades} onChange={e => setFormData(p => ({ ...p, grades: e.target.value }))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900">
                    <option value="3-5">Class 3–5</option>
                    <option value="6-8">Class 6–8</option>
                    <option value="9-12">Class 9–12</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Focus Area</label>
                  <select value={formData.focus} onChange={e => setFormData(p => ({ ...p, focus: e.target.value }))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900">
                    <option value="robotics">Robotics</option>
                    <option value="ai">AI &amp; ML</option>
                    <option value="iot">IoT</option>
                    <option value="coding">Coding</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Estimated Budget</label>
                  <select value={formData.budget} onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900">
                    <option value="low">₹2L – ₹5L</option>
                    <option value="mid">₹5L – ₹12L</option>
                    <option value="high">₹12L – ₹25L</option>
                    <option value="atl">₹20L+ (ATL Grant)</option>
                  </select>
                </div>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={13} /> Request Submitted Successfully!
                </div>
              ) : (
                <button type="submit" disabled={loading} className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-lg cursor-pointer">
                  <Send size={13} /> Request Official Proposal Signoff
                </button>
              )}
            </form>
          </div>

          {/* Right Panel: Rendered Proposal Document Preview */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative text-slate-800">
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button onClick={() => window.print()} className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer" title="Print Proposal">
                <Printer size={15} />
              </button>
            </div>

            {/* Document Header */}
            <div className="border-b border-slate-200 pb-5">
              <div className="flex items-center gap-2 text-cyan-600 font-mono text-[10px] font-bold tracking-wider mb-2">
                <FileText size={12} /> OFFICIAL LAB SPECIFICATION SHEET
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">{formData.schoolName || "[School Name Placeholder]"}</h2>
              <p className="text-xs text-slate-500 mt-1">Proposed by: RoboLearn Academic Setup Team · Date: July 2026</p>
            </div>

            {/* Document Content */}
            <div className="space-y-5 text-slate-600 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Recommended Lab Setup</span>
                <p className="text-sm font-extrabold text-[#0b2545] mt-0.5">{proposal.labType}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Est. Setup Investment Bracket: {proposal.estCost}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Curriculum &amp; Course Syllabus Modules</span>
                <div className="space-y-1">
                  {proposal.modules.map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2 rounded-lg text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Teacher Training Hour Allocation</span>
                  <p className="text-xs font-bold text-slate-800 mt-1">{proposal.trainingHours} (NITI Aligned)</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Deployment Timeline</span>
                  <p className="text-xs font-bold text-slate-800 mt-1">4–6 Weeks (End-to-End)</p>
                </div>
              </div>

              {/* Implementation timeline graphic */}
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-2">Implementation Roadmap</span>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-center"><span className="block font-bold text-cyan-600">W1</span>Procure</div>
                  <ChevronRight size={12} className="text-slate-400" />
                  <div className="text-center"><span className="block font-bold text-cyan-600">W2-3</span>Wiring</div>
                  <ChevronRight size={12} className="text-slate-400" />
                  <div className="text-center"><span className="block font-bold text-cyan-600">W4</span>Assembly</div>
                  <ChevronRight size={12} className="text-slate-400" />
                  <div className="text-center"><span className="block font-bold text-cyan-600">W5</span>Launch</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center text-[10px] text-slate-500 font-mono">
              System Generated Specifications · RoboLearn CRM Lead Registered
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

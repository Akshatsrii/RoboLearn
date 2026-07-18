import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { useAI } from "../ai/hooks/useAI";
import { aiService } from "../ai/services/aiService";
import { RoboticsConsultationResponseSchema, RoboticsConsultationResponse } from "../ai/schemas/consultantSchema";
import { compileConsultantPrompt, ROBOTICS_CONSULTANT_SYSTEM_PROMPT } from "../ai/prompts/templates";
import {
  Cpu, Users, GraduationCap, DollarSign, ShieldAlert,
  Calendar, Layers, CheckCircle2, AlertCircle, Play, Download, ArrowRight, Loader2, Sparkles, ChevronRight, HelpCircle
} from "lucide-react";
import SEO from "../components/SEO";

// Custom SVG Donut Chart for Budget allocation
function BudgetDonutChart({ breakdown }: { breakdown: any[] }) {
  let accumulatedPercent = 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const colors = ["#06b6d4", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-inner text-slate-100">
      <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
          {breakdown.map((item, idx) => {
            const strokeDash = (item.percentage / 100) * circumference;
            const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
            accumulatedPercent += item.percentage;
            const color = colors[idx % colors.length];

            return (
              <circle
                key={idx}
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth="14"
                strokeDasharray={`${strokeDash} ${circumference}`}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-300 hover:stroke-[16] cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
          <span className="text-sm font-extrabold text-white">100%</span>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {breakdown.map((item, idx) => {
          const color = colors[idx % colors.length];
          return (
            <div key={idx} className="flex items-start gap-3 bg-slate-950/40 rounded-xl p-3 border border-slate-800/40 hover:border-slate-700/60 transition-all">
              <span className="w-3.5 h-3.5 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: color }} />
              <div className="flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="text-xs font-semibold text-slate-200">{item.category}</p>
                  <span className="text-xs font-bold text-cyan-400">{item.percentage}%</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed mt-1">{item.description}</p>
                <p className="text-xs font-semibold text-emerald-400 mt-1">₹{item.amount.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AIConsultant() {
  const [formData, setFormData] = useState({
    schoolName: "",
    students: 150,
    teachers: 5,
    grades: "6-8",
    budget: "₹5L – ₹12L",
    existingLab: "No existing robotics setup. General computer lab only.",
    preferredCurriculum: "CBSE aligned STEM syllabus",
  });

  const aiFetcher = async (params: typeof formData) => {
    const compiledPrompt = compileConsultantPrompt(params);
    const result = await aiService.generateJSON<RoboticsConsultationResponse>(
      compiledPrompt,
      RoboticsConsultationResponseSchema,
      {
        systemInstruction: ROBOTICS_CONSULTANT_SYSTEM_PROMPT,
        temperature: 0.7,
      }
    );
    return result.data;
  };

  const { data, loading, error, execute } = useAI<RoboticsConsultationResponse, [typeof formData]>(aiFetcher);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(formData);
  };

  const downloadPDF = () => {
    if (!data) return;

    const doc = new jsPDF();
    
    // Header Panel
    doc.setFillColor(11, 37, 69);
    doc.rect(0, 0, 210, 42, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ROBOLEARN AI LAB PROPOSAL", 15, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 160, 25);
    
    // School Details
    doc.setTextColor(11, 37, 69);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Proposal Prepared For: ${formData.schoolName}`, 15, 55);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Target Grades: Class ${formData.grades} | Target Budget Bracket: ${formData.budget}`, 15, 63);
    doc.text(`Recommended Lab Type: ${data.recommendedLabType}`, 15, 70);
    
    // Executive Rationale
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary:", 15, 82);
    doc.setFont("helvetica", "normal");
    const rationaleLines = doc.splitTextToSize(data.rationale, 180);
    doc.text(rationaleLines, 15, 89);
    
    let currentY = 93 + rationaleLines.length * 5;
    
    // Equipment List Table
    doc.setFont("helvetica", "bold");
    doc.text("Recommended Equipment list:", 15, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setFillColor(241, 245, 249);
    doc.rect(15, currentY - 5, 180, 7, "F");
    doc.text("Item Name", 18, currentY);
    doc.text("Quantity", 115, currentY);
    doc.text("Estimated Cost", 145, currentY);
    currentY += 7;
    
    doc.setFont("helvetica", "normal");
    data.equipmentList.forEach((item) => {
      if (currentY > 270) {
        doc.addPage();
        currentY = 25;
      }
      doc.text(item.name, 18, currentY);
      doc.text(String(item.quantity), 115, currentY);
      doc.text(item.estimatedCost, 145, currentY);
      currentY += 6;
    });

    // Page 2
    doc.addPage();
    currentY = 25;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Curriculum Recommendation Plan:", 15, currentY);
    currentY += 7;
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Title: ${data.curriculumRecommendation.title}`, 15, currentY);
    currentY += 6;
    const currLines = doc.splitTextToSize(data.curriculumRecommendation.explanation, 180);
    doc.text(currLines, 15, currentY);
    currentY += currLines.length * 5 + 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("Core Learning Topics:", 15, currentY);
    currentY += 6;
    doc.setFont("helvetica", "normal");
    data.curriculumRecommendation.coreTopics.forEach((topic) => {
      doc.text(`- ${topic}`, 20, currentY);
      currentY += 5.5;
    });
    
    // Budget breakdown
    currentY += 6;
    if (currentY > 200) {
      doc.addPage();
      currentY = 25;
    }
    doc.setFont("helvetica", "bold");
    doc.text("Estimated Budget Allocation:", 15, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setFillColor(241, 245, 249);
    doc.rect(15, currentY - 5, 180, 7, "F");
    doc.text("Category", 18, currentY);
    doc.text("Percentage (%)", 120, currentY);
    doc.text("Amount (INR)", 150, currentY);
    currentY += 7;
    
    doc.setFont("helvetica", "normal");
    data.budgetBreakdown.forEach((item) => {
      doc.text(item.category, 18, currentY);
      doc.text(`${item.percentage}%`, 120, currentY);
      doc.text(`Rs. ${item.amount.toLocaleString()}`, 150, currentY);
      currentY += 6;
    });

    // Save
    doc.save(`${formData.schoolName.replace(/\s+/g, "_")}_Robotics_Proposal.pdf`);
  };

  return (
    <>
      <SEO
        title="AI Robotics Lab Consultant | RoboLearn"
        description="Design a custom, CBSE-compliant robotics lab setup recommendation for your school dynamically powered by AI."
      />
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* Header Title */}
          <div className="text-center mb-12 relative z-10">
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest bg-cyan-400/10 border border-cyan-400/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 animate-pulse">
              <Sparkles size={12} /> Enterprise AI Consultant
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none">
              AI Robotics & STEM Lab Consultant
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
              Answer a few configuration questions about your school to dynamically construct an optimized robotics setup proposal, full equipment checklists, budgets, teacher trainings, and download files.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-8 items-start relative z-10">
            {/* Input Config Form */}
            <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl text-slate-200">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Layers size={18} className="text-cyan-400" /> Lab Configuration
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">School Name</label>
                  <input
                    required
                    type="text"
                    value={formData.schoolName}
                    onChange={(e) => setFormData((p) => ({ ...p, schoolName: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none transition-all"
                    placeholder="e.g. Doon School, Dehradun"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Students</label>
                    <input
                      type="number"
                      min={10}
                      max={5000}
                      value={formData.students}
                      onChange={(e) => setFormData((p) => ({ ...p, students: parseInt(e.target.value) || 100 }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Teachers</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formData.teachers}
                      onChange={(e) => setFormData((p) => ({ ...p, teachers: parseInt(e.target.value) || 3 }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Target Grades</label>
                    <select
                      value={formData.grades}
                      onChange={(e) => setFormData((p) => ({ ...p, grades: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none"
                    >
                      <option value="1-5">Class 1–5</option>
                      <option value="6-8">Class 6–8</option>
                      <option value="9-12">Class 9–12</option>
                      <option value="1-12">Class 1–12 (Full K-12)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Approx. Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 outline-none"
                    >
                      <option value="₹2L – ₹5L">₹2L – ₹5L (Starter)</option>
                      <option value="₹5L – ₹12L">₹5L – ₹12L (Standard)</option>
                      <option value="₹12L – ₹25L">₹12L – ₹25L (Premium)</option>
                      <option value="₹20L (ATL Grant)">₹20L (Government Grant)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Existing Lab Status</label>
                  <textarea
                    rows={2}
                    value={formData.existingLab}
                    onChange={(e) => setFormData((p) => ({ ...p, existingLab: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="Describe any existing computers, spaces, or tools..."
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Preferred Board/Curriculum</label>
                  <input
                    type="text"
                    value={formData.preferredCurriculum}
                    onChange={(e) => setFormData((p) => ({ ...p, preferredCurriculum: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none"
                    placeholder="e.g. CBSE Aligned, ICSE Board, NEP-2020 Aligned"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-cyan-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Analyzing Requirements...
                    </>
                  ) : (
                    <>
                      Generate Proposal <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Recommendations Display */}
            <div className="min-h-[400px] flex flex-col justify-center">
              {!loading && !data && !error && (
                <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl p-10 text-center py-24">
                  <Cpu size={48} className="mx-auto text-slate-700 mb-4 animate-bounce" />
                  <h3 className="text-base font-bold text-slate-400">Waiting for Lab Parameters</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
                    Configure target student capacities, grades, and budgets on the left to activate our AI consultation parser.
                  </p>
                </div>
              )}

              {loading && (
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 text-center py-28 flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 animate-spin" />
                  </div>
                  <h3 className="text-base font-bold text-white">Structuring Proposal Parameters</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed animate-pulse">
                    Mapping equipment catalogs, calculating cost distributions, structuring lesson designs, and building proposal models.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center text-red-200">
                  <AlertCircle size={32} className="mx-auto text-red-400 mb-3" />
                  <h3 className="text-sm font-bold">Failed to generate recommendation</h3>
                  <p className="text-xs text-red-400/80 mt-1">{error.message}</p>
                </div>
              )}

              {data && !loading && (
                <div className="space-y-8 animate-[fadeIn_0.4s_ease]">
                  
                  {/* Executive Summary Card */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800/80 pb-5">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Recommended Setup</span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
                          <Cpu className="text-cyan-400" size={20} /> {data.recommendedLabType}
                        </h3>
                      </div>
                      <button
                        onClick={downloadPDF}
                        className="bg-slate-850 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold px-4 py-2.5 rounded-xl text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download size={13} /> Proposal PDF
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{data.rationale}</p>
                  </div>

                  {/* Budget breakdown charts */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block pl-1">Estimated Budget Breakdown</h3>
                    <BudgetDonutChart breakdown={data.budgetBreakdown} />
                  </div>

                  {/* Equipment checklist */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block pl-1">Hardware & Equipment List</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {data.equipmentList.map((item, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700/60 transition-all">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="text-xs font-bold text-white leading-tight">{item.name}</h4>
                              <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/10 px-2 py-0.5 rounded-full">
                                Qty: {item.quantity}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-normal mt-2">{item.purpose}</p>
                          </div>
                          <div className="border-t border-slate-800/40 mt-3 pt-3 flex justify-between items-center">
                            <span className="text-[10px] text-slate-500">Estimated Cost</span>
                            <span className="text-xs font-bold text-slate-200">{item.estimatedCost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Milestones */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block pl-1">Installation & Setup Timeline</h3>
                    <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6">
                      <div className="relative border-l-2 border-slate-800 ml-4 space-y-6">
                        {data.timeline.map((milestone, idx) => {
                          const isCurrent = milestone.status === "current";
                          const isCompleted = milestone.status === "completed";

                          return (
                            <div key={idx} className="relative pl-6">
                              {/* status node indicators */}
                              <span className={`absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                                isCompleted ? "bg-emerald-500 border-emerald-500 text-white" :
                                isCurrent ? "bg-cyan-500 border-cyan-500 text-white" :
                                "bg-slate-900 border-slate-850 text-slate-600"
                              }`}>
                                {isCompleted && <CheckCircle2 size={10} />}
                              </span>

                              <div>
                                <span className={`text-[9px] font-bold uppercase tracking-wider ${
                                  isCompleted ? "text-emerald-400" : isCurrent ? "text-cyan-400" : "text-slate-500"
                                }`}>
                                  {milestone.weeks} · {milestone.status.toUpperCase()}
                                </span>
                                <h4 className="text-xs font-bold text-white mt-0.5">{milestone.stage}</h4>
                                <ul className="mt-2 space-y-1.5">
                                  {milestone.activities.map((act, i) => (
                                    <li key={i} className="text-[10px] text-slate-400 flex items-start gap-1.5 leading-relaxed">
                                      <span className="text-cyan-500 mt-1 flex-shrink-0">•</span> {act}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Curriculum & Training */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                          <GraduationCap size={11} /> CBSE/NEP Integration
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1.5">{data.curriculumRecommendation.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-2.5 leading-relaxed">{data.curriculumRecommendation.explanation}</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-800/60">
                        <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-2">Key Modules</p>
                        <div className="flex flex-wrap gap-1.5">
                          {data.curriculumRecommendation.coreTopics.map((topic, i) => (
                            <span key={i} className="text-[9px] bg-slate-950 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-violet-400 flex items-center gap-1">
                          <Users size={11} /> Teacher Training Program
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1.5">Staff Capacity Building</h4>
                        <div className="mt-4 space-y-3.5">
                          {data.teacherTraining.map((session, i) => (
                            <div key={i} className="bg-slate-950/60 rounded-xl p-3 border border-slate-850">
                              <div className="flex justify-between items-baseline gap-2">
                                <h5 className="text-[10px] font-bold text-slate-200">{session.module}</h5>
                                <span className="text-[9px] font-bold text-violet-400">{session.duration}</span>
                              </div>
                              <p className="text-[9px] text-slate-400 mt-1 leading-normal">{session.topic}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Safety Guidelines */}
                  <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 sm:p-8">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-4">
                      <ShieldAlert className="text-amber-500" size={16} /> Laboratory Safety Protocols
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {data.safetyGuidelines.map((rule, i) => (
                        <div key={i} className="flex items-start gap-2 bg-slate-950/40 border border-slate-800/40 rounded-xl p-3">
                          <CheckCircle2 className="text-amber-500/80 mt-0.5 flex-shrink-0" size={12} />
                          <p className="text-[10px] text-slate-300 leading-relaxed">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Future roadmap */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block pl-1">Expansion & Future Roadmap</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {data.futureExpansionPlan.map((phase, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/10 px-2 py-0.5 rounded-full inline-block">
                              {phase.horizon}
                            </span>
                            <h4 className="text-xs font-bold text-slate-200 mt-3.5 leading-snug">{phase.focus}</h4>
                          </div>
                          <div className="border-t border-slate-800/40 mt-3 pt-3">
                            <span className="text-[9px] text-slate-500 uppercase block font-bold">Hardware Additions</span>
                            <p className="text-[9.5px] text-cyan-300/85 mt-1 leading-snug">{phase.hardware}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Document, Paragraph, TextRun, Packer, HeadingLevel } from "docx";
import { useAI } from "../ai/hooks/useAI";
import { aiService } from "../ai/services/aiService";
import { CurriculumGenerationResponseSchema, CurriculumGenerationResponse } from "../ai/schemas/curriculumSchema";
import { compileCurriculumPrompt, CURRICULUM_GENERATOR_SYSTEM_PROMPT } from "../ai/prompts/templates";
import {
  BookOpen, Calendar, Layers, FileText, CheckCircle2,
  AlertCircle, Download, ArrowRight, Loader2, Sparkles, HelpCircle, ChevronDown, CheckSquare, Award, Play
} from "lucide-react";
import SEO from "../components/SEO";

export default function CurriculumGenerator() {
  const [formData, setFormData] = useState({
    grade: "Class 6–8",
    subject: "Introduction to Arduino & Coding",
    duration: "8 Weeks",
    difficulty: "Beginner",
    learningGoal: "Understand pin configurations, analog vs digital signals, write basic led blinking programs, and control a simple servo servo motor based on distance sensors.",
  });

  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);

  const aiFetcher = async (params: typeof formData) => {
    const compiledPrompt = compileCurriculumPrompt(params);
    const result = await aiService.generateJSON<CurriculumGenerationResponse>(
      compiledPrompt,
      CurriculumGenerationResponseSchema,
      {
        systemInstruction: CURRICULUM_GENERATOR_SYSTEM_PROMPT,
        temperature: 0.75,
      }
    );
    return result.data;
  };

  const { data, loading, error, execute } = useAI<CurriculumGenerationResponse, [typeof formData]>(aiFetcher);

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
    doc.setFontSize(20);
    doc.text("ROBOLEARN AI CURRICULUM OUTLINE", 15, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Difficulty: ${data.metadata.difficulty} | Grade: ${data.metadata.grade}`, 15, 33);
    
    // Summary
    doc.setTextColor(11, 37, 69);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Subject Course Syllabus: ${data.metadata.subject}`, 15, 55);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Duration: ${data.metadata.duration}`, 15, 63);
    
    // Outcomes
    doc.setFont("helvetica", "bold");
    doc.text("Course Learning Outcomes:", 15, 75);
    doc.setFont("helvetica", "normal");
    let outcomeY = 82;
    data.learningOutcomes.forEach((outcome) => {
      const outcomeLines = doc.splitTextToSize(`• ${outcome}`, 180);
      doc.text(outcomeLines, 15, outcomeY);
      outcomeY += outcomeLines.length * 5.5;
    });

    // Page 2: Weekly outline
    doc.addPage();
    let currentY = 25;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Weekly Overview Progress Plan:", 15, currentY);
    currentY += 8;

    doc.setFontSize(11);
    data.weeklyOverview.forEach((week) => {
      if (currentY > 260) {
        doc.addPage();
        currentY = 25;
      }
      doc.setFont("helvetica", "bold");
      doc.text(`Week ${week.week}: ${week.title}`, 15, currentY);
      currentY += 5;
      doc.setFont("helvetica", "italic");
      doc.text(`Focus: ${week.focus}`, 15, currentY);
      currentY += 5.5;
      
      doc.setFont("helvetica", "normal");
      week.dailyPlan.forEach((plan) => {
        doc.text(`- ${plan}`, 20, currentY);
        currentY += 5;
      });
      currentY += 4;
    });

    doc.save(`${data.metadata.subject.replace(/\s+/g, "_")}_Curriculum.pdf`);
  };

  const downloadDOCX = () => {
    if (!data) return;

    const sections = [
      new Paragraph({
        text: `ROBOLEARN AI CURRICULUM SYLLABUS`,
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Subject: `, bold: true }),
          new TextRun(data.metadata.subject),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({ text: `Target Grade: `, bold: true }),
          new TextRun(data.metadata.grade),
          new TextRun({ text: ` | Duration: `, bold: true }),
          new TextRun(data.metadata.duration),
          new TextRun({ text: ` | Difficulty: `, bold: true }),
          new TextRun(data.metadata.difficulty),
        ],
      }),
      new Paragraph({ text: "\n" }),
      new Paragraph({ text: "Learning Outcomes", heading: HeadingLevel.HEADING_2 }),
      ...data.learningOutcomes.map((outcome) => new Paragraph({ text: `• ${outcome}` })),
      new Paragraph({ text: "\n" }),
      new Paragraph({ text: "Weekly Overview Progress Plan", heading: HeadingLevel.HEADING_2 }),
      ...data.weeklyOverview.flatMap((week) => [
        new Paragraph({ text: `Week ${week.week}: ${week.title}`, heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: `Focus Area: ${week.focus}`, italics: true }),
        ...week.dailyPlan.map((day) => new Paragraph({ text: `  - ${day}` })),
        new Paragraph({ text: "" }),
      ]),
      new Paragraph({ text: "\n" }),
      new Paragraph({ text: "Projects & Sandbox Work", heading: HeadingLevel.HEADING_2 }),
      ...data.projects.flatMap((proj) => [
        new Paragraph({ text: `${proj.title} (${proj.difficulty})`, heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: proj.description }),
        new Paragraph({ text: `Deliverables:`, bold: true }),
        ...proj.deliverables.map((del) => new Paragraph({ text: `  - ${del}` })),
        new Paragraph({ text: "" }),
      ]),
      new Paragraph({ text: "\n" }),
      new Paragraph({ text: "Teacher Instructions & Notes", heading: HeadingLevel.HEADING_2 }),
      new Paragraph({ text: data.teacherNotes }),
    ];

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: sections,
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.metadata.subject.replace(/\s+/g, "_")}_Curriculum.docx`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <SEO
        title="AI STEM Curriculum Generator | RoboLearn"
        description="Generate rich, NEP-2020-compliant school lesson plans, homework tasks, assessments, and teacher guides."
      />
      <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-1/3 right-1/10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* Header Title */}
          <div className="text-center mb-12 relative z-10">
            <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-400/10 border border-emerald-400/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 animate-pulse">
              <Sparkles size={12} /> AI Syllabus Architect
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none">
              AI STEM Curriculum & Lesson Planner
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed">
              Design comprehensive, ready-to-teach subject timelines, week-by-week lesson designs, class activities, assessments, and download files for school syllabus documentation.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-8 items-start relative z-10">
            {/* Form configuration panel */}
            <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl text-slate-200">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen size={18} className="text-emerald-400" /> Syllabus Specifications
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Subject / Topic</label>
                  <input
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData((p) => ({ ...p, subject: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-650 focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g. Intro to Arduino Pin Mapping"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Target Grade</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData((p) => ({ ...p, grade: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none"
                    >
                      <option value="Class 1–2">Class 1–2</option>
                      <option value="Class 3–5">Class 3–5</option>
                      <option value="Class 6–8">Class 6–8</option>
                      <option value="Class 9–12">Class 9–12</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData((p) => ({ ...p, difficulty: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Course Duration</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none"
                  >
                    <option value="4 Weeks">4 Weeks (Short Term)</option>
                    <option value="8 Weeks">8 Weeks (Standard)</option>
                    <option value="16 Weeks">16 Weeks (Semester)</option>
                    <option value="32 Weeks">32 Weeks (Full Academic Year)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block mb-1.5">Learning Goals & Skills Focus</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.learningGoal}
                    onChange={(e) => setFormData((p) => ({ ...p, learningGoal: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none leading-relaxed"
                    placeholder="Specify target hardware boards, sensory inputs, programming concepts..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Structuring Syllabus Plan...
                    </>
                  ) : (
                    <>
                      Construct Curriculum <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Results display panel */}
            <div className="min-h-[400px] flex flex-col justify-center">
              {!loading && !data && !error && (
                <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl p-10 text-center py-24">
                  <BookOpen size={48} className="mx-auto text-slate-700 mb-4 animate-bounce" />
                  <h3 className="text-base font-bold text-slate-400">Waiting for Specifications</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
                    Set up your grade boundaries, course subjects, and learning targets on the left to trigger the curriculum builder.
                  </p>
                </div>
              )}

              {loading && (
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 text-center py-28 flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 animate-spin" />
                  </div>
                  <h3 className="text-base font-bold text-white">Generating Complete STEM Curriculum</h3>
                  <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed animate-pulse">
                    Structuring weekly schedules, aligning CBSE/NEP outcomes, compiling homework assignments, and writing teacher guides.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center text-red-200">
                  <AlertCircle size={32} className="mx-auto text-red-400 mb-3" />
                  <h3 className="text-sm font-bold">Failed to build syllabus</h3>
                  <p className="text-xs text-red-400/80 mt-1">{error.message}</p>
                </div>
              )}

              {data && !loading && (
                <div className="space-y-8 animate-[fadeIn_0.4s_ease]">
                  
                  {/* Overview panel */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800/80 pb-5">
                      <div>
                        <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Syllabus Outline</span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                          {data.metadata.subject}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {data.metadata.grade} · {data.metadata.duration} · {data.metadata.difficulty} Level
                        </p>
                      </div>
                      <div className="flex gap-2.5">
                        <button
                          onClick={downloadPDF}
                          className="bg-slate-850 hover:bg-slate-800 border border-slate-700/80 text-[10px] sm:text-xs font-semibold px-3 py-2 rounded-xl text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download size={13} /> PDF
                        </button>
                        <button
                          onClick={downloadDOCX}
                          className="bg-emerald-500 hover:bg-emerald-600 text-[10px] sm:text-xs font-bold px-3 py-2 rounded-xl text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FileText size={13} /> Word DOCX
                        </button>
                      </div>
                    </div>

                    {/* Learning Outcomes */}
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-3.5">
                        <Award size={15} className="text-emerald-400" /> Learning Outcomes
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {data.learningOutcomes.map((out, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-slate-950/40 border border-slate-800/40 rounded-xl p-3">
                            <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <p className="text-[10.5px] text-slate-300 leading-relaxed">{out}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Weekly Schedules Tabs & Panel */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block pl-1">Weekly Course Timeline</h3>
                    <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6">
                      
                      {/* Week navigation buttons */}
                      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 border-b border-slate-800/50">
                        {data.weeklyOverview.map((week) => (
                          <button
                            key={week.week}
                            onClick={() => setActiveWeekTab(week.week)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                              activeWeekTab === week.week
                                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10"
                                : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                            }`}
                          >
                            Week {week.week}
                          </button>
                        ))}
                      </div>

                      {/* Display active week data */}
                      {data.weeklyOverview
                        .filter((w) => w.week === activeWeekTab)
                        .map((week) => (
                          <div key={week.week} className="space-y-4 animate-[fadeIn_0.2s_ease]">
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">Week {week.week} Core Goal</h4>
                              <h3 className="text-base font-extrabold text-slate-100 mt-1">{week.title}</h3>
                              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-2.5">Focus Area: {week.focus}</p>
                            </div>

                            <div className="space-y-2 pt-2">
                              {week.dailyPlan.map((day, idx) => (
                                <div key={idx} className="bg-slate-950/60 border border-slate-850 rounded-2xl p-4 flex gap-3 hover:border-slate-850 transition-all">
                                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <p className="text-xs text-slate-300 leading-relaxed">{day}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Representative Detailed Lesson Plan Accordions */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block pl-1">Detailed Lesson Plan Exemplars</h3>
                    <div className="space-y-3.5">
                      {data.lessonPlans.map((lesson, idx) => (
                        <div key={idx} className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6">
                          <div className="flex justify-between items-baseline gap-2 pb-3 border-b border-slate-800/50 mb-4">
                            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {lesson.topic}
                            </h4>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-0.5 rounded-full">
                              {lesson.duration}
                            </span>
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">Key Concepts</p>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {lesson.keyConcepts.map((concept, i) => (
                                  <span key={i} className="text-[9px] bg-slate-950 text-slate-300 border border-slate-850 px-2 py-0.5 rounded-full">
                                    {concept}
                                  </span>
                                ))}
                              </div>

                              <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1.5">Class Activities</p>
                              <ul className="space-y-1">
                                {lesson.activities.map((act, i) => (
                                  <li key={i} className="text-[10px] text-slate-400 flex items-start gap-1 leading-normal">
                                    <span className="text-emerald-500">•</span> {act}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-slate-950/40 rounded-2xl p-4 border border-slate-850">
                              <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1">Homework Task</p>
                              <p className="text-[10.5px] text-slate-300 leading-normal">{lesson.homework}</p>
                              
                              <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 mt-4 mb-1">Teacher Instructions</p>
                              <p className="text-[10.5px] text-slate-400 leading-relaxed italic">"{lesson.teacherNotes}"</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experiments & Projects */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-cyan-400">Class Experiments</span>
                      <div className="mt-4 space-y-4">
                        {data.activities.map((act, idx) => (
                          <div key={idx} className="bg-slate-950/60 rounded-2xl p-4 border border-slate-850">
                            <h4 className="text-xs font-bold text-white">{act.name}</h4>
                            <p className="text-[9px] font-bold text-slate-500 mt-2 uppercase tracking-wider">Required Materials:</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{act.materials.join(", ")}</p>
                            <p className="text-[9px] font-bold text-slate-500 mt-3 uppercase tracking-wider">Steps:</p>
                            <ol className="mt-1 space-y-1">
                              {act.steps.map((s, i) => (
                                <li key={i} className="text-[10px] text-slate-400 flex items-start gap-1 leading-relaxed">
                                  <span className="text-cyan-500 font-bold">{i + 1}.</span> {s}
                                </li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-violet-400">Capstone Projects</span>
                      <div className="mt-4 space-y-4">
                        {data.projects.map((proj, idx) => (
                          <div key={idx} className="bg-slate-950/60 rounded-2xl p-4 border border-slate-850">
                            <div className="flex justify-between items-baseline gap-2">
                              <h4 className="text-xs font-bold text-white">{proj.title}</h4>
                              <span className="text-[9px] font-bold text-violet-400">{proj.difficulty}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{proj.description}</p>
                            <p className="text-[9px] font-bold text-slate-500 mt-3 uppercase tracking-wider">Deliverables:</p>
                            <ul className="mt-1 space-y-1">
                              {proj.deliverables.map((del, i) => (
                                <li key={i} className="text-[10px] text-slate-400 flex items-start gap-1 leading-relaxed">
                                  <span className="text-violet-500">•</span> {del}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Assessments outline */}
                  <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 sm:p-8">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-4">
                      <CheckSquare className="text-emerald-400" size={16} /> Student Assessments & Evaluation Metrics
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {data.assessments.map((ass, i) => (
                        <div key={i} className="bg-slate-950/40 border border-slate-800/40 rounded-2xl p-4 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/10 px-2.5 py-0.5 rounded-full inline-block">
                              {ass.type}
                            </span>
                            <p className="text-[10.5px] text-slate-300 mt-3.5 leading-relaxed">{ass.details}</p>
                          </div>
                          <div className="border-t border-slate-800/40 mt-3.5 pt-3.5">
                            <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1.5">Sample Questions</p>
                            <ul className="space-y-1">
                              {ass.questions.map((q, qIdx) => (
                                <li key={qIdx} className="text-[9.5px] text-slate-400 leading-snug">
                                  {qIdx + 1}. {q}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* General Teacher Guide */}
                  <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400 mb-2">General Instructor Guide</h4>
                    <p className="text-xs text-slate-300 leading-relaxed italic">"{data.teacherNotes}"</p>
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

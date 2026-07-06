import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Send, Plus, X, GraduationCap, School, BookOpen } from "lucide-react";
import { proposeCourse } from "../services/courseService";
import SEO from "../components/SEO";

export default function AddCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    audience: "student",
    level: "Grade 6–8",
    description: "",
    duration: "",
    schoolName: "",
    repName: "",
  });
  
  const [topicInput, setTopicInput] = useState("");
  const [syllabus, setSyllabus] = useState(["Basic Circuits Setup", "Block Programming Logic"]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (topicInput.trim() && !syllabus.includes(topicInput.trim())) {
      setSyllabus([...syllabus, topicInput.trim()]);
      setTopicInput("");
    }
  };

  const handleRemoveTopic = (indexToRemove) => {
    setSyllabus(syllabus.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await proposeCourse({
        ...form,
        syllabus,
      });
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong while submitting the course.");
      setLoading(false);
    }
  };

  const inputCls =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition text-sm bg-white";

  if (success) {
    return (
      <div className="bg-slate-50 min-h-screen pt-24 pb-16 flex items-center justify-center px-6">
        <SEO title="Course Proposal Submitted" description="Success page for school STEM course submissions" path="/training/add-course" />
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-lg animate-fadeUp">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="text-2xl font-bold text-[#0b2545]">Course Submitted!</h1>
          <p className="text-sm text-slate-500 mt-2">
            Your school's course proposal has been saved and is now live in the training portal.
          </p>

          <div className="mt-6 border-t border-b border-slate-100 py-4 space-y-2.5 text-left text-sm bg-slate-50 p-4 rounded-2xl">
            <div className="flex justify-between">
              <span className="text-slate-500">Course Title:</span>
              <span className="font-bold text-slate-800">{form.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Level:</span>
              <span className="font-semibold text-slate-800">{form.level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Audience:</span>
              <span className="font-semibold text-slate-800 capitalize">{form.audience}s</span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/training")}
              className="flex-1 bg-[#0b2545] hover:bg-cyan-600 text-white py-3.5 rounded-xl font-semibold transition shadow-md"
            >
              View Training Programs
            </button>
            <button
              onClick={() => {
                setForm({ title: "", audience: "student", level: "Grade 6–8", description: "", duration: "", schoolName: "", repName: "" });
                setSyllabus(["Basic Circuits Setup", "Block Programming Logic"]);
                setSuccess(false);
              }}
              className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-3.5 rounded-xl font-semibold transition"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16">
      <SEO title="Add School Course Proposal" description="Propose a custom STEM or robotics course for your school" path="/training/add-course" />
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Back link */}
        <Link to="/training" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cyan-600 transition-colors mb-8 font-medium">
          <ArrowLeft size={15} /> Back to Training
        </Link>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-8">
            <div className="w-12 h-12 bg-cyan-50 border border-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0b2545]">Propose School STEM Course</h1>
              <p className="text-xs text-slate-500 mt-1">Submit custom curriculum modules to run at your school campus.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">School Representative Name *</label>
                <input
                  name="repName"
                  required
                  value={form.repName}
                  onChange={handleChange}
                  placeholder="e.g. Mrs. Anjali Sen"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">School / Institution Name *</label>
                <input
                  name="schoolName"
                  required
                  value={form.schoolName}
                  onChange={handleChange}
                  placeholder="e.g. St. Xavier Senior Secondary"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Course Title *</label>
              <input
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Advanced Solar Sensor Integration"
                className={inputCls}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Audience</label>
                <select
                  name="audience"
                  value={form.audience}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="student">Students</option>
                  <option value="teacher">Teachers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Level</label>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="Grade 3–5">Primary (Grade 3-5)</option>
                  <option value="Grade 6–8">Middle (Grade 6-8)</option>
                  <option value="Grade 9–12">Senior (Grade 9-12)</option>
                  <option value="All Levels">All Grade Levels</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Course Duration</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 6 Weeks / 12 Hours"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Course Summary &amp; Objective *</label>
              <textarea
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what students will build, the hardware requirements, and overall learning benchmarks."
                className={inputCls}
              />
            </div>

            {/* Syllabus add tags */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Syllabus Topics &amp; Milestones</label>
              <div className="flex gap-2">
                <input
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="e.g. Ultrasonic Sensor calibration"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={handleAddTopic}
                  className="bg-[#0b2545] hover:bg-cyan-600 text-white px-4 rounded-xl font-bold flex items-center transition"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Topics tags display */}
              <div className="flex flex-wrap gap-2 mt-4">
                {syllabus.map((topic, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-[#0b2545] font-bold text-xs px-3 py-1.5 rounded-xl"
                  >
                    {topic}
                    <button
                      type="button"
                      onClick={() => handleRemoveTopic(index)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-md"
            >
              {loading ? (
                "Submitting Proposal..."
              ) : (
                <>
                  <Send size={16} /> Submit Course Proposal
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

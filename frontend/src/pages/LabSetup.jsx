import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Cpu, Monitor, Wrench, GraduationCap, Shield, Settings, ChevronDown, Send, CheckCircle2, Calculator, School, Layers, Hammer } from "lucide-react";
import { submitContact } from "../services/contactService";
import SEO from "../components/SEO";

const features = [
  "Complete Lab Design & Layout Planning",
  "Hardware Installation (Arduino, ESP32, Raspberry Pi)",
  "Software Setup (Arduino IDE, Python, Scratch)",
  "Safety Guidelines & Lab Rules",
  "Curriculum Design & Teacher Support",
  "Annual Maintenance Contract (AMC)",
];

const equipment = [
  { icon: Cpu, title: "Hardware Setup", desc: "Arduino, ESP32, Raspberry Pi, sensors, motors and robotics kits." },
  { icon: Monitor, title: "Software Setup", desc: "Arduino IDE, Python, Tinkercad, Scratch and coding tools." },
  { icon: Wrench, title: "Lab Infrastructure", desc: "Workstations, storage, wiring, lighting and safety equipment." },
  { icon: GraduationCap, title: "Teacher Training", desc: "Dedicated teacher training on lab management and curriculum." },
  { icon: Shield, title: "Safety Guidelines", desc: "Complete safety protocols and lab rules for student safety." },
  { icon: Settings, title: "AMC Support", desc: "Annual maintenance to keep your lab running smoothly." },
];

const process = [
  { num: "01", title: "School Consultation", desc: "We visit your school, understand needs, space and budget." },
  { num: "02", title: "Lab Planning", desc: "Custom design, equipment list and curriculum mapping." },
  { num: "03", title: "Installation", desc: "Professional setup of all hardware, software and safety systems." },
  { num: "04", title: "Teacher Training", desc: "Full training for teachers on lab operations and curriculum." },
  { num: "05", title: "Student Launch", desc: "First session with students — hands-on from day one." },
];

const faqs = [
  { q: "How long does a full lab setup take?", a: "Most labs are designed and installed within 3–4 weeks of the initial consultation, depending on room readiness and equipment availability." },
  { q: "Do you provide maintenance after installation?", a: "Yes — every lab includes an Annual Maintenance Contract (AMC) covering hardware checks, software updates, and on-call troubleshooting." },
  { q: "What if our teachers have never used Arduino or Python before?", a: "That's exactly what our Teacher Training program is for. We start from the basics and certify teachers to run sessions independently." },
  { q: "Can the lab be customized for our budget?", a: "Yes. During the consultation, we propose 2–3 package options scaled to your budget, room size, and grade levels." },
  { q: "Do you support Raspberry Pi-based setups too?", a: "Yes — our hardware setup covers Arduino, ESP32, and Raspberry Pi, so labs can support both beginner and advanced projects." },
];

// Lab packages configuration for the planner
const labPackages = {
  atl: {
    name: "Atal Tinkering Lab (ATL)",
    basePrice: 1200000, // Government standard is ₹10L - ₹20L
    pricePerStudent: 8000,
    minSpace: 1000,
    items: [
      { name: "STEM Innovation kits (P1, P2, P3)", qty: "10-20 Sets" },
      { name: "DIY 3D Printer & Filaments", qty: "1 Unit" },
      { name: "Electronic components & soldering tools", qty: "Assorted" },
      { name: "Power tools & Mechanical assembly bench", qty: "1 Set" },
      { name: "Safety shields & Fire protection kits", qty: "4 Units" }
    ]
  },
  robotics: {
    name: "Robotics Core Lab",
    basePrice: 450000,
    pricePerStudent: 4500,
    minSpace: 600,
    items: [
      { name: "RoboLearn Arduino Starter kits", qty: "1 Set per 2 students" },
      { name: "RoboLearn Advanced IoT & Sensor kits", qty: "5 Sets" },
      { name: "Chassis plates, gears, wheels, and links", qty: "Bulk" },
      { name: "Soldering workstations & Multimeters", qty: "3 Units" },
      { name: "Instructional charts & Wall prints", qty: "Complete Pack" }
    ]
  },
  ai_coding: {
    name: "Coding & AI Lab",
    basePrice: 300000,
    pricePerStudent: 3000,
    minSpace: 500,
    items: [
      { name: "ESP32 Camera Modules & Shields", qty: "1 Set per 2 students" },
      { name: "Edge Computing Development kits", qty: "4 Units" },
      { name: "Syllabus books & Code repositories", qty: "Licensed" },
      { name: "Block coding companion app setups", qty: "Unlimited" }
    ]
  }
};

export default function LabSetup() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", schoolName: "", city: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Planner states
  const [selectedLab, setSelectedLab] = useState("atl");
  const [studentCapacity, setStudentCapacity] = useState(40);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitContact({ ...form, type: "consultation" });
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", schoolName: "", city: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  // Lab calculations
  const plannerResult = useMemo(() => {
    const pkg = labPackages[selectedLab];
    const estimatedCost = pkg.basePrice + (studentCapacity * pkg.pricePerStudent);
    const spaceRequired = Math.max(pkg.minSpace, studentCapacity * 20); // 20 sq ft per student
    const kitsCount = Math.ceil(studentCapacity / 2);
    const teacherTrainingHrs = studentCapacity > 50 ? 40 : 24;

    return {
      estimatedCost: estimatedCost.toLocaleString("en-IN"),
      spaceRequired,
      kitsCount,
      teacherTrainingHrs,
      items: pkg.items
    };
  }, [selectedLab, studentCapacity]);

  const inputCls =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors text-sm";

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <SEO
        title="Robotics & STEM Lab Setup for Schools"
        description="End-to-end Atal Tinkering Lab (ATL), robotics, and Coding/AI lab setups with budget calculators, NITI Aayog equipment compliance, and teacher certifications."
        path="/lab-setup"
      />
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floatSlow { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .anim-float { animation: floatSlow 6s ease-in-out infinite; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fadeup, .circuit-line, .anim-float { animation: none !important; }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#061B33] py-24 lg:py-28">
        <svg className="absolute inset-0 w-full h-full opacity-[0.16]" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 90 H260 V210 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="90" r="4" /><circle cx="520" cy="210" r="4" />
            <circle cx="880" cy="60" r="4" /><circle cx="640" cy="180" r="4" />
          </g>
        </svg>

        <div className="relative max-w-4xl mx-auto px-6 text-center anim-fadeup">
          <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Robotics Lab Setup
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Complete <span className="text-cyan-400">Robotics Lab</span> for Schools
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            NITI Aayog aligned ATL packages, advanced robotics kits, custom layouts, teacher certification development, and complete equipment provisioning.
          </p>
        </div>
      </section>

      {/* ============ CALCULATOR SECTION ============ */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-1.5">
            <Calculator size={15} /> Lab Planner
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#0b2545]">Interactive Lab Budget Calculator</h2>
          <p className="mt-3 text-slate-600 text-sm">
            Select your target lab configuration and student capacity to calculate estimated package costs and hardware specifications.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Planner Controls */}
          <div className="space-y-8">
            {/* Lab Type Tabs */}
            <div>
              <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-4">1. Select Lab Type</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "atl", label: "ATL Lab", icon: School, desc: "CBSE & NITI Aayog standards" },
                  { id: "robotics", label: "Robotics Core", icon: Layers, desc: "Starter kits & sensors" },
                  { id: "ai_coding", label: "Coding & AI", icon: Cpu, desc: "Camera & ML shields" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLab(item.id)}
                    className={`flex flex-col text-left p-4 border rounded-2xl transition-all duration-200 ${
                      selectedLab === item.id
                        ? "border-cyan-500 bg-cyan-50/20 ring-1 ring-cyan-500"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon size={20} className={selectedLab === item.id ? "text-cyan-600" : "text-slate-500"} />
                    <span className="block text-sm font-bold text-[#0b2545] mt-3">{item.label}</span>
                    <span className="block text-[10px] text-slate-400 mt-1 leading-snug">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Capacity Slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold text-[#0b2545] uppercase tracking-wider">2. Student Capacity</label>
                <span className="bg-cyan-50 text-cyan-700 text-sm font-bold px-3 py-1 rounded-full border border-cyan-100">
                  {studentCapacity} Students
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={studentCapacity}
                onChange={(e) => setStudentCapacity(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600 border border-slate-200"
              />
              <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2">
                <span>20 Students (Min)</span>
                <span>60 Students</span>
                <span>100 Students (Max)</span>
              </div>
            </div>

            {/* Equipment checklist */}
            <div>
              <h4 className="text-xs font-bold text-[#0b2545] uppercase tracking-wider mb-4">Package Equipment Checklist</h4>
              <div className="border border-slate-100 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
                {plannerResult.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-center px-4 py-3 bg-slate-50/50">
                    <span className="font-semibold text-slate-700">{item.name}</span>
                    <span className="text-cyan-600 font-bold bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100">{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Planner Outcome */}
          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#0b2545] text-base mb-4 pb-2 border-b border-slate-200/60">Estimated Proposal</h3>
              
              <div className="space-y-5">
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Package Cost</span>
                  <span className="text-3xl font-extrabold text-cyan-600 mt-1 block">₹{plannerResult.estimatedCost}</span>
                  <span className="block text-[10px] text-slate-400 mt-1 leading-normal">
                    *Approximate cost based on baseline components and selected capacity. Final quotes vary by installation requirements.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/60 text-sm">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400">Space Needed</span>
                    <span className="font-bold text-slate-800 mt-1 block">{plannerResult.spaceRequired} Sq. Ft.</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400">Hardware Kits</span>
                    <span className="font-bold text-slate-800 mt-1 block">{plannerResult.kitsCount} Kits (1:2 ratio)</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-xs font-semibold text-slate-400">Teacher Certifications</span>
                    <span className="font-bold text-slate-800 mt-1 block">{plannerResult.teacherTrainingHrs} Hours of intensive development</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#consultation-form"
              className="w-full bg-[#0b2545] hover:bg-cyan-600 text-white py-3.5 rounded-xl font-semibold mt-8 flex items-center justify-center gap-2 transition shadow-md text-sm"
            >
              Request Proposal for This Package
            </a>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE PROVIDE ============ */}
      <section className="py-24 bg-white border-t border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">What's Included</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">A world-class robotics lab, fully managed</h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                RoboLearn is an end-to-end laboratory provider. We do not just sell boxes; we configure workstations, layout networking hubs, wire safety triggers, and support CBSE-mandated structures.
              </p>
              <div className="space-y-3 mt-8">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-cyan-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl anim-float">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                  alt="Fully equipped robotics lab with student workstations"
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {equipment.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="group border border-slate-200 bg-slate-50/50 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-sm transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#0b2545] flex items-center justify-center mb-3 group-hover:bg-cyan-500 transition-colors duration-300">
                      <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="font-semibold text-[#0b2545] text-sm mb-1">{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Our Process</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">From first call to a running lab</h2>
            <p className="mt-4 text-slate-600">Seamlessly, in five clear stages.</p>
          </div>

          <div className="mt-14 space-y-4">
            {process.map(({ num, title, desc }) => (
              <div key={num} className="flex items-start gap-6 bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-sm transition-all">
                <div className="text-3xl font-bold text-cyan-600/25 w-10 flex-shrink-0">{num}</div>
                <div>
                  <h4 className="font-semibold text-[#0b2545] mb-1">{title}</h4>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">FAQ</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">Common questions, answered</h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={item.q} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-medium text-[#0b2545] text-sm">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-cyan-600" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CONSULTATION FORM ============ */}
      <section id="consultation-form" className="py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Get Started</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">Request a free lab consultation</h2>
            <p className="mt-4 text-slate-600">Tell us about your school and we'll get back to you within 24 hours.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            {success ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mb-5">
                  <CheckCircle2 size={32} className="text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-[#0b2545] mb-2">Request received</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                  Thanks for reaching out — our team will contact you within 24 hours.
                </p>
                <button onClick={() => setSuccess(false)} className="mt-7 text-cyan-600 font-semibold text-sm hover:underline">
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name *" className={inputCls} />
                  <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone number *" className={inputCls} />
                </div>

                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email address *" className={inputCls} />

                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="School name" className={inputCls} />
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputCls} />
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about your space, budget, or timeline (optional)"
                  className={inputCls}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {loading ? "Sending..." : <><Send size={16} /> Request Consultation</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Clock } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 99999 99999", href: "tel:+919999999999" },
  { icon: Mail, label: "Email", value: "info@robolearn.in", href: "mailto:info@robolearn.in" },
  { icon: MapPin, label: "Location", value: "Bhilwara, Rajasthan, India", href: null },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919999999999" },
];

const inquiryTypes = [
  { value: "general", label: "General Inquiry" },
  { value: "consultation", label: "Lab Setup Consultation" },
  { value: "demo", label: "Schedule a Demo" },
  { value: "partnership", label: "Partnership" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    schoolName: "",
    city: "",
    message: "",
    type: "general",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      formData.append("access_key", accessKey);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("School Name", form.schoolName);
      formData.append("city", form.city);
      formData.append("Inquiry Type", form.type);
      formData.append("message", form.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", schoolName: "", city: "", message: "", type: "general" });
      } else {
        setError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-colors text-sm";

  return (
    <div className="bg-slate-50 text-slate-900">
      <style>{`
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fadeup, .circuit-line { animation: none !important; }
        }
      `}</style>

      {/* ── HERO + FORM merged ── */}
      <section className="relative overflow-hidden bg-[#061B33] pb-0 pt-20 lg:pt-24">
        {/* Circuit BG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.15]"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 90 H260 V210 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
            <path className="circuit-line" d="M0 400 H180 V320 H400" />
            <path className="circuit-line" d="M1200 500 H1000 V400 H780" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="90" r="4" /><circle cx="520" cy="210" r="4" />
            <circle cx="880" cy="60" r="4" /><circle cx="640" cy="180" r="4" />
            <circle cx="180" cy="400" r="4" /><circle cx="400" cy="320" r="4" />
            <circle cx="1000" cy="500" r="4" /><circle cx="780" cy="400" r="4" />
          </g>
        </svg>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center anim-fadeup mb-14">
            <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Contact Us
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
              Let&rsquo;s build something{" "}
              <span className="text-cyan-400">amazing together</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Reach out to discuss robotics lab setup, training programs,
              curriculum, or any STEM partnership for your school.
            </p>
          </div>

          {/* Main grid — overlaps into white bg below */}
          <div className="grid lg:grid-cols-5 gap-8 relative z-10 pb-0">

            {/* Left — Info cards */}
            <div className="lg:col-span-2 flex flex-col gap-3 pb-10 lg:pb-16">
              <div className="mb-2">
                <span className="text-cyan-400 font-semibold text-xs tracking-widest uppercase">
                  Get in Touch
                </span>
                <h2 className="mt-2 text-xl md:text-2xl font-bold text-white">
                  We usually reply within a day
                </h2>
              </div>

              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/10 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 transition-colors duration-300">
                    <Icon size={18} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-white font-medium text-sm hover:text-cyan-300 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="text-white font-medium text-sm">{value}</div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-0.5">Office Hours</div>
                  <div className="text-white font-medium text-sm">Mon – Sat, 9:30 AM – 6:30 PM</div>
                </div>
              </div>
            </div>

            {/* Right — Form card, sticks out below the dark section */}
            <div className="lg:col-span-3 bg-white rounded-t-3xl shadow-2xl p-8 lg:p-10">
              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0b2545] mb-2">Message sent!</h3>
                  <p className="text-slate-500 text-sm max-w-xs">
                    Thanks for reaching out — we&rsquo;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-7 text-cyan-600 font-semibold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#0b2545]">Send us a message</h3>
                    <p className="text-slate-400 text-sm mt-1">Fill in the details below and we'll get back to you.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name *" className={inputCls} />
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone number *" className={inputCls} />
                  </div>

                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email address *" className={inputCls} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="School name" className={inputCls} />
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputCls} />
                  </div>

                  <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
                    {inquiryTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Your message *"
                    className={inputCls}
                  />

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0b2545] hover:bg-cyan-600 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* White bg continues under the form card */}
      <section className="bg-white pt-0 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* form card bottom rounded corners continuation */}
          <div className="lg:ml-auto lg:w-3/5 bg-white rounded-b-3xl shadow-2xl px-8 lg:px-10 pb-2 -mt-1" />

          {/* Map */}
          <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              title="RoboLearn office location"
              src="https://www.google.com/maps?q=Bhilwara,Rajasthan,India&output=embed"
              className="w-full h-72 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
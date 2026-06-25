import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { submitContact } from "../../services/contactService";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 99999 99999", href: "tel:+919999999999" },
  { icon: Mail, label: "Email", value: "info@robolearn.in", href: "mailto:info@robolearn.in" },
  { icon: MapPin, label: "Location", value: "Bhilwara, Rajasthan, India", href: null },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/919999999999" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", schoolName: "", city: "", message: "", type: "general" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", schoolName: "", city: "", message: "", type: "general" });
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition text-sm";

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Contact Us
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Amazing Together
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Reach out to discuss robotics lab setup, training programs,
            curriculum or any STEM partnership for your school.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Left - Info */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 border border-slate-200 rounded-2xl hover:border-cyan-300 transition">
                  <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-slate-900 font-medium text-sm hover:text-cyan-600 transition">
                        {value}
                      </a>
                    ) : (
                      <div className="text-slate-900 font-medium text-sm">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3 border border-slate-200 rounded-3xl p-8">
              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={48} className="text-cyan-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 text-cyan-600 font-semibold text-sm hover:underline">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name *" className={inputCls} />
                    <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" className={inputCls} />
                  </div>

                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email Address *" className={inputCls} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="School Name" className={inputCls} />
                    <input name="city" value={form.city} onChange={handleChange} placeholder="City" className={inputCls} />
                  </div>

                  <select name="type" value={form.type} onChange={handleChange} className={inputCls}>
                    <option value="general">General Inquiry</option>
                    <option value="consultation">Lab Setup Consultation</option>
                    <option value="demo">Schedule a Demo</option>
                    <option value="partnership">Partnership</option>
                  </select>

                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Your Message *" className={inputCls} />

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
                    {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const services = [
  { label: "Robotics Lab Setup", path: "/lab-setup" },
  { label: "Student Training", path: "/training" },
  { label: "Teacher Training", path: "/training" },
  { label: "Robotics Kits", path: "/products" },
  { label: "STEM Curriculum", path: "/curriculum" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#061B33] text-slate-300 overflow-hidden">
      {/* ambient glow, consistent with other sections */}
      <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 bottom-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Main Footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="group flex items-center gap-2 mb-3">
              <div className="relative w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/30 group-hover:to-cyan-400/10 transition-all duration-300" />
                <Zap size={15} className="relative text-cyan-300" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white">
                Robo<span className="text-cyan-400">Learn</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-sm">
              Robotics lab setup, STEM curriculum, and teacher training for
              schools across India.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mb-5">
              <a href="tel:+919999999999" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                <Phone size={14} className="text-cyan-500" />
                +91 99999 99999
              </a>
              <a href="mailto:info@robolearn.in" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail size={14} className="text-cyan-500" />
                info@robolearn.in
              </a>
              <span className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={14} className="text-cyan-500" />
                Bhilwara, Rajasthan
              </span>
            </div>

            {/* WhatsApp — kept as-is */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + CTA */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 mb-5">
              {services.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="group p-3.5 rounded-xl bg-cyan-400/10 border border-cyan-400/20 hover:border-cyan-400/40 transition-colors">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Book Free Consultation
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RoboLearn. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
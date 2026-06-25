import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

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

const resources = [
  { label: "Products Catalog", path: "/products" },
  { label: "Curriculum Guide", path: "/curriculum" },
  { label: "Case Studies", path: "/gallery" },
  { label: "Book a Demo", path: "/contact" },
];

const stats = [
  { value: "50+", label: "Schools" },
  { value: "10K+", label: "Students" },
  { value: "20+", label: "Trainers" },
  { value: "15+", label: "Cities" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">

      {/* Trust Bar */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-cyan-400">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand - takes 2 cols */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap size={15} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white">
                Robo<span className="text-cyan-400">Learn</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              Complete Robotics Lab Setup, STEM Curriculum, Teacher Training
              and Student Programs for schools across India.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition group">
                <Phone size={15} className="text-cyan-500 flex-shrink-0" />
                +91 99999 99999
              </a>
              <a href="mailto:info@robolearn.in" className="flex items-center gap-3 text-sm text-slate-400 hover:text-cyan-400 transition">
                <Mail size={15} className="text-cyan-500 flex-shrink-0" />
                info@robolearn.in
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={15} className="text-cyan-500 flex-shrink-0 mt-0.5" />
                Bhilwara, Rajasthan, India
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {services.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-slate-400 hover:text-cyan-400 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA box */}
            <div className="mt-6 p-4 rounded-xl bg-cyan-600/10 border border-cyan-600/20">
              <p className="text-xs text-slate-400 mb-2">Ready to set up a lab?</p>
              <Link
                to="/contact"
                className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition"
              >
                Book Free Consultation →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} RoboLearn. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link to="/contact" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
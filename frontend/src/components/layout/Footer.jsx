import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Robotics Lab Setup", path: "/lab-setup" },
  { label: "Training Programs", path: "/training" },
  { label: "Blog", path: "/blog" },
];

const services = [
  { label: "Lab Design & Installation", path: "/lab-setup" },
  { label: "Student Training", path: "/training" },
  { label: "Teacher Training", path: "/training" },
  { label: "Robotics Kits Supply", path: "/products" },
  { label: "STEM Curriculum", path: "/curriculum" },
  { label: "Annual Maintenance", path: "/lab-setup" },
];

const resources = [
  { label: "Products Catalog", path: "/products" },
  { label: "Curriculum Guide", path: "/curriculum" },
  { label: "Gallery", path: "/gallery" },
  { label: "Case Studies", path: "/gallery" },
  { label: "Contact Us", path: "/contact" },
];

const Footer = () => {
  return (
    <footer
      className="border-t border-white/10 pt-16 pb-8"
      style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #060c18 100%)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2563eb, #06b6d4)" }}
              >
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                Robo<span style={{ color: "#06b6d4" }}>Learn</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-[280px]">
              Empowering schools with complete Robotics Lab Setup, Student Training, Teacher Development,
              and STEM Learning Solutions across India.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:+919999999999" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Phone size={15} className="text-[#2563eb]" />
                +91 99999 99999
              </a>
              <a href="mailto:info@robolearn.in" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors">
                <Mail size={15} className="text-[#2563eb]" />
                info@robolearn.in
              </a>
              <div className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={15} className="text-[#2563eb] mt-0.5 flex-shrink-0" />
                Bhilwara, Rajasthan, India
              </div>
            </div>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
              style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)", color: "#25d366" }}
            >
              <MessageCircle size={15} />
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-2">
              {services.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="flex flex-col gap-2">
              {resources.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="text-sm text-white/50 hover:text-white hover:pl-1 transition-all duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-b border-white/10 mb-8">
          {[
            { value: "50+", label: "Schools Served" },
            { value: "10,000+", label: "Students Trained" },
            { value: "20+", label: "Trainers Available" },
            { value: "15+", label: "Cities Covered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: "#22d3ee" }}>{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} RoboLearn. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
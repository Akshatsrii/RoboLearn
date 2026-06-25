import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-cyan-600" size={28} />
              <h2 className="text-2xl font-bold text-slate-900">
                Robo<span className="text-cyan-600">Learn</span>
              </h2>
            </div>

            <p className="text-slate-600">
              Complete Robotics Lab Setup, STEM Curriculum,
              Teacher Training and Student Programs for schools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-slate-600">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/lab-setup">Lab Setup</Link>
              <Link to="/training">Training</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900">
              Services
            </h3>

            <div className="flex flex-col gap-2 text-slate-600">
              <Link to="/lab-setup">Robotics Lab Setup</Link>
              <Link to="/training">Training Programs</Link>
              <Link to="/products">Products</Link>
              <Link to="/curriculum">Curriculum</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900">
              Contact
            </h3>

            <div className="space-y-3 text-slate-600">
              <div className="flex gap-2">
                <Phone size={18} className="text-cyan-600" />
                <span>+91 99999 99999</span>
              </div>

              <div className="flex gap-2">
                <Mail size={18} className="text-cyan-600" />
                <span>info@robolearn.com</span>
              </div>

              <div className="flex gap-2">
                <MapPin size={18} className="text-cyan-600" />
                <span>Rajasthan, India</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200 mt-12 pt-6 text-center text-slate-500">
          © {new Date().getFullYear()} RoboLearn. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}
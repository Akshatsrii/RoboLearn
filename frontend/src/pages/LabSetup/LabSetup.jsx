import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Cpu, Monitor, Wrench, GraduationCap, Shield, Settings } from "lucide-react";

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

export default function LabSetup() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Robotics Lab Setup
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Robotics Lab
            </span>{" "}
            for Your School
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            End-to-end lab design, hardware installation, software setup,
            teacher training and annual maintenance — all under one contract.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-7 py-3.5 rounded-xl font-semibold transition">
            Get Free Lab Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Build a World-Class Robotics Lab</h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                We handle everything — from lab design and equipment procurement
                to installation, training and long-term maintenance support.
              </p>
              <div className="space-y-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-cyan-600 flex-shrink-0" />
                    <span className="text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {equipment.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 hover:shadow-sm transition">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={20} className="text-cyan-600" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">{title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Our Setup Process</h2>
            <p className="text-slate-500">From first call to a fully running lab — seamlessly.</p>
          </div>
          <div className="space-y-4">
            {process.map(({ num, title, desc }) => (
              <div key={num} className="flex items-start gap-6 bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 transition">
                <div className="text-3xl font-bold text-cyan-600/25 w-10 flex-shrink-0">{num}</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
                  <p className="text-slate-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Robotics Lab?</h2>
            <p className="text-white/80 mb-8">Get a customized lab proposal for your school — free of charge.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-cyan-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold transition">
              Get Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
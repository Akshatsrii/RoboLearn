import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Cpu, Users, Trophy, Zap, BookOpen, Settings } from "lucide-react";

const studentPrograms = [
  { icon: Zap, title: "Beginner Robotics", desc: "Introduction to robotics, basic electronics and embedded systems." },
  { icon: Cpu, title: "Arduino & IoT", desc: "Arduino programming, sensors, actuators and IoT projects." },
  { icon: BookOpen, title: "AI & Robotics", desc: "AI basics, machine learning concepts and robotics integration." },
  { icon: Settings, title: "PCB & Controls", desc: "PCB design, introduction to control systems and industrial robotics." },
];

const teacherPrograms = [
  { title: "Robotics Teaching Methodology", desc: "How to teach robotics effectively in a classroom environment." },
  { title: "Lab Management", desc: "Day-to-day management of a robotics lab — safety, maintenance and scheduling." },
  { title: "Curriculum Integration", desc: "Integrating robotics with existing subjects like Math, Science and Computer Science." },
  { title: "Assessment & Evaluation", desc: "How to assess student projects and practical robotics skills." },
];

const benefits = [
  "Project-Based Learning Approach",
  "Industry Expert Trainers",
  "Hands-On Practical Sessions",
  "Coding & STEM Integration",
  "Competition Mentoring",
  "Certification on Completion",
];

export default function Training() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Training Programs
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Robotics Training for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Students & Teachers
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            From beginner to industrial expert — hands-on training programs
            designed for school students and educators.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-7 py-3.5 rounded-xl font-semibold transition">
            Enroll Your School <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Student Training */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
              <Trophy size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Student Training</h2>
          </div>
          <p className="text-slate-500 mb-10 max-w-xl">Beginner to Industrial Expert — structured learning path for school students.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {studentPrograms.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-cyan-50 rounded-lg flex items-center justify-center">
                    <Icon size={18} className="text-cyan-600" />
                  </div>
                  <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Level {i + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Training */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
              <Users size={20} className="text-cyan-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Teacher Training</h2>
          </div>
          <p className="text-slate-500 mb-10 max-w-xl">Equipping teachers with the skills and confidence to run a robotics lab effectively.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {teacherPrograms.map(({ title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-300 hover:shadow-sm transition">
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Training */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Why Our Training Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-cyan-300 transition">
                <CheckCircle size={18} className="text-cyan-600 flex-shrink-0" />
                <span className="font-medium text-slate-700 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Start Robotics Training at Your School</h2>
            <p className="text-white/80 mb-8">Empower students with future-ready skills — contact us today.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-cyan-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold transition">
              Book Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
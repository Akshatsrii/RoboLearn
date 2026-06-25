import {
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    title: "Student Robotics Training",
    icon: GraduationCap,
    description:
      "Hands-on robotics learning programs from beginner to advanced levels.",
  },
  {
    title: "Teacher Training",
    icon: Users,
    description:
      "Professional development workshops for teachers and educators.",
  },
  {
    title: "STEM Workshops",
    icon: BookOpen,
    description:
      "Interactive STEM learning sessions focused on innovation and creativity.",
  },
  {
    title: "Competition Preparation",
    icon: Trophy,
    description:
      "Training and mentoring for robotics competitions and hackathons.",
  },
];

const benefits = [
  "Project-based learning approach",
  "Industry expert trainers",
  "Hands-on robotics activities",
  "Coding & STEM integration",
  "Competition mentoring",
  "Certification programs",
];

export default function Training() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <GraduationCap size={60} className="mx-auto mb-6" />

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Robotics Training Programs
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Comprehensive robotics, coding and STEM training programs
            designed for students, teachers and educational institutions.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900">
          Our Training Programs
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Learn robotics through practical experiences and real-world projects.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <div
                key={program.title}
                className="border rounded-2xl p-8 hover:shadow-xl transition"
              >
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Icon size={30} className="text-cyan-600" />
                </div>

                <h3 className="text-2xl font-semibold mt-5 text-slate-900">
                  {program.title}
                </h3>

                <p className="text-slate-600 mt-3">
                  {program.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900">
            Why Choose Our Training?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="bg-white border rounded-xl p-5 flex items-center gap-3"
              >
                <CheckCircle
                  size={20}
                  className="text-cyan-600 flex-shrink-0"
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["10K+", "Students"],
              ["500+", "Workshops"],
              ["50+", "Schools"],
              ["20+", "Trainers"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border rounded-2xl p-8 text-center"
              >
                <h3 className="text-4xl font-bold text-cyan-600">
                  {value}
                </h3>
                <p className="text-slate-600 mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Start Your Robotics Journey Today
            </h2>

            <p className="text-lg opacity-90">
              Empower students with future-ready robotics and STEM skills.
            </p>

            <button className="mt-8 bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2">
              Enroll Now
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
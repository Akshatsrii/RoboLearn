import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  GraduationCap,
  Users,
  BookOpen,
  Award,
  FlaskConical,
} from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "Robotics Lab Setup",
    desc: "Complete robotics lab setup for schools.",
  },
  {
    icon: GraduationCap,
    title: "Student Training",
    desc: "Hands-on robotics and STEM training.",
  },
  {
    icon: Users,
    title: "Teacher Development",
    desc: "Professional training programs for teachers.",
  },
  {
    icon: BookOpen,
    title: "STEM Curriculum",
    desc: "Structured curriculum aligned with CBSE goals.",
  },
  {
    icon: FlaskConical,
    title: "Robotics Kits",
    desc: "Premium robotics kits and learning tools.",
  },
  {
    icon: Award,
    title: "Competition Prep",
    desc: "Training for robotics competitions and hackathons.",
  },
];

export default function Home() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full font-medium">
            India's Leading Robotics Education Platform
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold text-slate-900">
            Transform Your School With
            <span className="block text-cyan-600">
              Robotics & STEM
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Complete Robotics Lab Setup, Teacher Training,
            Student Programs and STEM Curriculum for Schools.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Get Free Consultation
            </Link>

            <Link
              to="/lab-setup"
              className="border border-slate-300 px-8 py-4 rounded-xl font-semibold"
            >
              Explore Labs
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["50+", "Schools"],
              ["10K+", "Students"],
              ["20+", "Trainers"],
              ["15+", "Cities"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow-sm border p-6 text-center"
              >
                <h3 className="text-4xl font-bold text-cyan-600">
                  {value}
                </h3>
                <p className="text-slate-600 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900">
            Our Services
          </h2>

          <p className="text-center text-slate-600 mt-4">
            Everything under one roof
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="bg-white border rounded-2xl p-6 hover:shadow-xl transition"
                >
                  <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center">
                    <Icon className="text-cyan-600" size={28} />
                  </div>

                  <h3 className="text-xl font-semibold mt-5 text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900">
            Why Choose RoboLearn?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {[
              "Complete robotics lab setup",
              "Teacher training support",
              "Student learning programs",
              "STEM curriculum integration",
              "Competition preparation",
              "Technical support & AMC",
            ].map((item) => (
              <div
                key={item}
                className="bg-white border rounded-xl p-5"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Set Up Your Robotics Lab?
            </h2>

            <p className="mt-4 text-lg">
              Get a free consultation for your school today.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold mt-8"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
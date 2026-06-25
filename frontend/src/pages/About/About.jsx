import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          About RoboLearn
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed">
          RoboLearn is dedicated to transforming education through
          Robotics, STEM learning, Coding and Innovation Labs.
          We help schools build future-ready learning environments
          with modern technology and hands-on learning experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="border rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-2">Mission</h3>
            <p className="text-slate-600">
              Empower students with practical STEM education.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-2">Vision</h3>
            <p className="text-slate-600">
              Create future innovators and problem solvers.
            </p>
          </div>

          <div className="border rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-2">Goal</h3>
            <p className="text-slate-600">
              Bring robotics education to every school.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 mt-10 bg-cyan-600 text-white px-6 py-3 rounded-xl"
        >
          Contact Us
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
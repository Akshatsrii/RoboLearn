import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Award, Users, School } from "lucide-react";

const values = [
  { icon: Target, title: "Mission", desc: "Empower every Indian school with practical robotics and STEM education that builds real-world skills." },
  { icon: Eye, title: "Vision", desc: "A future where every student has access to hands-on technology education regardless of geography." },
  { icon: Heart, title: "Purpose", desc: "Bridge the gap between classroom learning and industry-ready skills through robotics." },
];

const whyUs = [
  { icon: School, title: "50+ Schools", desc: "Trusted by principals and management across Rajasthan and beyond." },
  { icon: Users, title: "10,000+ Students", desc: "Hands-on training delivered to students across all grade levels." },
  { icon: Award, title: "Expert Team", desc: "Industry professionals with deep experience in robotics and STEM education." },
];

export default function About() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            About RoboLearn
          </span>
          <h1 className="text-5xl font-bold mb-6">
            Building India's Next Generation of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Innovators
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            RoboLearn is a Rajasthan-based robotics and STEM education company
            dedicated to helping schools build future-ready learning environments.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                RoboLearn was founded with a simple belief — every school in India deserves
                access to quality robotics and STEM education. We saw a massive gap between
                what schools were teaching and what the future demanded.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Starting from Rajasthan, we've helped 50+ schools set up robotics labs,
                trained 10,000+ students, and empowered hundreds of teachers with the skills
                to teach technology confidently.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Work With Us <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["50+", "Schools"],
                  ["10K+", "Students"],
                  ["20+", "Trainers"],
                  ["15+", "Cities"],
                ].map(([v, l]) => (
                  <div key={l} className="bg-white rounded-2xl p-6 text-center border border-slate-100">
                    <div className="text-3xl font-bold text-cyan-600 mb-1">{v}</div>
                    <div className="text-slate-500 text-sm">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">What Drives Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-md hover:border-cyan-300 transition">
                <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} className="text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">Why Choose RoboLearn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-8 border border-slate-200 rounded-2xl hover:shadow-md hover:border-cyan-300 transition">
                <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h2>
            <p className="text-white/80 mb-8">Let's build a robotics lab for your school together.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-cyan-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold transition">
              Get Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
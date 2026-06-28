import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, Award, Users, School, CheckCircle2, ShieldCheck, ExternalLink } from "lucide-react";
import SEO from "../components/SEO";

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

const team = [
  { name: "Aditya Rathore", role: "Founder & CEO", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80" },
  { name: "Meera Joshi", role: "Head of Curriculum", photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80" },
  { name: "Karan Vyas", role: "Lead Robotics Trainer", photo: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?auto=format&fit=crop&w=400&q=80" },
  { name: "Simran Kaur", role: "Teacher Training Lead", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
];

const certifications = [
  { icon: ShieldCheck, label: "ISO 9001 Certified" },
  { icon: Award, label: "CBSE Recommended Partner" },
  { icon: Award, label: "NEP 2020 Aligned Curriculum" },
  { icon: ShieldCheck, label: "State STEM Excellence Award 2025" },
];

const stats = [
  ["50+", "Schools"],
  ["10K+", "Students"],
  ["20+", "Trainers"],
  ["15+", "Cities"],
];

const timeline = [
  { year: "Year 1", text: "Started in Rajasthan with our first 3 school lab installations." },
  { year: "Year 2", text: "Crossed 1,000+ trained students and launched teacher certification." },
  { year: "Today", text: "50+ schools, 10,000+ students, and a curriculum used across 15+ cities." },
];

export default function About() {
  return (
    <div className="bg-white text-slate-900">
      <SEO
        title="About Us"
        description="RoboLearn is a Rajasthan-based robotics and STEM education company helping schools build future-ready learning environments."
        path="/about"
      />
      <style>{`
        @keyframes floatSlow { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes floatSlower { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-9px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
        .anim-float { animation: floatSlow 6s ease-in-out infinite; }
        .anim-float-slow { animation: floatSlower 7s ease-in-out infinite; }
        .anim-fadeup { animation: fadeUp .7s ease both; }
        .circuit-line { stroke-dasharray: 6 6; stroke-dashoffset: 240; animation: dash 3s linear forwards 0.3s; }
        @media (prefers-reduced-motion: reduce) {
          .anim-float, .anim-float-slow, .anim-fadeup, .circuit-line { animation: none !important; }
        }
      `}</style>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#061B33] py-28 lg:py-32">
        <svg className="absolute inset-0 w-full h-full opacity-[0.16]" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="#22d3ee" strokeWidth="1.2">
            <path className="circuit-line" d="M0 100 H260 V220 H520" />
            <path className="circuit-line" d="M1200 60 H880 V180 H640" />
            <path className="circuit-line" d="M0 500 H300 V380 H560" />
          </g>
          <g fill="#22d3ee">
            <circle cx="260" cy="100" r="4" /><circle cx="520" cy="220" r="4" />
            <circle cx="880" cy="60" r="4" /><circle cx="640" cy="180" r="4" />
            <circle cx="300" cy="500" r="4" /><circle cx="560" cy="380" r="4" />
          </g>
        </svg>

        <div className="relative max-w-4xl mx-auto px-6 text-center anim-fadeup">
          <span className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            About RoboLearn
          </span>
          <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
            Building India&rsquo;s next generation of{" "}
            <span className="text-cyan-400">innovators</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            RoboLearn is a Rajasthan-based robotics and STEM education company
            dedicated to helping schools build future-ready learning environments.
          </p>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Our Story</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">
                Started with a simple gap we couldn&rsquo;t ignore
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                RoboLearn was founded on a simple belief — every school in India
                deserves access to quality robotics and STEM education. We saw a
                widening gap between what schools were teaching and what the future demanded.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Starting from Rajasthan, we&rsquo;ve helped 50+ schools set up robotics labs,
                trained 10,000+ students, and given hundreds of teachers the confidence
                to teach technology hands-on.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-[#0b2545] hover:bg-cyan-600 text-white px-7 py-3.5 rounded-xl font-semibold mt-8 transition-colors"
              >
                Work With Us
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl anim-float">
                <img
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80"
                  alt="RoboLearn trainer guiding students with a robotics kit"
                  className="w-full h-[360px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-7 -left-7 bg-white rounded-2xl border border-slate-200 shadow-xl p-5 grid grid-cols-2 gap-4 w-[260px] anim-float-slow">
                {stats.map(([v, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">{v}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Our Journey</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">From 3 schools to a movement</h2>
          </div>

          <div className="mt-14 relative">
            <div className="hidden md:block absolute left-1/2 top-3 bottom-3 w-px bg-slate-200" />
            <div className="space-y-10 md:space-y-0">
              {timeline.map((item, i) => (
                <div key={item.year} className={`md:grid md:grid-cols-2 md:gap-10 items-center ${i !== 0 ? "md:mt-10" : ""}`}>
                  <div className={i % 2 === 0 ? "md:text-right" : "md:order-2 md:text-left"}>
                    <div className="inline-block bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <span className="text-cyan-600 font-bold text-sm tracking-wide">{item.year}</span>
                      <p className="mt-2 text-slate-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                  <div className={i % 2 === 0 ? "" : "md:order-1"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSION / VISION / VALUES ============ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">What drives us</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">Mission, vision, and purpose</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0b2545] flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
                  <Icon size={22} className="text-cyan-300 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-[#0b2545] mt-5">{title}</h3>
                <p className="mt-2.5 text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">Meet the Team</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">The people behind RoboLearn</h2>
            <p className="mt-4 text-slate-600">
              A small, hands-on team of educators and engineers who&rsquo;ve each spent years in classrooms and labs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {team.map(({ name, role, photo }) => (
              <div
                key={name}
                className="group bg-white border border-slate-200 rounded-2xl p-6 text-center hover:border-cyan-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-4 border-slate-100 group-hover:border-cyan-100 transition-colors duration-300">
                  <img src={photo} alt={name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-semibold text-[#0b2545] mt-4">{name}</h3>
                <p className="text-slate-500 text-sm mt-1">{role}</p>
                <a
                  href="#"
                  aria-label={`${name} on LinkedIn`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition-colors mt-4"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-24 bg-[#061B33] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Why Choose Us</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Numbers schools trust</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Icon size={26} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mt-5">{title}</h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {["CBSE-aligned", "On-site & remote support", "AMC included"].map((tag) => (
              <span key={tag} className="flex items-center gap-2 bg-white/5 border border-white/10 text-slate-200 text-sm px-4 py-2 rounded-full">
                <CheckCircle2 size={14} className="text-cyan-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS & AWARDS ============ */}
      <section className="py-24 bg-[#061B33] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-cyan-400 font-semibold text-sm tracking-wide uppercase">Certifications & Awards</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Recognized standards, not just promises</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {certifications.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                  <Icon size={22} className="text-cyan-400" />
                </div>
                <span className="text-slate-200 text-sm font-medium leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] via-[#0e3a63] to-cyan-600 p-12 text-white">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <circle cx="40" cy="40" r="90" fill="white" />
                <circle cx="380" cy="180" r="120" fill="white" />
              </svg>
            </div>
            <h2 className="relative text-3xl md:text-4xl font-bold">Ready to partner with us?</h2>
            <p className="relative mt-4 text-cyan-50/90">Let&rsquo;s build a robotics lab for your school together.</p>
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 bg-white text-[#0b2545] hover:bg-cyan-50 px-8 py-4 rounded-xl font-semibold mt-8 transition-colors"
            >
              Get Free Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
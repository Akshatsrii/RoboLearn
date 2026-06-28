import { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, ShieldCheck, Award, Star } from "lucide-react";
import { getPublicTestimonials, getPartners } from "../../services/testimonialService";

const staticTestimonials = [
  {
    name: "Dr. Anita Sharma",
    role: "Principal, Sunrise Public School",
    text: "RoboLearn didn't just install a lab — they trained our teachers to run it independently. Our students built and presented their own bots within six weeks.",
    rating: 5,
  },
  {
    name: "Rajesh Mehta",
    role: "Director, Greenfield Academy",
    text: "The teacher training program gave our staff real confidence. What stood out was the ongoing support — they're still just a call away, months later.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "STEM Coordinator, Vidya Niketan School",
    text: "Curriculum was exactly aligned with our CBSE goals, and the kits were durable enough to survive a full year of enthusiastic 6th graders.",
    rating: 5,
  },
];

const staticPartnerSchools = [
  "Sunrise Public School",
  "Greenfield Academy",
  "Vidya Niketan School",
  "St. Xavier's High School",
  "Modern Convent School",
  "DAV Public School",
];

const certifications = [
  { icon: ShieldCheck, label: "ISO 9001 Certified" },
  { icon: Award, label: "CBSE Recommended Partner" },
  { icon: Award, label: "NEP 2020 Aligned Curriculum" },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [partnerSchools, setPartnerSchools] = useState(staticPartnerSchools);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getPublicTestimonials()
      .then((res) => {
        if (res.data?.data?.length > 0) setTestimonials(res.data.data);
      })
      .catch(() => {}); // keep static fallback on failure

    getPartners()
      .then((res) => {
        if (res.data?.data?.length > 0) {
          setPartnerSchools(res.data.data.map((p) => p.schoolName));
        }
      })
      .catch(() => {});
  }, []);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const active = testimonials[index];

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollLogos { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .anim-fadein { animation: fadeIn .4s ease both; }
        .logo-track { animation: scrollLogos 28s linear infinite; }
        .logo-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .anim-fadein, .logo-track { animation: none !important; }
        }
      `}</style>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <span className="text-cyan-600 font-semibold text-sm tracking-wide uppercase">
              Success Stories
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-[#0b2545]">
              What schools say about us
            </h2>
          </div>

          <div className="relative mt-14">
            <div key={index} className="anim-fadein bg-white border border-slate-200 rounded-3xl p-8 md:p-10 text-center shadow-sm">
              <Quote size={32} className="text-cyan-200 mx-auto mb-5" />

              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
                "{active.text}"
              </p>

              <div className="mt-7">
                <p className="font-semibold text-[#0b2545]">{active.name}</p>
                <p className="text-sm text-slate-500">{active.role}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-7">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-cyan-300 hover:text-cyan-600 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-cyan-500" : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-cyan-300 hover:text-cyan-600 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PARTNER SCHOOLS ============ */}
      <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Trusted by 50+ schools across India
          </p>
        </div>

        <div className="relative">
          <div className="flex w-max logo-track">
            {[...partnerSchools, ...partnerSchools].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2 px-8 whitespace-nowrap text-slate-400 font-semibold text-lg flex-shrink-0"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATIONS ============ */}
      <section className="py-16 bg-[#061B33] relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-5">
            {certifications.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <span className="text-slate-200 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
import {
  Cpu,
  CheckCircle,
  Wrench,
  Monitor,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const features = [
  "Complete Robotics Lab Design",
  "Hardware & Equipment Installation",
  "Teacher Training Programs",
  "Student Hands-on Workshops",
  "Annual Maintenance Support",
  "STEM Curriculum Integration",
];

const equipment = [
  {
    title: "Robotics Kits",
    icon: Cpu,
    desc: "Advanced robotics kits for practical learning.",
  },
  {
    title: "Computers & Software",
    icon: Monitor,
    desc: "Modern systems with coding and robotics tools.",
  },
  {
    title: "Lab Infrastructure",
    icon: Wrench,
    desc: "Complete lab setup and workspace planning.",
  },
  {
    title: "Training Support",
    icon: GraduationCap,
    desc: "Teacher and student training sessions.",
  },
];

export default function LabSetup() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <Cpu size={60} className="mx-auto mb-6" />

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Robotics Lab Setup
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Complete end-to-end robotics lab setup solutions for schools,
            colleges and educational institutions.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Build a Future-Ready Robotics Lab
            </h2>

            <p className="text-slate-600 leading-relaxed mb-8">
              We help schools establish world-class robotics laboratories with
              modern equipment, structured curriculum, teacher training and
              long-term support.
            </p>

            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle
                    size={20}
                    className="text-cyan-600"
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200"
              alt="Robotics Lab"
              className="rounded-3xl shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900">
            What We Provide
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {equipment.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white border rounded-2xl p-6 text-center hover:shadow-xl transition"
                >
                  <div className="w-16 h-16 mx-auto bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Icon
                      size={30}
                      className="text-cyan-600"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mt-5">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 mt-3">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            Our Process
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Consultation",
              "Planning",
              "Installation",
              "Training",
            ].map((step, index) => (
              <div
                key={step}
                className="border rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <h3 className="font-semibold mt-4">
                  {step}
                </h3>
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
              Ready to Build Your Robotics Lab?
            </h2>

            <p className="text-lg opacity-90">
              Get a customized robotics lab proposal for your institution.
            </p>

            <button className="mt-8 bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2">
              Get Free Consultation
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
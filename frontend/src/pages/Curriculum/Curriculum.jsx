import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  Brain,
  Cpu,
} from "lucide-react";

const curriculumLevels = [
  {
    title: "Primary School",
    classes: "Class 3 - 5",
    description:
      "Introduction to robotics, basic electronics, logical thinking and creativity.",
    icon: Brain,
  },
  {
    title: "Middle School",
    classes: "Class 6 - 8",
    description:
      "Sensors, motors, block coding, problem solving and STEM projects.",
    icon: Cpu,
  },
  {
    title: "Senior School",
    classes: "Class 9 - 12",
    description:
      "Advanced robotics, programming, AI concepts, IoT and innovation projects.",
    icon: GraduationCap,
  },
];

const features = [
  "CBSE & STEM aligned curriculum",
  "Project-based learning approach",
  "Teacher guides and lesson plans",
  "Assessment and evaluation modules",
  "Competition preparation support",
  "Hands-on practical activities",
];

export default function Curriculum() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <BookOpen size={60} className="mx-auto mb-6" />

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            STEM Curriculum
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Structured robotics and STEM curriculum designed to build
            creativity, innovation and problem-solving skills for students.
          </p>
        </div>
      </section>

      {/* Curriculum Levels */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900">
          Learning Levels
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {curriculumLevels.map((level) => {
            const Icon = level.icon;

            return (
              <div
                key={level.title}
                className="border rounded-2xl p-8 hover:shadow-xl transition"
              >
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Icon className="text-cyan-600" size={28} />
                </div>

                <h3 className="text-2xl font-semibold mt-5">
                  {level.title}
                </h3>

                <p className="text-cyan-600 font-medium mt-2">
                  {level.classes}
                </p>

                <p className="text-slate-600 mt-4">
                  {level.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900">
            What's Included?
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {features.map((feature) => (
              <div
                key={feature}
                className="bg-white border rounded-xl p-5 flex items-center gap-3"
              >
                <CheckCircle
                  size={20}
                  className="text-cyan-600 flex-shrink-0"
                />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Introduce STEM Learning?
            </h2>

            <p className="text-lg opacity-90">
              Bring future-ready robotics education to your school.
            </p>

            <button className="mt-8 bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
import {
  Cpu,
  Bot,
  Microchip,
  Wrench,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

const products = [
  {
    title: "Beginner Robotics Kit",
    icon: Bot,
    description:
      "Perfect for students starting their robotics journey with easy-to-build projects.",
  },
  {
    title: "Advanced Robotics Kit",
    icon: Cpu,
    description:
      "Advanced robotics platform with sensors, motors and programming support.",
  },
  {
    title: "Electronics Components",
    icon: Microchip,
    description:
      "Sensors, Arduino boards, controllers, motors and electronic accessories.",
  },
  {
    title: "Lab Tools & Equipment",
    icon: Wrench,
    description:
      "Professional tools required for robotics labs and STEM learning spaces.",
  },
];

export default function Products() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <ShoppingBag size={60} className="mx-auto mb-6" />

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Robotics Products
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            High-quality robotics kits, STEM tools, electronics components
            and educational products for schools and institutions.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-slate-900">
          Our Products
        </h2>

        <p className="text-center text-slate-600 mt-4">
          Everything you need for robotics and STEM education.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {products.map((product) => {
            const Icon = product.icon;

            return (
              <div
                key={product.title}
                className="border rounded-2xl p-6 hover:shadow-xl transition"
              >
                <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Icon
                    size={30}
                    className="text-cyan-600"
                  />
                </div>

                <h3 className="text-xl font-semibold mt-5 text-slate-900">
                  {product.title}
                </h3>

                <p className="text-slate-600 mt-3">
                  {product.description}
                </p>

                <button className="mt-6 text-cyan-600 font-semibold flex items-center gap-2">
                  Learn More
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-slate-900">
            Why Choose Our Products?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold text-xl mb-3">
                Premium Quality
              </h3>
              <p className="text-slate-600">
                Carefully selected products designed for education.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold text-xl mb-3">
                Easy Learning
              </h3>
              <p className="text-slate-600">
                Student-friendly kits with guided activities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="font-semibold text-xl mb-3">
                Technical Support
              </h3>
              <p className="text-slate-600">
                Dedicated support for schools and educators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Looking for Robotics Equipment?
            </h2>

            <p className="text-lg opacity-90">
              Get expert guidance and the best products for your robotics lab.
            </p>

            <button className="mt-8 bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold">
              Request Catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
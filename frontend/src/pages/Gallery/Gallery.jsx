import { Camera } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
  "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780",
  "https://images.unsplash.com/photo-1527430253228-e93688616381",
];

export default function Gallery() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <Camera size={60} className="mx-auto mb-6" />

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Gallery
          </h1>

          <p className="max-w-3xl mx-auto text-lg opacity-90">
            Explore our robotics labs, STEM activities, workshops,
            competitions and student innovations.
          </p>
        </div>
      </section>

      {/* Images */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <img
                src={image}
                alt={`Robotics Gallery ${index + 1}`}
                className="w-full h-72 object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Experience Robotics in Action
            </h2>

            <p className="text-lg opacity-90">
              Join schools across India building future innovators through STEM.
            </p>

            <button className="mt-8 bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
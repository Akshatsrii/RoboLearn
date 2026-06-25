import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-center text-slate-900">
          Contact Us
        </h1>

        <p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto">
          Get in touch with our team to discuss robotics labs, STEM programs,
          teacher training, and school partnerships.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex gap-4 p-5 border rounded-2xl">
              <Phone className="text-cyan-600" />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-slate-600">+91 99999 99999</p>
              </div>
            </div>

            <div className="flex gap-4 p-5 border rounded-2xl">
              <Mail className="text-cyan-600" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-slate-600">info@robolearn.com</p>
              </div>
            </div>

            <div className="flex gap-4 p-5 border rounded-2xl">
              <MapPin className="text-cyan-600" />
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-slate-600">
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border rounded-2xl p-8">
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <input
                type="text"
                placeholder="School Name"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
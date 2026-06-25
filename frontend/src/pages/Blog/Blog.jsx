import { Calendar, ArrowRight } from "lucide-react";

const blogs = [
  {
    title: "Why Robotics Education Matters in Schools",
    date: "June 2026",
    desc: "Discover how robotics helps students develop problem-solving and critical thinking skills.",
  },
  {
    title: "STEM Learning for the Future",
    date: "June 2026",
    desc: "Learn how STEM education prepares students for tomorrow's careers.",
  },
  {
    title: "Building Innovation Through Robotics Labs",
    date: "June 2026",
    desc: "Explore the benefits of setting up robotics labs in schools.",
  },
];

export default function Blog() {
  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-center text-slate-900">
          Our Blog
        </h1>

        <p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto">
          Insights, articles and updates from the world of Robotics,
          STEM Education and Innovation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {blogs.map((blog) => (
            <div
              key={blog.title}
              className="border rounded-2xl p-6 hover:shadow-xl transition"
            >
              <div className="flex items-center gap-2 text-cyan-600 mb-4">
                <Calendar size={18} />
                <span>{blog.date}</span>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {blog.title}
              </h3>

              <p className="text-slate-600 mb-6">
                {blog.desc}
              </p>

              <button className="flex items-center gap-2 text-cyan-600 font-semibold">
                Read More
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  {
    key: "coverImage",
    label: "Cover",
    render: (val) => val
      ? <img src={val} alt="" className="w-16 h-10 object-cover rounded-lg border border-slate-100" onError={(e) => { e.target.style.display = "none"; }} />
      : <span className="text-slate-300 text-xs">No image</span>,
  },
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "author", label: "Author" },
  {
    key: "isPublished",
    label: "Published",
    render: (val) => (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${val ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
        {val ? "Published" : "Draft"}
      </span>
    ),
  },
];

const fields = [
  { name: "title", label: "Title *", type: "text" },
  { name: "slug", label: "Slug (auto-generated if empty)", type: "text" },
  { name: "excerpt", label: "Excerpt *", type: "textarea" },
  { name: "content", label: "Content * (supports HTML)", type: "textarea" },
  { name: "category", label: "Category", type: "select", options: ["robotics", "ai", "stem", "coding", "education"] },
  { name: "coverImage", label: "Cover Image URL", type: "text" },
  { name: "readTime", label: "Read Time (minutes)", type: "number" },
  { name: "author", label: "Author Name", type: "text" },
  { name: "tags", label: "Tags (comma-separated)", type: "text" },
  { name: "isPublished", label: "Publish immediately", type: "checkbox" },
];

const emptyItem = {
  title: "", slug: "", excerpt: "", content: "",
  category: "education", coverImage: "", readTime: 5,
  author: "RoboLearn Team", tags: "", isPublished: true,
};

export default function AdminBlogs() {
  return (
    <AdminResourceTable
      resource="/blogs"
      title="Blogs"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "readTime", label: "Read Time (min)" },
  { key: "isPublished", label: "Published" },
];

const fields = [
  { name: "title", label: "Title", type: "text" },
  { name: "excerpt", label: "Excerpt", type: "textarea" },
  { name: "content", label: "Content", type: "textarea" },
  { name: "category", label: "Category", type: "select", options: ["robotics", "ai", "stem", "coding", "education"] },
  { name: "coverImage", label: "Cover Image URL", type: "text" },
  { name: "readTime", label: "Read Time (minutes)", type: "number" },
  { name: "isPublished", label: "Published", type: "checkbox" },
];

const emptyItem = {
  title: "", excerpt: "", content: "", category: "education",
  coverImage: "", readTime: 5, isPublished: true,
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
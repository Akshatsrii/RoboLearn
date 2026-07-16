import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  {
    key: "imageUrl",
    label: "Photo",
    render: (val) => val
      ? <img src={val} alt="" className="w-16 h-12 object-cover rounded-lg border border-slate-100" onError={(e) => { e.target.style.display = "none"; }} />
      : <span className="text-slate-300 text-xs">No image</span>,
  },
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "schoolName", label: "School" },
];

const fields = [
  { name: "title", label: "Title *", type: "text" },
  { name: "imageUrl", label: "Image URL *", type: "text" },
  { name: "category", label: "Category", type: "select", options: ["labs", "workshops", "events", "competitions", "student-activities"] },
  { name: "schoolName", label: "School Name", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];

const emptyItem = {
  title: "", imageUrl: "", category: "labs",
  schoolName: "", location: "", description: "",
};

export default function AdminGallery() {
  return (
    <AdminResourceTable
      resource="/gallery"
      title="Gallery"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
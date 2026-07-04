import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "schoolName", label: "School" },
];

const fields = [
  { name: "title", label: "Title *", type: "text" },
  { name: "imageUrl", label: "Image URL *", type: "text" },
  { name: "category", label: "Category", type: "select", options: ["labs", "workshops", "events", "competitions"] },
  { name: "schoolName", label: "School Name", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
];

const emptyItem = {
  title: "", imageUrl: "", category: "labs", schoolName: "", description: "",
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
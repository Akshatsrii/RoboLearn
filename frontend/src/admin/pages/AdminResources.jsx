import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
  { key: "fileSize", label: "Size" },
  { key: "downloadCount", label: "Downloads" },
];

const fields = [
  { name: "title", label: "Title *", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "category", label: "Category", type: "select", options: ["Brochures", "Curriculum Guides", "Case Studies", "Setup Guides"] },
  { name: "fileUrl", label: "File URL (upload via /api/upload first) *", type: "text" },
  { name: "fileSize", label: "File Size (e.g. 2.4 MB)", type: "text" },
];

const emptyItem = {
  title: "", description: "", category: "Brochures",
  fileUrl: "", fileSize: "",
};

export default function AdminResources() {
  return (
    <AdminResourceTable
      resource="/resources"
      title="Resources"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "title", label: "Title" },
  { key: "audience", label: "Audience" },
  { key: "level", label: "Level" },
  { key: "isActive", label: "Active" },
];

const fields = [
  { name: "title", label: "Title", type: "text" },
  { name: "audience", label: "Audience", type: "select", options: ["student", "teacher"] },
  { name: "level", label: "Level", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "duration", label: "Duration (e.g. 6 weeks)", type: "text" },
  { name: "isActive", label: "Active", type: "checkbox" },
];

const emptyItem = { title: "", audience: "student", level: "", description: "", duration: "", isActive: true };

export default function AdminCourses() {
  return (
    <AdminResourceTable
      resource="/courses"
      title="Courses"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
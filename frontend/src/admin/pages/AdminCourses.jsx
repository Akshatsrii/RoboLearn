import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "title", label: "Title" },
  { key: "audience", label: "Audience" },
  { key: "level", label: "Level" },
  { key: "duration", label: "Duration" },
  { key: "isActive", label: "Active", render: (val) => (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${val ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
      {val ? "Yes" : "No"}
    </span>
  )},
];

const fields = [
  { name: "title", label: "Course Title *", type: "text" },
  { name: "audience", label: "Audience", type: "select", options: ["student", "teacher"] },
  { name: "level", label: "Level (e.g. Beginner, Level 1)", type: "text" },
  { name: "description", label: "Description *", type: "textarea" },
  { name: "duration", label: "Duration (e.g. 6 weeks)", type: "text" },
  { name: "isActive", label: "Active", type: "checkbox" },
];

const emptyItem = {
  title: "", audience: "student", level: "",
  description: "", duration: "", isActive: true,
};

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
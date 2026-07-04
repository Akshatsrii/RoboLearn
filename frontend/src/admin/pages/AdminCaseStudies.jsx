import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "schoolName", label: "School" },
  { key: "location", label: "Location" },
  { key: "metric", label: "Key Metric" },
  { key: "isPublished", label: "Published", render: (val) => (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${val ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
      {val ? "Yes" : "Draft"}
    </span>
  )},
];

const fields = [
  { name: "schoolName", label: "School Name *", type: "text" },
  { name: "location", label: "Location (e.g. Bhilwara, Rajasthan)", type: "text" },
  { name: "coverImage", label: "Cover Image URL *", type: "text" },
  { name: "metric", label: "Key Metric (e.g. 3x STEM enrollment)", type: "text" },
  { name: "problem", label: "Problem *", type: "textarea" },
  { name: "solution", label: "Solution *", type: "textarea" },
  { name: "implementation", label: "Implementation *", type: "textarea" },
  { name: "result", label: "Result *", type: "textarea" },
  { name: "isPublished", label: "Published", type: "checkbox" },
];

const emptyItem = {
  schoolName: "", location: "", coverImage: "", metric: "",
  problem: "", solution: "", implementation: "", result: "",
  isPublished: true,
};

export default function AdminCaseStudies() {
  return (
    <AdminResourceTable
      resource="/case-studies"
      title="Case Studies"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
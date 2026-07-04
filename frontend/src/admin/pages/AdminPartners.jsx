import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "schoolName", label: "School Name" },
  { key: "city", label: "City" },
  { key: "studentsImpacted", label: "Students" },
  { key: "isActive", label: "Active", render: (val) => (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${val ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
      {val ? "Yes" : "No"}
    </span>
  )},
];

const fields = [
  { name: "schoolName", label: "School Name *", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "logoUrl", label: "Logo URL", type: "text" },
  { name: "studentsImpacted", label: "Students Impacted", type: "number" },
  { name: "isActive", label: "Show on Home page (Partner Schools strip)", type: "checkbox" },
];

const emptyItem = {
  schoolName: "", city: "", logoUrl: "",
  studentsImpacted: 0, isActive: true,
};

export default function AdminPartners() {
  return (
    <AdminResourceTable
      resource="/partners"
      title="Partners"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "rating", label: "Rating" },
  { key: "isApproved", label: "Approved", render: (val) => (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${val ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
      {val ? "Yes" : "Pending"}
    </span>
  )},
];

const fields = [
  { name: "name", label: "Person Name *", type: "text" },
  { name: "role", label: "Role (e.g. Principal, Sunrise Public School) *", type: "text" },
  { name: "text", label: "Testimonial Text *", type: "textarea" },
  { name: "rating", label: "Rating (1-5)", type: "number" },
  { name: "photoUrl", label: "Photo URL", type: "text" },
  { name: "isApproved", label: "Approved (shows on Home page)", type: "checkbox" },
  { name: "isFeatured", label: "Featured", type: "checkbox" },
];

const emptyItem = {
  name: "", role: "", text: "", rating: 5,
  photoUrl: "", isApproved: false, isFeatured: false,
};

export default function AdminTestimonials() {
  return (
    <AdminResourceTable
      resource="/testimonials"
      title="Testimonials"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
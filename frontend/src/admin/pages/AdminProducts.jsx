import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  {
    key: "images",
    label: "Image",
    render: (val) => {
      const src = Array.isArray(val) ? val[0] : val;
      return src ? (
        <img src={src} alt="" className="w-12 h-12 object-cover rounded-lg border border-slate-100" onError={(e) => { e.target.style.display = "none"; }} />
      ) : <span className="text-slate-300 text-xs">No image</span>;
    },
  },
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", render: (val) => val ? `₹${val.toLocaleString("en-IN")}` : "Contact for Price" },
  {
    key: "inStock",
    label: "In Stock",
    render: (val) => (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${val ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
        {val ? "Yes" : "No"}
      </span>
    ),
  },
  {
    key: "isFeatured",
    label: "Featured",
    render: (val) => val ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Yes</span> : "—",
  },
];

const fields = [
  { name: "name", label: "Product Name *", type: "text" },
  { name: "description", label: "Description *", type: "textarea" },
  { name: "shortDescription", label: "Short Description", type: "text" },
  { name: "category", label: "Category", type: "select", options: ["robotics-kit", "ai-kit", "iot-kit", "experimental-tools", "educational"] },
  { name: "level", label: "Level", type: "select", options: ["beginner", "intermediate", "advanced"] },
  { name: "price", label: "Price (₹)", type: "number" },
  { name: "originalPrice", label: "Original Price (₹) — for discount display", type: "number" },
  { name: "imageUrl", label: "Main Image URL (paste image link)", type: "text" },
  { name: "inStock", label: "In Stock", type: "checkbox" },
  { name: "isFeatured", label: "Featured on Home page", type: "checkbox" },
];

const emptyItem = {
  name: "", description: "", shortDescription: "",
  category: "robotics-kit", level: "beginner",
  price: "", originalPrice: "", imageUrl: "",
  inStock: true, isFeatured: false,
};

export default function AdminProducts() {
  return (
    <AdminResourceTable
      resource="/products"
      title="Products"
      columns={columns}
      fields={fields}
      emptyItem={emptyItem}
    />
  );
}
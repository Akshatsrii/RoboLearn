import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", render: (val) => val ? `₹${val}` : "Contact for Price" },
  { key: "inStock", label: "In Stock", render: (val) => (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${val ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
      {val ? "Yes" : "No"}
    </span>
  )},
];

const fields = [
  { name: "name", label: "Product Name *", type: "text" },
  { name: "description", label: "Description *", type: "textarea" },
  { name: "category", label: "Category", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
  { name: "price", label: "Price (₹) — leave blank for 'Contact for Price'", type: "number" },
  { name: "imageUrl", label: "Image URL", type: "text" },
  { name: "inStock", label: "In Stock", type: "checkbox" },
  { name: "isFeatured", label: "Featured on Home page", type: "checkbox" },
];

const emptyItem = {
  name: "", description: "", category: "Beginner",
  price: "", imageUrl: "", inStock: true, isFeatured: false,
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
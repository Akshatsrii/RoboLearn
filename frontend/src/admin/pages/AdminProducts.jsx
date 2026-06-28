import AdminResourceTable from "../components/AdminResourceTable";

const columns = [
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "inStock", label: "In Stock" },
];

const fields = [
  { name: "name", label: "Product Name", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "category", label: "Category", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
  { name: "price", label: "Price (₹, leave blank for 'Contact for Price')", type: "number" },
  { name: "imageUrl", label: "Image URL", type: "text" },
  { name: "inStock", label: "In Stock", type: "checkbox" },
];

const emptyItem = { name: "", description: "", category: "Beginner", price: "", imageUrl: "", inStock: true };

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
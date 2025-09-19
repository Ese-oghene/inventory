import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setLoading(false);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      alert("✅ Product deleted successfully");
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product");
    }
  };

  // Prevent rendering until role is loaded
  if (loading || !role) return <p>Loading...</p>;

  return (
    <DashboardLayout role={role}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          ➕ Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden shadow text-sm md:text-base">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">SKU</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Stock</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{p.sku}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">₦{p.price}</td>
                  <td className="px-4 py-2">{p.stock_qty ?? 0}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminProductsPage;


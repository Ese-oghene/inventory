import React, { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    setLoading(false);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      console.log("Fetched products:", res.data.data);
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Prevent rendering until role is loaded
  if (loading || !role) return <p>Loading...</p>;

  return (
    <DashboardLayout role={role}>
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-4 py-2 border">SKU</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{p.sku}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">₦{p.price}</td>
                <td className="px-4 py-2">{p.stock_qty ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export default AdminProductsPage;

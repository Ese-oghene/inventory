import React from 'react'
import { useEffect, useState } from "react";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";

const AdminProductPage = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-brown-700 text-white">
            <th className="p-2 border">SKU</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border">
              <td className="p-2 border">{p.sku}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.price}₦</td>
              <td className="p-2 border">{p.stock_qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  )
}

export default AdminProductPage

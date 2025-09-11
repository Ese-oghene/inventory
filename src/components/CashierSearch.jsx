import React, { useState } from "react";
import api from "../api/api";

const CashierSearch = ({ onAddToCart }) => {
  const [sku, setSku] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const searchProduct = async () => {
    try {
      const res = await api.get(`/products/${sku}`);
      setProduct(res.data.data);
    } catch {
      alert("Product not found!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-xl font-semibold text-primary mb-4">
        🔍 Search Product by SKU
      </h2>

      {/* Search Box */}
      <div className="flex gap-3">
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Enter product SKU..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button
          onClick={searchProduct}
          className="bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Product Result */}
      {product && (
        <div className="mt-5 p-4 border rounded-xl bg-gray-50 shadow-sm">
          <p className="text-lg font-bold text-gray-800">{product.name}</p>
          <p className="text-gray-600 mb-3">Price: ₦{product.price}</p>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-lg px-3 py-1 w-20 focus:ring-2 focus:ring-primary"
            />

            <button
              onClick={() => onAddToCart({ ...product, quantity })}
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg shadow transition"
            >
              ➕ Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierSearch;



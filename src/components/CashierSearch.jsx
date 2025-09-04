import React from 'react'
import { useState } from "react";
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
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-2">Search Product by SKU</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Enter SKU"
          className="border p-2 rounded w-full"
        />
        <button onClick={searchProduct} className="bg-brown-700 text-black px-3 rounded">Search</button>
      </div>
      {product && (
        <div className="mt-3 border p-3 rounded bg-gray-50">
          <p><strong>{product.name}</strong> - {product.price}₦</p>
           <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-1 w-16 mr-2"
          />

          <button
            onClick={() => onAddToCart({ ...product, quantity })}
            className="mt-2 bg-black text-white px-3 py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  )
}

export default CashierSearch

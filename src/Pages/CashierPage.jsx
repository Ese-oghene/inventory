import React from 'react'
import { useState } from "react";
import CashierSearch from "../components/CashierSearch";
import CashierCart from "../components/CashierCart";
import api from "../api/api";
import DashboardLayout from "../components/DashboardLayout";

const CashierPage = () => {

    const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>

            item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity } // ✅ add the chosen quantity
          : item
          
          // item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: product.quantity}]);
  
    }
  };

  const checkout = async () => {
    try {
      await api.post("/sales", {
        items: cart.map((item) => ({
          // product_id: item.id,
           sku: item.sku,       // ✅ backend expects sku
          quantity: item.quantity,
        })),
      });
      alert("Sale recorded successfully!");
      setCart([]);
    } catch {
      alert("Failed to record sale.");
    }
  };
  return (
     <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">Cashier</h1>
      <CashierSearch onAddToCart={addToCart} />
      <CashierCart cart={cart} onCheckout={checkout} />
    </DashboardLayout>
  )
}

export default CashierPage

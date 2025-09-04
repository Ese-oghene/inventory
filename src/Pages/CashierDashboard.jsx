import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, DollarSign, Package } from "lucide-react";

const CashierDashboar = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Cashier!</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-4">
          <ShoppingCart size={32} className="text-primary" />
          <div>
            <p className="text-gray-500 text-sm">New Sale</p>
            <Link
              to="/cashier/sale"
              className="text-black font-semibold hover:text-primary transition"
            >
              Go to Sale
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-4">
          <DollarSign size={32} className="text-primary" />
          <div>
            <p className="text-gray-500 text-sm">Today’s Sales</p>
            <p className="text-black font-semibold">₦120,000</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4 flex items-center gap-4">
          <Package size={32} className="text-primary" />
          <div>
            <p className="text-gray-500 text-sm">Pending Orders</p>
            <p className="text-black font-semibold">8</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Quick Links</h2>
        <div className="flex gap-4">
          <Link
            to="/cashier/sale"
            className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary-dark transition"
          >
            New Sale
          </Link>
          <Link
            to="/cashier/history"
            className="bg-gray-200 text-black px-4 py-2 rounded shadow hover:bg-gray-300 transition"
          >
            Sales History
          </Link>
          <Link
            to="/cashier/returns"
            className="bg-gray-200 text-black px-4 py-2 rounded shadow hover:bg-gray-300 transition"
          >
            Returns
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CashierDashboar

import React from "react";
import { Link } from "react-router-dom";
import { X, Home, ShoppingCart, History, RotateCcw, Package, BarChart3, Layers, Users, Settings, FileText } from "lucide-react";

const Sidebar = ({ role, onClose }) => {
  console.log("Sidebar role:", role);

  // helper function for link classes
  const linkClasses = "flex items-center gap-3 px-3 py-2 rounded hover:bg-primary hover:text-white transition";

  return (
    <aside className="bg-gray-100 text-black w-64 h-full flex flex-col p-6 shadow-lg">
      {/* Mobile close button */}
      {onClose && (
        <button
          className="md:hidden mb-6 p-2 rounded bg-primary hover:bg-primary-dark text-white transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      )}

      <h2 className="text-lg font-bold mb-6">Menu</h2>

      <ul className="space-y-3 flex-1">
        {/* Cashier Links */}
        {role === "cashier" && (
          <>
            <li>
              <Link to="/cashier/dashboard" className={linkClasses} onClick={onClose}>
                <Home size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/cashier/sale" className={linkClasses} onClick={onClose}>
                <ShoppingCart size={18} /> New Sale
              </Link>
            </li>
            <li>
              <Link to="/cashier/history" className={linkClasses} onClick={onClose}>
                <History size={18} /> Sales History
              </Link>
            </li>
            <li>
              <Link to="/cashier/returns" className={linkClasses} onClick={onClose}>
                <RotateCcw size={18} /> Returns
              </Link>
            </li>
          </>
        )}

        {/* Admin Links */}
        {role === "admin" && (
          <>
            <li>
              <Link to="/admin/products" className={linkClasses} onClick={onClose}>
                <Package size={18} /> Products
              </Link>
            </li>
            <li>
              <Link to="/admin/sales" className={linkClasses} onClick={onClose}>
                <BarChart3 size={18} /> Sales
              </Link>
            </li>
            <li>
              <Link to="/admin/inventory" className={linkClasses} onClick={onClose}>
                <Layers size={18} /> Inventory
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className={linkClasses} onClick={onClose}>
                <ClipboardList size={18} /> Categories
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className={linkClasses} onClick={onClose}>
                <FileText size={18} /> CEO Reports
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className={linkClasses} onClick={onClose}>
                <Users size={18} /> User Management
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className={linkClasses} onClick={onClose}>
                <Settings size={18} /> Settings
              </Link>
            </li>
          </>
        )}
      </ul>

      <footer className="mt-auto text-sm text-gray-600">
        © {new Date().getFullYear()} Sales Inventory
      </footer>
    </aside>
  );
};

export default Sidebar;

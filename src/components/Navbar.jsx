import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-gray-100 text-black px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded bg-primary hover:bg-primary-dark text-white transition"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
         {/* <h1 className="text-xl font-bold tracking-wide">KIMVIA'S LUXURIES</h1> */}
      
        <h1 className="text-xl font-bold tracking-wide">Sales Inventory</h1>
      </div>

      <button
        className="bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-primary-dark transition"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Menu } from "lucide-react";
// import logo from "../assets/logo.png"; // Ensure you have a logo image in assets folder

// const Navbar = ({ onToggleSidebar }) => {
//   return (
//     <nav className="bg-gray-100 text-black px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
//       <div className="flex items-center gap-3">
//         {/* Mobile menu button */}
//         <button
//           className="md:hidden p-2 rounded bg-primary hover:bg-primary-dark text-white transition"
//           onClick={onToggleSidebar}
//         >
//           <Menu size={20} />
//         </button>

//         <div className="flex items-center gap-2">
//           <img
//            src={logo}  // ✅ use imported logo
//             alt="Logo"
//             className="hidden md:block w-10 h-10 object-contain rounded"
//           />
//           <h1 className="text-xl font-bold tracking-wide">KIMVIA LUXURIES</h1>
//         </div>
//          {/* <h1 className="text-xl font-bold tracking-wide">KIMVIA LUXURIES</h1> */}
      
//       </div>

//       <button
//         className="bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-primary-dark transition"
//         onClick={() => {
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//         }}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// };

// export default Navbar;
// // On larger screen, the logo should Show, on mobile screen the logo should be hidden.


import React from "react";
import { Menu } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = ({ onToggleSidebar }) => {
  return (
    // NOTE: this nav is no longer sticky; it's inside a fixed header wrapper
    <nav className="bg-gray-100 text-black px-6 py-3 flex items-center justify-between shadow-lg h-16">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded bg-primary hover:bg-primary-dark text-white transition"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2 ml-2">
          <img
            src={logo}
            alt="Logo"
            className="hidden md:block w-10 h-10 object-contain rounded"
          />
          <h1 className="text-xl font-bold tracking-wide">KIMVIA LUXURIES</h1>
        </div>
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

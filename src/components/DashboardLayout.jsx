import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Desktop sidebar (fixed) */}
      <aside className="hidden md:block fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40">
        <Sidebar role={role} />
      </aside>

      {/* Mobile sidebar slide-in */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform md:hidden transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar role={role} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Navbar: fixed to viewport. On md screens it starts after the sidebar (left-64). */}
      <header className="fixed top-0 left-0 right-0 md:left-64 z-50 h-16">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>

      {/* Main content: pushed down by nav height (pt-16) and to the right on md screens */}
      <main className="pt-16 md:pl-64">
        {/* Make content area fill remaining viewport and scroll inside it */}
        <div className="p-6 h-[calc(100vh-4rem)] overflow-auto">
          
          {/* Horizontal scrolling (table) is isolated inside this element */}
          <div className="min-w-full overflow-x-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;



// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const DashboardLayout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [role, setRole] = useState(null);
//      useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     setRole(storedRole);
//   }, []);

//   return (
   
//       <div className="flex min-h-screen bg-white text-black">
//   {/* Sidebar (desktop) */}
//   <div className="hidden md:block fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
//     <Sidebar role={role} />
//   </div>

//   {/* Mobile sidebar (slide-in) */}
//   <div
//     className={`fixed inset-y-0 left-0 z-40 transform md:hidden transition-transform duration-300 w-64 ${
//       isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//     }`}
//   >
//     <Sidebar role={role} onClose={() => setIsSidebarOpen(false)} />
//   </div>

//   {/* Overlay for mobile */}
//   {isSidebarOpen && (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
//       onClick={() => setIsSidebarOpen(false)}
//     />
//   )}

//   {/* Main container */}
//   <div className="flex-1 flex flex-col min-h-screen md:ml-64">
//     {/* ✅ Navbar OUTSIDE scrollable area */}
//     <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//     {/* ✅ Page content wrapper */}
//     <div className="flex-1 p-6 bg-white">
//       {/* 👇 Only this wrapper scrolls horizontally */}
//       <div className="overflow-x-auto">
//         {children}
//       </div>
//     </div>
//   </div>
// </div>


//   );
// };

// export default DashboardLayout;



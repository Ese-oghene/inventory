import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CashierPage from "./Pages/CashierPage";
import AdminProductsPage from "./Pages/AdminProductsPage"; // FIXE
import AdminSalesPage from "./Pages/AdminSalesPage"; // FIXED
import CEOReportPage from "./Pages/CEOReportPage";
import DashboardLayout from "./components/DashboardLayout"; // layout wrapper
import CashierDashboard from "./Pages/CashierDashboard";
import CashierHistory from "./Pages/CashierHistory"; // new pag

import './App.css'


// Protect routes based on login + role
function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/login" />;
  }

  return children;
}


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

         {/* Cashier Pages */}
        <Route
          path="/cashier/dashboard"
          element={
            <PrivateRoute role="cashier">
              <DashboardLayout>
                <CashierDashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Cashier Pages */}
        <Route
          path="/cashier/history"
          element={
            <PrivateRoute role="cashier">
              <DashboardLayout>
                <CashierHistory />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* Cashier Dashboard */}
        <Route
          path="/cashier/sale"
          element={
            <PrivateRoute role="cashier">
              <CashierPage />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/products"
          element={
            <PrivateRoute role="admin">
              <AdminProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/sales"
          element={
            <PrivateRoute role="admin">
              <AdminSalesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PrivateRoute role="admin">
              <CEOReportPage />
            </PrivateRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App 




// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./Pages/LoginPage";
// import CashierPage from "./Pages/CashierPage";
// import AdminProductsPage from "./Pages/AdminProductsPage";
// import AdminSalesPage from "./Pages/AdminSalesPage";
// import CEOReportPage from "./Pages/CEOReportPage";
// import DashboardLayout from "./components/DashboardLayout";
// import CashierDashboard from "./Pages/CashierDashboard";
// import CashierHistory from "./Pages/CashierHistory";

// import "./App.css";

// // PrivateRoute now reads from state
// function PrivateRoute({ children, role, currentRole }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" />;
//   if (role && role !== currentRole) return <Navigate to="/login" />;
//   return children;
// }

// function App() {
//   // Read the role from localStorage initially
//   const [currentRole, setCurrentRole] = useState(localStorage.getItem("role") || null);

//   return (
//     <Router>
//       <Routes>
//         {/* Auth */}
//         <Route path="/login" element={<LoginPage setCurrentRole={setCurrentRole} />} />

//         {/* Cashier Pages */}
//         <Route
//           path="/cashier/dashboard"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CashierDashboard />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/cashier/history"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CashierHistory />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/cashier/sale"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CashierPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Admin Pages */}
//         <Route
//           path="/admin/products"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <AdminProductsPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/sales"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <AdminSalesPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/reports"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CEOReportPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./Pages/LoginPage";
// import CashierPage from "./Pages/CashierPage";
// import AdminProductsPage from "./Pages/AdminProductsPage";
// import AdminSalesPage from "./Pages/AdminSalesPage";
// import CEOReportPage from "./Pages/CEOReportPage";
// import DashboardLayout from "./components/DashboardLayout";
// import CashierDashboard from "./Pages/CashierDashboard";
// import CashierHistory from "./Pages/CashierHistory";

// function PrivateRoute({ children, role, currentRole }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" />;
//   if (role && role !== currentRole) return <Navigate to="/login" />;
//   return children;
// }

// function App() {
//   const [currentRole, setCurrentRole] = useState(localStorage.getItem("role") || null);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<LoginPage setCurrentRole={setCurrentRole} />} />

//         {/* Cashier Routes */}
//         <Route
//           path="/cashier/*"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <Routes>
//                   <Route path="dashboard" element={<CashierDashboard />} />
//                   <Route path="sale" element={<CashierPage />} />
//                   <Route path="history" element={<CashierHistory />} />
//                   <Route path="*" element={<Navigate to="dashboard" />} />
//                 </Routes>
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <Routes>
//                   <Route path="products" element={<AdminProductsPage />} />
//                   <Route path="sales" element={<AdminSalesPage />} />
//                   <Route path="reports" element={<CEOReportPage />} />
//                   <Route path="*" element={<Navigate to="products" />} />
//                 </Routes>
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;  orignal tooo


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./Pages/LoginPage";
// import CashierPage from "./Pages/CashierPage";
// import AdminProductsPage from "./Pages/AdminProductsPage";
// import AdminSalesPage from "./Pages/AdminSalesPage";
// import CEOReportPage from "./Pages/CEOReportPage";
// import DashboardLayout from "./components/DashboardLayout";
// import CashierDashboard from "./Pages/CashierDashboard";
// import CashierHistory from "./Pages/CashierHistory";

// function PrivateRoute({ children, role, currentRole }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" />;
//   if (role && role !== currentRole) return <Navigate to="/login" />;
//   return children;
// }

// function App() {
//   const [currentRole, setCurrentRole] = useState(localStorage.getItem("role") || null);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<LoginPage setCurrentRole={setCurrentRole} />} />

//         {/* Cashier Routes */}
//         <Route
//           path="/cashier/*"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <Routes>
//                   <Route path="dashboard" element={<CashierDashboard />} />
//                   <Route path="sale" element={<CashierPage />} />
//                   <Route path="history" element={<CashierHistory />} />
//                   <Route path="*" element={<Navigate to="dashboard" />} />
//                 </Routes>
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/*"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <Routes>
//                   <Route path="products" element={<AdminProductsPage />} />
//                   <Route path="sales" element={<AdminSalesPage />} />
//                   <Route path="reports" element={<CEOReportPage />} />
//                   <Route path="*" element={<Navigate to="products" />} />
//                 </Routes>
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Default */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "./Pages/LoginPage";
// import CashierPage from "./Pages/CashierPage";
// import AdminProductsPage from "./Pages/AdminProductsPage";
// import AdminSalesPage from "./Pages/AdminSalesPage";
// import CEOReportPage from "./Pages/CEOReportPage";
// import DashboardLayout from "./components/DashboardLayout";
// import CashierDashboard from "./Pages/CashierDashboard";
// import CashierHistory from "./Pages/CashierHistory";

// // PrivateRoute handles authentication and role-based access
// function PrivateRoute({ children, role, currentRole }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" />;
//   if (role && role !== currentRole) return <Navigate to="/login" />;
//   return children;
// }

// function App() {
//   const [currentRole, setCurrentRole] = useState(localStorage.getItem("role") || null);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<LoginPage setCurrentRole={setCurrentRole} />} />

//         {/* Cashier Routes */}
//         <Route
//           path="/cashier/dashboard"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CashierDashboard />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/cashier/sale"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CashierPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/cashier/history"
//           element={
//             <PrivateRoute role="cashier" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CashierHistory />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Admin Routes */}
//         <Route
//           path="/admin/products"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <AdminProductsPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/sales"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <AdminSalesPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin/reports"
//           element={
//             <PrivateRoute role="admin" currentRole={currentRole}>
//               <DashboardLayout role={currentRole}>
//                 <CEOReportPage />
//               </DashboardLayout>
//             </PrivateRoute>
//           }
//         />

//         {/* Redirect unknown routes */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
//import LoginPage from "./Pages/LoginPage";
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

import React from 'react'
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate(); // <-- React Router hook

  const login = async () => {
    try {
      const res = await api.post("/login", { email, password });

       console.log("Login response:", res.data);

       const { token, user } = res.data.data; // <-- extract properly


      localStorage.setItem("token", token);

      localStorage.setItem("role", user.role);

     if (user.role === "cashier") {
       navigate("/cashier/dashboard");
     
    } else if (user.role === "admin") {
       navigate("/admin/products");
      
    } else {
       navigate("/");
     
    }
    } catch {
       console.error("Login error:", err.response?.data || err.message || err);
      alert("Login failed!");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-brown-100">
      <div className="bg-white p-8 rounded-2xl w-80 shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-primary text-white hover:bg-primary-dark w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default LoginPage

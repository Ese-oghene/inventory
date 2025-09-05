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
         alert("Login Successful!");
       navigate("/cashier/dashboard");
     
    } else if (user.role === "admin") {
         alert("Login Successful!");
       navigate("/admin/reports");
     
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



















// import React, { useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setCurrentRole }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await api.post("/login", { email, password });
//       const { token, user } = res.data.data;

//       if (!token || !user?.role) {
//         alert("Invalid login response from server");
//         return;
//       }

//       // Save token and role in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);

//       // Update App state so PrivateRoute sees it immediately
//       setCurrentRole(user.role);

//       // Navigate based on role
//       if (user.role === "cashier") navigate("/cashier/dashboard");
//       else if (user.role === "admin") navigate("/admin/products");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-brown-100">
//       <div className="bg-white p-8 rounded-2xl w-80 shadow-2xl">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border p-2 mb-3 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border p-2 mb-3 rounded"
//         />
//         <button
//           onClick={login}
//           className="bg-primary text-white w-full py-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage; orignal 2


// import React, { useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";

// const LoginPage = ({ setCurrentRole }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await api.post("/login", { email, password });
//       console.log("Login response:", res.data);

//       const { token, user } = res.data.data;

//       // Save to localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", user.role);

//       // Update App state
//       setCurrentRole(user.role);

//       // Navigate based on role
//       if (user.role === "cashier") navigate("/cashier/dashboard");
//       else if (user.role === "admin") navigate("/admin/products");
//       else navigate("/");
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message || err);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-brown-100">
//       <div className="bg-white p-8 rounded-2xl w-80 shadow-2xl">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={login}
//           className="bg-primary text-white hover:bg-primary-dark w-full py-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;










// import React, { useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await api.post("/login", { email, password });
//       console.log("Login response:", res.data);

//       const { token, user } = res.data.data;

//       if (user.role === "cashier") {
//         localStorage.setItem("cashierToken", token);
//         localStorage.setItem("cashierRole", user.role);
//         localStorage.setItem("currentRole", "cashier"); // Active role
//         navigate("/cashier/dashboard");
//       } else if (user.role === "admin") {
//         localStorage.setItem("adminToken", token);
//         localStorage.setItem("adminRole", user.role);
//         localStorage.setItem("currentRole", "admin"); // Active role
//         navigate("/admin/products");
//       } else {
//         alert("Unknown user role!");
//         return;
//       }

//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message || err);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-brown-100">
//       <div className="bg-white p-8 rounded-2xl w-80 shadow-2xl">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={login}
//           className="bg-primary text-white hover:bg-primary-dark w-full py-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await api.post("/login", { email, password });
//       console.log("Login response:", res.data);

//       const { token, user } = res.data.data;

//       if (!token || !user?.role) {
//         alert("Invalid login response from server");
//         return;
//       }

//       // store role-specific token
//       if (user.role === "cashier") {
//         localStorage.setItem("cashierToken", token);
//         localStorage.setItem("cashierRole", user.role);
//         localStorage.setItem("currentRole", "cashier");
//         navigate("/cashier/dashboard");
//       } else if (user.role === "admin") {
//         localStorage.setItem("adminToken", token);
//         localStorage.setItem("adminRole", user.role);
//         localStorage.setItem("currentRole", "admin");
//         navigate("/admin/products");
//       } else {
//         alert("Unknown user role");
//       }
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message || err);
//       alert("Login failed! Check your credentials");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-brown-100">
//       <div className="bg-white p-8 rounded-2xl w-80 shadow-2xl">
//         <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={login}
//           className="bg-primary text-white hover:bg-primary-dark w-full py-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


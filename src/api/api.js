import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// // Add token automatically for requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// // Use token based on role
// api.interceptors.request.use((config) => {
//   const role = localStorage.getItem("currentRole"); // the role we want to use now
//   let token = null;

//   if (role === "cashier") token = localStorage.getItem("cashierToken");
//   else if (role === "admin") token = localStorage.getItem("adminToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;



// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

// api.interceptors.request.use((config) => {
//   const role = localStorage.getItem("currentRole");
//   let token = null;
//   if (role === "admin") token = localStorage.getItem("adminToken");
//   if (role === "cashier") token = localStorage.getItem("cashierToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;



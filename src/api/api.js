import axios from "axios";

const api = axios.create({
  
  baseURL: "https://kimvialuxuries.com.ng/apis/api"
  // baseURL: "http://127.0.0.1:8000/api",
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





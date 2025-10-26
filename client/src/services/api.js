// client/src/services/api.js
import axios from "axios";
console.log("VITE_API_URL loaded:", import.meta.env.VITE_API_URL);

// ✅ Automatically picks up environment variable (Render or Local)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // ✅ Ensures cookies/tokens are sent with each request
  headers: { "Content-Type": "application/json" },
});

// ✅ Interceptor for adding JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

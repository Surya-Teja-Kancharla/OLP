// client/src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" }
});

// Attach token from localStorage at startup
const token = localStorage.getItem("token");
if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;

export default api;

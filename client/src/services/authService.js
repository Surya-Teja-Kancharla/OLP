import api from "./api";

// ✅ User signup
export const signup = async (userData) => {
  const res = await api.post("/auth/signup", userData);
  return res.data;
};

// ✅ User login
export const login = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });

  if (res.data.token) {
    // Store JWT in localStorage for persistence
    localStorage.setItem("token", res.data.token);

    // Set the default header for subsequent requests
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
  }

  return res.data;
};

// ✅ User logout
export const logout = () => {
  localStorage.removeItem("token");
  delete api.defaults.headers.common["Authorization"];
};

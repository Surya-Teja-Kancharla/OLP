import api from "./api";

export const signup = async (userData) => {
  const res = await api.post("/auth/signup", userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

import api from "../api/axiosInstance";

const saveSession = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userName", data.name || "User");
  localStorage.setItem("userEmail", data.email || "");
  localStorage.setItem("userRole", data.role || "DONOR");
};

const authService = {
  register: async (userData) => {
    const { data } = await api.post("/auth/register", userData);
    saveSession(data);
    return data;
  },
  login: async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    saveSession(data);
    return data;
  },
  logout: () => {
    ["token", "userName", "userEmail", "userRole"].forEach((k) => localStorage.removeItem(k));
  },
  isAuthenticated: () => Boolean(localStorage.getItem("token")),
  role: () => localStorage.getItem("userRole") || "",
};

export default authService;

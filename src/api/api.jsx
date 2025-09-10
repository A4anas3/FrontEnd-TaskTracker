import axios from "axios";

const API_BASE_URL = "http://localhost:8888";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.trim()}`; // Ensure token is trimmed
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

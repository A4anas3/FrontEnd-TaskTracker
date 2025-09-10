import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import "./Login.css"; // Create this CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/login", { email, password });
      const token = response.data;
      localStorage.setItem("jwtToken", token);
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole === "ADMIN") {
        navigate("/admin");
      } else if (userRole === "MANAGER") {
        navigate("/manager");
      } else if (userRole === "EMPLOYEE") {
        navigate("/employee");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Logic Lord - Task Tracker</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;

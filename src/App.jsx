// import "App.css";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import { jwtDecode } from "jwt-decode";
import "./App.css"; // Main app styling

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
      } catch (e) {
        localStorage.removeItem("jwtToken");
        setUserRole(null);
      }
    }
  }, []);

  const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === requiredRole) {
        return children;
      } else {
        return <Navigate to="/unauthorized" replace />;
      }
    } catch (e) {
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Header userRole={userRole} />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager"
              element={
                <ProtectedRoute requiredRole="MANAGER">
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <ProtectedRoute requiredRole="EMPLOYEE">
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/unauthorized"
              element={
                <div>
                  <h1>403 - Unauthorized</h1>
                  <p>You do not have permission to view this page.</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

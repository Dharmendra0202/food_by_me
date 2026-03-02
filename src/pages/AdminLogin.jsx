import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiRequest, notifyApp } from "../config/api";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call backend API for admin login
      const response = await apiRequest(API_ENDPOINTS.ADMIN.LOGIN, {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (response.success && response.token) {
        localStorage.setItem("adminToken", response.token);
        localStorage.setItem("isAdmin", "true");
        notifyApp("Admin login successful", "success");
        navigate("/admin/dashboard");
      } else {
        notifyApp("Invalid admin credentials", "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      notifyApp(err.message || "Invalid admin credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <h1>🔐 Admin Login</h1>
            <p>Access the restaurant management dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-form-field">
              <label>Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="admin-form-field">
              <label>Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                placeholder="Enter admin password"
                required
              />
            </div>

            <button type="submit" className="admin-login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>Default credentials: majnu / majnu@2909</p>
            <button onClick={() => navigate("/")} className="admin-back-btn">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

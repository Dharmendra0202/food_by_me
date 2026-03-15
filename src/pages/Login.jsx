import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiRequest, dispatchAppSync, notifyApp } from "../config/api";
import { signInWithGoogle } from "../lib/supabase";
import "./AuthPages.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const next = {};
    const normalizedEmail = formData.email.trim();
    const normalizedPassword = formData.password.trim();
    if (!normalizedEmail) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) next.email = "Enter a valid email";
    if (!normalizedPassword) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const data = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password.trim(),
        }),
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("fullName", data.fullName);
      dispatchAppSync();
      notifyApp("Login successful", "success");
      const redirectTarget =
        typeof location.state?.from === "string" && location.state.from.startsWith("/")
          ? location.state.from
          : "/";
      navigate(redirectTarget, { replace: true });
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("fullName");
      dispatchAppSync();
      notifyApp(error.message || "Login failed. Please try again.", "error");
      setErrors({ password: error.message || "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Page will redirect to Google — no further action needed here
    } catch (err) {
      console.error("Google login error:", err);
      notifyApp("Google sign-in failed. Please try again.", "error");
      setGoogleLoading(false);
    }
  };

  return (
    <section className="auth-premium auth-login">
      <div className="auth-card">
        <div className="auth-headline">Sign in</div>
        <h1>Welcome back</h1>
        <p>Fast checkout and saved picks.</p>

        {/* Google Sign-In Button */}
        <button
          type="button"
          className="auth-google-btn"
          onClick={handleGoogleLogin}
          disabled={googleLoading || isLoading}
        >
          {googleLoading ? (
            <span className="auth-google-spinner" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
          )}
          <span>{googleLoading ? "Redirecting..." : "Continue with Google"}</span>
        </button>

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="auth-error">{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="auth-error">{errors.password}</span>}

          <button type="submit" className="auth-submit" disabled={isLoading || googleLoading}>
            {isLoading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password" style={{ marginBottom: "10px", display: "block", textAlign: "center" }}>
            Forgot password?
          </Link>
        </div>

        <div className="auth-links">
          <span>New here?</span>
          <Link to="/signup">Create account</Link>
        </div>

        <div className="auth-links" style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e0e0e0" }}>
          <Link to="/admin/login" style={{ color: "#667eea", fontWeight: "600" }}>
            🔐 Admin Login
          </Link>
        </div>
      </div>
    </section>
  );
}

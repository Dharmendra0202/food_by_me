import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const next = {};

    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "Enter a valid email";

    if (!formData.password) next.password = "Password is required";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1100);
  };

  return (
    <section className="auth-premium auth-login">
      <aside className="auth-rail" aria-hidden="true">
        <div className="auth-rail-track">
          {["Secure", "Quick", "Fresh", "Premium", "Fast", "Curated", "Trusted", "Ready", "Daily", "Smart", "Secure", "Quick"].map((text, index) => (
            <span key={`${text}-${index}`}>{text}</span>
          ))}
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-headline">Sign in</div>
        <h1>Welcome back</h1>
        <p>Fast checkout and saved picks.</p>

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

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="auth-links">
          <span>New here?</span>
          <Link to="/signup">Create account</Link>
        </div>
      </div>
    </section>
  );
}

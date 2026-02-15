import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPages.css";

const NAME_REGEX = /^[A-Za-z][A-Za-z\s'.-]*$/;

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const next = {};

    const normalizedName = formData.fullName.trim();
    if (!normalizedName) next.fullName = "Name is required";
    else if (!NAME_REGEX.test(normalizedName)) {
      next.fullName = "Name can contain letters and spaces only";
    }
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "Enter a valid email";
    if (!formData.password || formData.password.length < 6) next.password = "Password must be 6+ characters";
    if (formData.password !== formData.confirmPassword) next.confirmPassword = "Passwords do not match";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "fullName"
        ? value.replace(/[^A-Za-z\s'.-]/g, "").replace(/\s{2,}/g, " ")
        : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 1200);
  };

  return (
    <section className="auth-premium auth-signup">
      <aside className="auth-rail" aria-hidden="true">
        <div className="auth-rail-track">
          {["Join", "Taste", "Fast", "Safe", "Premium", "Cart", "Checkout", "Fresh", "Join", "Taste", "Fast", "Safe"].map((text, index) => (
            <span key={`${text}-${index}`}>{text}</span>
          ))}
        </div>
      </aside>

      <div className="auth-card">
        <div className="auth-headline">Create profile</div>
        <h1>Start in one minute</h1>
        <p>Save favorites and reorder faster.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Your name"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
            inputMode="text"
            pattern="[A-Za-z][A-Za-z\\s'.-]*"
            title="Use letters and spaces only"
          />
          {errors.fullName && <span className="auth-error">{errors.fullName}</span>}

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
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="auth-error">{errors.password}</span>}

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Repeat password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="auth-links">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </section>
  );
}

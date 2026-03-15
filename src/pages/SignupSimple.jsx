import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS, apiRequest } from "../config/api";
import { signInWithGoogle } from "../lib/supabase";
import "./AuthPages.css";

const NAME_REGEX = /^[A-Za-z][A-Za-z\s'.-]*$/;

export default function SignupSimple() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const next = {};

    const normalizedName = formData.fullName.trim();
    const normalizedEmail = formData.email.trim();
    const normalizedPassword = formData.password.trim();
    const normalizedConfirmPassword = formData.confirmPassword.trim();

    if (!normalizedName) next.fullName = "Name is required";
    else if (!NAME_REGEX.test(normalizedName)) {
      next.fullName = "Name can contain letters and spaces only";
    }
    if (!normalizedEmail) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) 
      next.email = "Enter a valid email";
    if (!normalizedPassword || normalizedPassword.length < 6) 
      next.password = "Password must be 6+ characters";
    if (!normalizedConfirmPassword) next.confirmPassword = "Confirm password is required";
    else if (normalizedPassword !== normalizedConfirmPassword) 
      next.confirmPassword = "Passwords do not match";

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
    if (errors[name] || ((name === "password" || name === "confirmPassword") && errors.confirmPassword)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        ...(name === "password" || name === "confirmPassword" ? { confirmPassword: "" } : {}),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim(),
      };

      await apiRequest(API_ENDPOINTS.AUTH.SIGNUP_EMAIL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSuccessMessage(
        "Account created! Please check your email to verify your account before logging in."
      );
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrors({ email: error.message || "Signup failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Google signup error:", err);
      setErrors({ email: "Google sign-up failed. Please try again." });
      setGoogleLoading(false);
    }
  };

  return (
    <section className="auth-premium auth-signup">
      <div className="auth-card">
        <div className="auth-headline">Create profile</div>
        <h1>Start in one minute</h1>
        <p>Save favorites and reorder faster.</p>

        {successMessage && (
          <div className="auth-success-message">{successMessage}</div>
        )}

        {/* Google Sign-Up Button */}
        <button
          type="button"
          className="auth-google-btn"
          onClick={handleGoogleSignup}
          disabled={googleLoading || isLoading || !!successMessage}
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
          <span>{googleLoading ? "Redirecting..." : "Sign up with Google"}</span>
        </button>

        <div className="auth-divider">
          <span>or create account with email</span>
        </div>

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
            disabled={isLoading || successMessage}
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
            autoComplete="email"
            disabled={isLoading || successMessage}
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
            autoComplete="new-password"
            disabled={isLoading || successMessage}
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
            autoComplete="new-password"
            disabled={isLoading || successMessage}
          />
          {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}

          <button 
            type="submit" 
            className="auth-submit" 
            disabled={isLoading || successMessage}
          >
            {isLoading ? "Creating account..." : "Create account"}
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

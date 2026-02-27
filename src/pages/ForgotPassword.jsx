import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, apiRequest, notifyApp } from "../config/api";
import "./AuthPages.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setErrors({ email: "Email is required" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setErrors({ email: "Enter a valid email" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePasswordReset = () => {
    const next = {};
    if (!newPassword) next.newPassword = "New password is required";
    else if (newPassword.length < 6) next.newPassword = "Password must be at least 6 characters";
    
    if (!confirmPassword) next.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) next.confirmPassword = "Passwords do not match";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRequestReset = async (event) => {
    event.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    try {
      await apiRequest(API_ENDPOINTS.AUTH.REQUEST_PASSWORD_RESET, {
        method: 'POST',
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      setResetSent(true);
      notifyApp("Password reset instructions sent to your email", "success");
    } catch (error) {
      notifyApp(error.message || "Failed to send reset instructions", "error");
      setErrors({ email: error.message || "Failed to send reset instructions" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!validatePasswordReset()) return;

    setIsLoading(true);
    try {
      await apiRequest(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          newPassword: newPassword.trim(),
        }),
      });

      notifyApp("Password reset successful! You can now log in.", "success");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      notifyApp(error.message || "Failed to reset password", "error");
      setErrors({ newPassword: error.message || "Failed to reset password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-premium auth-login">
      <div className="auth-card">
        <div className="auth-headline">Password Reset</div>
        <h1>{resetSent ? "Set New Password" : "Forgot Password?"}</h1>
        <p>
          {resetSent
            ? "Enter your new password below"
            : "Enter your email to reset your password"}
        </p>

        {!resetSent ? (
          <form className="auth-form" onSubmit={handleRequestReset}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({});
              }}
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}

            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: "" }));
              }}
            />
            {errors.newPassword && <span className="auth-error">{errors.newPassword}</span>}

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
            />
            {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}

            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="auth-links">
          <span>Remember your password?</span>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-page">
      {/* Animated left side illustration */}
      <motion.div
        className="login-illustration"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="Chinese.jpg"
          alt="Delicious food"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
            scale: [1, 1.03, 1],
            filter: [
              "drop-shadow(0 0 5px rgba(255, 150, 150, 0.2))",
              "drop-shadow(0 0 15px rgba(255, 120, 120, 0.4))",
              "drop-shadow(0 0 5px rgba(255, 150, 150, 0.2))",
            ],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Right side form */}
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">
          Login to continue ordering delicious meals!
        </p>

        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <div className="form-footer">
            <a href="/forgot-password" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            🍕 Login
          </motion.button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

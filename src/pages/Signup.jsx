import React from "react";
import { motion } from "framer-motion";
import "./Signup.css";

export default function Signup() {
  return (
    <div className="signup-page">
      {/* Left side illustration */}
      <motion.div
        className="signup-illustration"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="/images/food-illustration.png"
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

      {/* Right side signup form */}
      <motion.div
        className="signup-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="signup-title">Create Account 🍽️</h2>
        <p className="signup-subtitle">
          Join FoodByMe and start ordering your favorite meals today!
        </p>

        <form className="signup-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <motion.button
            type="submit"
            className="signup-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            🍔 Sign Up
          </motion.button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

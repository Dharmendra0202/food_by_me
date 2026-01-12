import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="app-navbar" role="navigation">
      <div className="nav-inner">
        <h2 className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            FoodByMe
          </Link>
        </h2>

        <ul className="nav-links">
          <li>
            <Link to="/">Restaurant</Link>
          </li>

          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
          </li>

          <li>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

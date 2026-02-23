import React, { useEffect, useMemo, useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  APP_SYNC_EVENT,
  dispatchAppSync,
  getCartCount,
  getCartItems,
} from "../config/api";

function Navbar() {
  const location = useLocation();
  const [snapshot, setSnapshot] = useState({
    isLoggedIn: false,
    fullName: "",
    cartCount: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const shortName = useMemo(() => {
    const words = snapshot.fullName.trim().split(/\s+/).filter(Boolean);
    return words[0] || "Account";
  }, [snapshot.fullName]);

  useEffect(() => {
    const sync = () => {
      const token = localStorage.getItem("token");
      const fullName = localStorage.getItem("fullName") || "";
      const cartCount = getCartCount(getCartItems());
      setSnapshot({
        isLoggedIn: Boolean(token),
        fullName,
        cartCount,
      });
    };

    sync();
    window.addEventListener(APP_SYNC_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(APP_SYNC_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    dispatchAppSync();
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="app-navbar" role="navigation">
      <div className="nav-inner">
        <h2 className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }} onClick={closeMenu}>
            FoodByMe
          </Link>
        </h2>

        <button 
          className="hamburger-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu}>Restaurant</Link>
          </li>

          <li>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              Cart
              {snapshot.cartCount > 0 ? (
                <span className="cart-badge" aria-label={`${snapshot.cartCount} items in cart`}>
                  {snapshot.cartCount}
                </span>
              ) : null}
            </NavLink>
          </li>

          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")} onClick={closeMenu}>
              Orders
            </NavLink>
          </li>

          {snapshot.isLoggedIn ? (
            <>
              <li>
                <span className="account-chip" title={snapshot.fullName}>
                  Hi, {shortName}
                </span>
              </li>
              <li>
                <button type="button" className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <Link to="/signup" className="signup-btn" onClick={closeMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {menuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
}

export default Navbar;

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { RESTAURANT_ROUTE_PATTERN } from "./data/restaurants";
import { APP_SYNC_EVENT, APP_TOAST_EVENT } from "./config/api";
import { listCatalogThemes } from "./pages/catalogThemes";
import "./App.css";

// Lazy-load all pages — only downloaded when first visited
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignupSimple"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const PremiumFoodPage = lazy(() => import("./pages/PremiumFoodPage"));
const RestaurantDetailsPage = lazy(() => import("./pages/RestaurantDetailsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const TestConnection = lazy(() => import("./pages/TestConnection"));

function PageLoader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <div style={{ width: 40, height: 40, border: "4px solid #f3f3f3", borderTop: "4px solid #ff7a45", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    </div>
  );
}

function createToastPayload(detail) {
  return {
    id: detail?.id || `toast_${Date.now()}_${Math.floor(Math.random() * 1e5)}`,
    message: detail?.message || "",
    type: detail?.type || "info",
    duration:
      Number.isFinite(Number(detail?.duration)) && Number(detail?.duration) > 0
        ? Number(detail.duration)
        : 2800,
  };
}

function RequireAuth({ isAuthenticated, children }) {
  const location = useLocation();
  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to="/login" replace state={{ from }} />;
  }
  return children;
}

function CheckoutLegacyRedirect() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return <Navigate to={params.get("view") === "orders" ? "/orders" : "/cart"} replace />;
}

export default function App() {
  const location = useLocation();
  const catalogThemes = listCatalogThemes();
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    typeof window !== "undefined" ? Boolean(localStorage.getItem("token")) : false
  );
  const [toasts, setToasts] = useState([]);
  const toastTimersRef = useRef(new Map());

  const removeToast = useCallback((toastId) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
    const timer = toastTimersRef.current.get(toastId);
    if (timer) {
      clearTimeout(timer);
      toastTimersRef.current.delete(toastId);
    }
  }, []);

  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(Boolean(localStorage.getItem("token")));
    syncAuth();
    window.addEventListener(APP_SYNC_EVENT, syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener(APP_SYNC_EVENT, syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  useEffect(() => {
    const timerMap = toastTimersRef.current;
    const handleToast = (event) => {
      const nextToast = createToastPayload(event?.detail || {});
      if (!nextToast.message) return;
      setToasts((prev) => [...prev.filter((t) => t.id !== nextToast.id), nextToast].slice(-4));
      const existing = timerMap.get(nextToast.id);
      if (existing) clearTimeout(existing);
      timerMap.set(nextToast.id, window.setTimeout(() => removeToast(nextToast.id), nextToast.duration));
    };
    window.addEventListener(APP_TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(APP_TOAST_EVENT, handleToast);
      timerMap.forEach(clearTimeout);
      timerMap.clear();
    };
  }, [removeToast]);

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="app-root">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <div className="bg-dots" aria-hidden="true">
        <span className="dot dot-left dot-1" />
        <span className="dot dot-left dot-2" />
        <span className="dot dot-right dot-1" />
        <span className="dot dot-right dot-2" />
      </div>
      <main className="app-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test-connection" element={<TestConnection />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/profile"
              element={
                <RequireAuth isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route path={RESTAURANT_ROUTE_PATTERN} element={<RestaurantDetailsPage />} />
            <Route path="/cart" element={<CheckoutPage />} />
            <Route
              path="/orders"
              element={
                <RequireAuth isAuthenticated={isAuthenticated}>
                  <CheckoutPage view="orders" />
                </RequireAuth>
              }
            />
            <Route path="/checkout" element={<CheckoutLegacyRedirect />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            {catalogThemes.map((theme) => (
              <Route key={theme.slug} path={theme.route} element={<PremiumFoodPage theme={theme} />} />
            ))}
          </Routes>
        </Suspense>
      </main>

      <section className="app-toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <article key={toast.id} className={`app-toast app-toast-${toast.type}`}>
            <p>{toast.message}</p>
            <button
              type="button"
              className="app-toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

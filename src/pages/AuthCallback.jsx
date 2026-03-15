import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { dispatchAppSync, notifyApp } from "../config/api";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Completing sign-in...");

  useEffect(() => {
    async function handleCallback() {
      try {
        // Supabase automatically handles the OAuth code exchange from the URL hash/params
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        const session = data?.session;
        const user = session?.user;

        if (!user) {
          setStatus("Sign-in failed. Redirecting...");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        // Store user info in localStorage to match existing app auth pattern
        const fullName =
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email?.split("@")[0] ||
          "User";

        localStorage.setItem("token", session.access_token);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", user.email || "");

        dispatchAppSync();
        notifyApp(`Welcome, ${fullName}!`, "success");
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Auth callback error:", err);
        setStatus("Something went wrong. Redirecting to login...");
        notifyApp("Google sign-in failed. Please try again.", "error");
        setTimeout(() => navigate("/login"), 2000);
      }
    }

    handleCallback();
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      fontFamily: "system-ui, sans-serif",
      color: "#333",
    }}>
      <div style={{
        width: 44,
        height: 44,
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #ff7a45",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ fontSize: "1rem", color: "#666" }}>{status}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

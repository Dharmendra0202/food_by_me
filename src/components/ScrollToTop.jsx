import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function resetAllScrollPositions() {
  const html = document.documentElement;
  const body = document.body;
  const root = document.getElementById("root");
  const appRoot = document.querySelector(".app-root");
  const appContent = document.querySelector(".app-content");

  const prevHtmlBehavior = html.style.scrollBehavior;
  const prevBodyBehavior = body.style.scrollBehavior;

  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  html.scrollTop = 0;
  body.scrollTop = 0;

  if (root) root.scrollTop = 0;
  if (appRoot) appRoot.scrollTop = 0;
  if (appContent) appContent.scrollTop = 0;

  html.style.scrollBehavior = prevHtmlBehavior;
  body.style.scrollBehavior = prevBodyBehavior;
}

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    resetAllScrollPositions();
    const rafId = requestAnimationFrame(() => resetAllScrollPositions());
    const timeoutId = setTimeout(() => resetAllScrollPositions(), 80);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [location.key, location.pathname, location.search, location.hash]);

  return null;
}

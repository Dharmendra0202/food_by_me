import React, { useEffect, useRef, useState } from "react";
import "./whatsOnYourMind.css";
import { useNavigate } from "react-router-dom";


/**
 * Continuous smooth infinite scroller
 * SPEED = pixels per second (px/s)
 * Recommended speeds:
 * - 80 : smooth & natural
 * - 120: medium fast
 * - 200: fast
 * - 300: super fast
 */
export default function WhatsOnYourMind({
  items = [
    { name: "Noodles", img: "/images/Noodles.jpg" },
    { name: "Chinese", img: "/images/Chinese.jpg" },
    { name: "Pure Veg", img: "/images/Pureveg.jpg" },
    { name: "Paratha", img: "/images/paratha.jpg" },
    { name: "Tea", img: "/images/Tea.png" },
    { name: "Coffee", img: "/images/Coffee.jpg" },
    { name: "Kebabs", img: "/images/kebabs.jpg" },
    { name: "Fruits", img: "/images/Fruits.jpg" },
    { name: "Biryani", img: "/images/Biryani.jpg" },
    { name: "Desserts", img: "/images/desserts.jpg" },
    { name: "Khichdi", img: "/images/khichdi.jpg" },
    { name: "Shake", img: "/images/shake.jpg" },
    { name: "Rasgulla", img: "/images/rasgulla.jpg" },
    { name: "Cakes", img: "/images/Cakes.jpg" },
  ],
  speed = 230, // px per second (default FAST & smooth)
  onSelect = () => {},
}) {
  const sc = useRef(null);
  const rafId = useRef(null);
  const isPaused = useRef(false);
  const [isHovering, setHovering] = useState(false);

  const navigate = useNavigate();


  // duplicate list for infinite loop
  // preload images
  useEffect(() => {
    items.forEach((it) => {
      const img = new Image();
      img.src = it.img;
    });
  }, [items]);

  // continuous smooth scrolling - px per second
  useEffect(() => {
    const el = sc.current;
    if (!el) return;

    let lastTime = performance.now();

    const animate = (now) => {
      const delta = now - lastTime; // ms since last frame
      lastTime = now;

      if (!isPaused.current) {
        const pxPerMs = speed / 1000; // convert px/s → px/ms
        el.scrollLeft += pxPerMs * delta;

        const firstCopyWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= firstCopyWidth) {
          el.scrollLeft -= firstCopyWidth;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId.current);
  }, [speed]);

  // hover pause
  useEffect(() => {
    isPaused.current = isHovering;
  }, [isHovering]);

  // touch pause + dragging
  useEffect(() => {
    const el = sc.current;
    if (!el) return;

    let startX = 0;
    let startLeft = 0;

    const start = (e) => {
      isPaused.current = true;
      startX = e.touches[0].clientX;
      startLeft = el.scrollLeft;
    };
    const move = (e) => {
      const dx = startX - e.touches[0].clientX;
      el.scrollLeft = startLeft + dx;

      const firstCopyWidth = el.scrollWidth / 2;
      if (el.scrollLeft >= firstCopyWidth) el.scrollLeft -= firstCopyWidth;
      if (el.scrollLeft < 0) el.scrollLeft += firstCopyWidth;
    };
    const end = () => {
      setTimeout(() => (isPaused.current = false), 100);
    };

    el.addEventListener("touchstart", start, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("touchend", end);

    return () => {
      el.removeEventListener("touchstart", start);
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", end);
    };
  }, []);

  // arrow buttons
  const scrollByDir = (dir = 1) => {
    const el = sc.current;
    if (!el) return;

    isPaused.current = true;

    const item = el.querySelector(".mind-item");
    const gap = parseInt(getComputedStyle(el).gap || 20, 10);
    const step = item.offsetWidth + gap;

    el.scrollBy({ left: step * dir, behavior: "smooth" });

    setTimeout(() => {
      const firstCopyWidth = el.scrollWidth / 2;
      if (el.scrollLeft >= firstCopyWidth) el.scrollLeft -= firstCopyWidth;
      if (el.scrollLeft < 0) el.scrollLeft += firstCopyWidth;

      setTimeout(() => (isPaused.current = false), 200);
    }, 300);
  };

  return (
    <section
      className="mind-section"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="mind-header">
        <h2>
          What's on your <span className="mind-mixed">Mind ?</span>
        </h2>

        {/* <div className="mind-arrows">
          <button className="arrow left" onClick={() => scrollByDir(-1)}>
            ◀
          </button>
          <button className="arrow right" onClick={() => scrollByDir(1)}>
            ▶
          </button>
        </div> */}
      </div>

<div className="mind-container" ref={sc}>
        <div className="marquee-track">
          {items.map((it, i) => (
            <button
              className="mind-item"
              key={i}
              onClick={() =>
                navigate(
                  `/category/${it.name.toLowerCase().replace(/\s+/g, "-")}`,
                )
              }
            >
              <img src={it.img} alt={it.name} />
              <p>{it.name}</p>
            </button>
          ))}

          {/* Duplicate once for infinite scroll */}
          {items.map((it, i) => (
            <button
              className="mind-item"
              key={`dup-${i}`}
              onClick={() =>
                navigate(
                  `/category/${it.name.toLowerCase().replace(/\s+/g, "-")}`,
                )
              }
              aria-label={`Browse ${it.name}`}
            >
              <img src={it.img} alt={it.name} />
              <p>{it.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

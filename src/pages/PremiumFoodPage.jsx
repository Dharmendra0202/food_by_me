import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCartItem, notifyApp } from "../config/api";
import "./PremiumFoodPage.css";

function getRating(index) {
  return (4.2 + ((index + 2) % 4) * 0.2).toFixed(1);
}

function getEta(index) {
  const min = 12 + (index % 5) * 3;
  return `${min}-${min + 10} min`;
}

export default function PremiumFoodPage({ theme }) {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBehavior = html.style.scrollBehavior;
    const prevBodyBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    html.scrollTop = 0;
    body.scrollTop = 0;

    html.style.scrollBehavior = prevHtmlBehavior;
    body.style.scrollBehavior = prevBodyBehavior;
  }, [theme?.slug]);

  useLayoutEffect(() => {
    if (!feedback) return undefined;
    const timeoutId = setTimeout(() => setFeedback(""), 2000);
    return () => clearTimeout(timeoutId);
  }, [feedback]);

  const handleOrderNow = (item, price, index) => {
    const orderItem = {
      name: item.name,
      image: `/images/${item.image || theme.image}`,
      offer: `${theme.kicker} Special`,
      rating: parseFloat(getRating(index)),
      eta: getEta(index),
      cuisines: theme.subtitle,
      area: theme.title,
      price: price,
    };

    addCartItem({
      restaurantId: theme.slug,
      restaurantName: theme.title,
      item: orderItem,
      quantity: 1,
    });

    notifyApp(`${item.name} added to cart`, "success");
    setFeedback(`${item.name} added!`);
    
    // Navigate to cart after a short delay
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

  if (!theme) return null;

  const {
    title,
    subtitle,
    kicker,
    image,
    items = [],
    basePrice = 99,
    priceStep = 8,
    accent = "#476184",
    accentSoft = "#d1def5",
  } = theme;

  const isRasgulla = theme.slug === "rasgulla";
  const fallbackSrc = `/images/${image}`;

  const handleImageError = (event) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === "true") return;
    target.dataset.fallbackApplied = "true";
    target.src = fallbackSrc;
  };

  const rasgullaGallery = isRasgulla
    ? [
        {
          src: "/images/rasgulla-1.jpg",
          alt: "Rasgulla in light syrup",
          title: "Syrup Soaked",
          note: "Slow simmered for melt-in-mouth softness.",
        },
        {
          src: "/images/rasgulla-2.jpg",
          alt: "Clay pot rasgulla",
          title: "Clay Pot Classic",
          note: "Traditional serving style, warm and fragrant.",
        },
        {
          src: "/images/rasgulla-3.jpg",
          alt: "Rasgulla with saffron strands",
          title: "Saffron Drift",
          note: "Golden syrup with a gentle saffron finish.",
        },
        {
          src: "/images/rasgulla-4.jpg",
          alt: "Rasgulla close-up texture",
          title: "Cloudy Texture",
          note: "Feather-soft chenna spheres.",
        },
        {
          src: "/images/rasgulla-5.jpg",
          alt: "Rasgulla plated with rose petals",
          title: "Rose Whisper",
          note: "Floral aroma with delicate sweetness.",
        },
        {
          src: "/images/rasgulla-6.jpg",
          alt: "Mini rasgulla platter",
          title: "Mini Bites",
          note: "Perfect for party boxes and sharing.",
        },
        {
          src: "/images/rasgulla-7.jpg",
          alt: "Chilled rasgulla bowl",
          title: "Chilled Serve",
          note: "Light and refreshing, best served cold.",
        },
        {
          src: "/images/rasgulla-8.jpg",
          alt: "Rasgulla with pistachio garnish",
          title: "Pista Garnish",
          note: "Nutty finish with a creamy center.",
        },
      ]
    : [];

  const rasgullaStrip = isRasgulla
    ? [...rasgullaGallery, ...rasgullaGallery]
    : [];

  return (
    <section
      className="premium-page"
      style={{
        "--accent": accent,
        "--accent-soft": accentSoft,
      }}
    >
      <div className="premium-bg premium-bg-one" aria-hidden="true" />
      <div className="premium-bg premium-bg-two" aria-hidden="true" />

      <div className="premium-shell">
        <div className="premium-main">
          <header className="premium-hero">
            <button className="premium-back" onClick={() => navigate(-1)}>
              Back
            </button>
            <div className="premium-kicker">{kicker}</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {feedback && (
              <div className="premium-feedback" role="status" aria-live="polite">
                {feedback}
              </div>
            )}
            <div className="premium-hero-pulse" aria-hidden="true" />
          </header>

          <section className="premium-grid" aria-label={`${title} items`}>
            {items.map((item, index) => {
              const price = basePrice + index * priceStep;

              return (
                <article className="premium-card" key={item.name}>
                  <div className="premium-card-media">
                    <img
                      src={`/images/${item.image || image}`}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      onError={handleImageError}
                    />
                    <span className="premium-price">INR {price}</span>
                  </div>

                  <div className="premium-card-body">
                    <h3>{item.name}</h3>
                    <p>{item.note}</p>

                    <div className="premium-meta">
                      <span>{getEta(index)}</span>
                      <span>{getRating(index)} star</span>
                    </div>

                    <button 
                      className="premium-order"
                      onClick={() => handleOrderNow(item, price, index)}
                    >
                      Order Now
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          {isRasgulla && (
            <section className="rasgulla-showcase" aria-label="Rasgulla showcase">
              <header className="rasgulla-showcase-head">
                <div>
                  <div className="rasgulla-eyebrow">Rasgulla Spotlight</div>
                  <h2>Floating in syrup, melting in seconds.</h2>
                  <p>
                    A classic Bengali sweet made from soft chenna, gently
                    simmered in light sugar syrup for a cloud-like bite.
                  </p>
                </div>
                <div className="rasgulla-badge">Freshly Soft • Lightly Sweet</div>
              </header>

              <div className="rasgulla-strips">
                <div className="rasgulla-strip" data-direction="left">
                  <div className="rasgulla-strip-track">
                    {rasgullaStrip.map((slide, index) => (
                      <figure className="rasgulla-slide" key={`strip-a-${index}`}>
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          loading="lazy"
                          decoding="async"
                          onError={handleImageError}
                        />
                        <figcaption>
                          <span>{slide.title}</span>
                          <small>{slide.note}</small>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
                <div className="rasgulla-strip" data-direction="right">
                  <div className="rasgulla-strip-track">
                    {rasgullaStrip.map((slide, index) => (
                      <figure className="rasgulla-slide" key={`strip-b-${index}`}>
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          loading="lazy"
                          decoding="async"
                          onError={handleImageError}
                        />
                        <figcaption>
                          <span>{slide.title}</span>
                          <small>{slide.note}</small>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rasgulla-story">
                <div className="rasgulla-story-card">
                  <h3>Why it shines</h3>
                  <p>
                    Rasgulla is a sweet that stays light yet indulgent. The airy
                    texture absorbs syrup without feeling heavy, making it a
                    perfect finish after a rich meal.
                  </p>
                </div>
                <div className="rasgulla-story-card">
                  <h3>Best ways to enjoy</h3>
                  <p>
                    Serve chilled for a refreshing bite or warm for a more
                    fragrant, soft-center experience. Pair with saffron or rose
                    for an elevated finish.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}

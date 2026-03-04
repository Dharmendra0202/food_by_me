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

function resolveImageSrc(src, fallbackSrc) {
  if (!src) return fallbackSrc;
  if (/^https?:\/\//i.test(src)) return src;
  return `/images/${src}`;
}

export default function PremiumFoodPage({ theme, hideHero = false, embedded = false }) {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  useLayoutEffect(() => {
    if (embedded) return undefined;

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
    const fallbackSrc = `/images/${theme.image}`;
    const cardImage = resolveImageSrc(item.image || theme.image, fallbackSrc);

    const orderItem = {
      name: item.name,
      image: cardImage,
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

  const fallbackSrc = `/images/${image}`;

  const handleImageError = (event) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === "true") return;
    target.dataset.fallbackApplied = "true";
    target.src = fallbackSrc;
  };

  const firstBatchItems = items.slice(0, 8);
  const secondBatchItems = items.slice(8, 16);
  const hasMiddleStrip = secondBatchItems.length > 0;
  const stripCards = firstBatchItems.slice(0, 4).map((item) => ({
    src: resolveImageSrc(item.image || image, fallbackSrc),
    alt: item.name,
    title: item.name,
    note: item.note,
  }));
  const stripTrackItems = [...stripCards, ...stripCards];

  const renderItemGrid = (cardItems, startIndex = 0, labelSuffix = "items") => (
    <section className="premium-grid" aria-label={`${title} ${labelSuffix}`}>
      {cardItems.map((item, offset) => {
        const index = startIndex + offset;
        const price = basePrice + index * priceStep;

        return (
          <article className="premium-card" key={`${item.name}-${index}`}>
            <div className="premium-card-media">
              <img
                src={resolveImageSrc(item.image || image, fallbackSrc)}
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
  );

  return (
    <section
      className={`premium-page${embedded ? " premium-page-embedded" : ""}`}
      style={{
        "--accent": accent,
        "--accent-soft": accentSoft,
      }}
    >
      {!embedded && <div className="premium-bg premium-bg-one" aria-hidden="true" />}
      {!embedded && <div className="premium-bg premium-bg-two" aria-hidden="true" />}

      <div className="premium-shell">
        <div className="premium-main">
          {!hideHero && (
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
          )}

          {hideHero && feedback && (
            <div className="premium-feedback premium-feedback-inline" role="status" aria-live="polite">
              {feedback}
            </div>
          )}

          {renderItemGrid(firstBatchItems, 0, "top picks")}

          {hasMiddleStrip && (
            <section className="premium-mid-banner" aria-label={`${title} ad strip`}>
              <div className="premium-strip-single">
                <div className="premium-strip-track">
                  {stripTrackItems.map((slide, index) => (
                    <figure className="premium-mini-card" key={`strip-${index}`}>
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
                <div className="premium-ad-copy" aria-hidden="true">
                  <p className="premium-ad-tag">{kicker} Offer</p>
                  <h2>{title} Special Combo</h2>
                  <p>Order 2 boxes and unlock extra savings on this category.</p>
                </div>
              </div>
              <p className="premium-mid-note">
                {subtitle} Freshly prepared batches with balanced flavor and smooth
                texture in every serving.
              </p>
            </section>
          )}

          {hasMiddleStrip ? renderItemGrid(secondBatchItems, 8, "more picks") : null}
        </div>
      </div>
    </section>
  );
}

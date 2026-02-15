import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  if (!theme) return null;

  const {
    title,
    subtitle,
    kicker,
    image,
    items = [],
    basePrice = 99,
    priceStep = 8,
    rail = [],
    accent = "#476184",
    accentSoft = "#d1def5",
  } = theme;

  const railSource =
    items.length > 0 ? items : rail.map((label) => ({ name: label, image }));
  const railItems = [...railSource, ...railSource, ...railSource];

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
        <aside className="premium-rail" aria-label={`${title} variety loop`}>
          <div className="premium-rail-window">
            <div className="premium-rail-track">
              {railItems.map((entry, idx) => (
                <article className="premium-rail-item" key={`${entry.name}-${idx}`}>
                  <img src={`/images/${entry.image || image}`} alt={entry.name} />
                  <span>{entry.name}</span>
                </article>
              ))}
            </div>
          </div>
        </aside>

        <div className="premium-main">
          <header className="premium-hero">
            <button className="premium-back" onClick={() => navigate(-1)}>
              Back
            </button>
            <div className="premium-kicker">{kicker}</div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div className="premium-hero-pulse" aria-hidden="true" />
          </header>

          <section className="premium-grid" aria-label={`${title} items`}>
            {items.map((item, index) => {
              const price = basePrice + index * priceStep;

              return (
                <article className="premium-card" key={item.name}>
                  <div className="premium-card-media">
                    <img src={`/images/${item.image || image}`} alt={item.name} />
                    <span className="premium-price">INR {price}</span>
                  </div>

                  <div className="premium-card-body">
                    <h3>{item.name}</h3>
                    <p>{item.note}</p>

                    <div className="premium-meta">
                      <span>{getEta(index)}</span>
                      <span>{getRating(index)} star</span>
                    </div>

                    <button className="premium-order">Add to cart</button>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    </section>
  );
}

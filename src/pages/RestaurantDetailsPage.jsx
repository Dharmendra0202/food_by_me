import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  APP_SYNC_EVENT,
  addCartItem,
  getCartCount,
  getCartItems,
  isFavoriteRestaurant,
  toggleFavoriteRestaurant,
} from "../config/api";
import { getRestaurantById } from "../data/restaurants";
import "./RestaurantDetailsPage.css";

export default function RestaurantDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = getRestaurantById(id);
  const [cartCount, setCartCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const formatRating = (value) => (typeof value === "number" ? value.toFixed(1) : value);
  const isImageHighlights = (items) =>
    Array.isArray(items) && items.length > 0 && typeof items[0] === "object";
  const isFavorite = restaurant ? isFavoriteRestaurant(restaurant.id) : false;

  useEffect(() => {
    const syncCartCount = () => {
      setCartCount(getCartCount(getCartItems()));
    };

    syncCartCount();
    window.addEventListener(APP_SYNC_EVENT, syncCartCount);
    window.addEventListener("storage", syncCartCount);

    return () => {
      window.removeEventListener(APP_SYNC_EVENT, syncCartCount);
      window.removeEventListener("storage", syncCartCount);
    };
  }, []);

  useEffect(() => {
    if (!feedback) return undefined;
    const timeoutId = setTimeout(() => setFeedback(""), 1800);
    return () => clearTimeout(timeoutId);
  }, [feedback]);

  const extractPriceFromText = (text) => {
    if (!text) return null;
    const match = String(text).match(/₹\s?(\d+)/);
    return match ? Number(match[1]) : null;
  };

  const normalizeItem = (item) => {
    if (typeof item === "string") {
      return {
        name: item,
        image: restaurant.image,
        offer: restaurant.offer,
        rating: restaurant.rating,
        eta: `${restaurant.etaMin}-${restaurant.etaMax} mins`,
        cuisines: restaurant.cuisines.join(", "),
        area: restaurant.area,
        price: Math.round(restaurant.priceForTwo / 2),
      };
    }

    const fallbackPrice = Math.round(restaurant.priceForTwo / 2);
    const parsedPrice = extractPriceFromText(item?.offer);
    return {
      name: item?.name || "Popular item",
      image: item?.image || restaurant.image,
      offer: item?.offer || "ITEMS AT ₹99",
      rating: item?.rating ?? restaurant.rating,
      eta: item?.eta || `${restaurant.etaMin}-${restaurant.etaMax} mins`,
      cuisines: item?.cuisines || restaurant.cuisines.join(", "),
      area: item?.area || restaurant.area,
      price: item?.price ?? parsedPrice ?? fallbackPrice,
    };
  };

  const addItemToCart = (item, { goToCheckout = false } = {}) => {
    if (!restaurant) return;
    const normalizedItem = normalizeItem(item);
    addCartItem({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      item: normalizedItem,
      quantity: 1,
    });
    setFeedback(`${normalizedItem.name} added to cart`);
    if (goToCheckout) navigate("/cart");
  };

  const handleFavoriteToggle = () => {
    if (!restaurant) return;
    const ids = toggleFavoriteRestaurant(restaurant.id);
    const next = ids.includes(restaurant.id);
    setFeedback(next ? `${restaurant.name} saved` : `${restaurant.name} removed from saved`);
  };

  const renderHighlights = (items) => {
    if (!Array.isArray(items) || items.length === 0) return null;

    if (isImageHighlights(items)) {
      return (
        <div className="restaurant-highlights-grid">
          {items.map((item, index) => {
            const normalizedItem = normalizeItem(item);
            const itemName = normalizedItem.name;
            const itemImage = normalizedItem.image;
            const itemOffer = normalizedItem.offer;
            const itemRating = formatRating(normalizedItem.rating);
            const itemEta = normalizedItem.eta;
            const itemCuisines = normalizedItem.cuisines;
            const itemArea = normalizedItem.area;

            return (
              <button
                type="button"
                className="restaurant-highlight-card"
                key={`${itemName}-${index}`}
                onClick={() => addItemToCart(normalizedItem, { goToCheckout: true })}
                aria-label={`Order ${itemName} from ${restaurant.name}`}
              >
                <div className="restaurant-highlight-media">
                  <img
                    src={itemImage}
                    alt={itemName}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (image.src === window.location.origin + restaurant.image) return;
                      image.src = restaurant.image;
                    }}
                  />
                  <p className="restaurant-highlight-offer">{itemOffer}</p>
                </div>

              <div className="restaurant-highlight-content">
                <h3>{itemName}</h3>
                  <p className="restaurant-highlight-meta">
                    <span className="restaurant-highlight-rating">
                      <span className="restaurant-highlight-rating-icon" aria-hidden="true">
                        ★
                      </span>
                      <span>{itemRating}</span>
                    </span>
                    <span className="restaurant-highlight-meta-dot" aria-hidden="true">
                      •
                    </span>
                    <span>{itemEta}</span>
                  </p>
                  <p className="restaurant-highlight-cuisines">{itemCuisines}</p>
                  <p className="restaurant-highlight-area">{itemArea}</p>
                </div>
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <ul className="restaurant-highlights-list">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>
            <button
              type="button"
              className="restaurant-highlight-list-btn"
              onClick={() => addItemToCart(item, { goToCheckout: true })}
            >
              <span>{item}</span>
              <span className="restaurant-highlight-list-cta">Add</span>
            </button>
          </li>
        ))}
      </ul>
    );
  };

  if (!restaurant) {
    return (
      <section className="restaurant-details-page">
        <div className="restaurant-details-shell container">
          <h1>Restaurant not found</h1>
          <p>This restaurant may have been removed or renamed.</p>
          <Link to="/" className="restaurant-back-link">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const quickPicks = restaurant.highlights
    .slice(0, 4)
    .map((item) => normalizeItem(item));
  const startingFrom = quickPicks[0]?.price || Math.round(restaurant.priceForTwo / 2);
  const estimatedPrepMin = Math.max(10, restaurant.etaMin - 8);
  const estimatedPrepMax = Math.max(estimatedPrepMin + 6, restaurant.etaMax - 5);

  return (
    <section className="restaurant-details-page">
      <div className="restaurant-details-shell container">
        <header className="restaurant-details-hero">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            decoding="async"
            fetchPriority="high"
          />
          <div className="restaurant-details-content">
            <p className="restaurant-details-kicker">Online Delivery Partner</p>
            <div className="restaurant-top-actions">
              <button
                type="button"
                className={`restaurant-favorite-btn${isFavorite ? " active" : ""}`}
                onClick={handleFavoriteToggle}
                aria-label={isFavorite ? "Remove from saved restaurants" : "Save restaurant"}
              >
                {isFavorite ? "♥ Saved" : "♡ Save"}
              </button>
              <Link to="/cart" className="restaurant-cart-link">
                Cart ({cartCount})
              </Link>
            </div>
            <h1>{restaurant.name}</h1>
            <p className="restaurant-details-copy">{restaurant.description}</p>
            {feedback ? <p className="restaurant-feedback">{feedback}</p> : null}

            <div className="restaurant-details-pills">
              <span>⭐ {restaurant.rating.toFixed(1)}</span>
              <span>
                {restaurant.etaMin}-{restaurant.etaMax} min
              </span>
              <span>₹{restaurant.priceForTwo} for two</span>
            </div>

            <p className="restaurant-details-cuisines">
              {restaurant.cuisines.join(" • ")}
            </p>
            <p className="restaurant-details-area">{restaurant.area}</p>
            <p className="restaurant-details-offer">{restaurant.offer}</p>

            <div className="restaurant-details-insights">
              <article className="restaurant-insight-card">
                <p>Delivery window</p>
                <strong>
                  {restaurant.etaMin}-{restaurant.etaMax} mins
                </strong>
                <span>Live tracking available</span>
              </article>
              <article className="restaurant-insight-card">
                <p>Prep time</p>
                <strong>
                  {estimatedPrepMin}-{estimatedPrepMax} mins
                </strong>
                <span>Freshly prepared after order</span>
              </article>
              <article className="restaurant-insight-card">
                <p>Starting at</p>
                <strong>₹{startingFrom}</strong>
                <span>Best value dishes</span>
              </article>
            </div>

            <section className="restaurant-quick-picks" aria-label="Quick picks">
              <div className="restaurant-quick-picks-head">
                <h3>Quick picks</h3>
                <p>Tap to add instantly</p>
              </div>
              <div className="restaurant-quick-picks-list">
                {quickPicks.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    className="restaurant-quick-pick-btn"
                    onClick={() => addItemToCart(item)}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </button>
                ))}
              </div>
            </section>

            <div className="restaurant-details-actions">
              <Link to="/" className="restaurant-back-link">
                Back to Restaurants
              </Link>
              <button
                type="button"
                className="restaurant-order-btn"
                onClick={() =>
                  addItemToCart(restaurant.highlights?.[0] || restaurant.name, {
                    goToCheckout: true,
                  })
                }
              >
                Order now
              </button>
            </div>
          </div>
        </header>

        <section className="restaurant-highlights">
          <h2>Popular picks</h2>
          {renderHighlights(restaurant.highlights)}
        </section>

        {Array.isArray(restaurant.nonVegHighlights) && restaurant.nonVegHighlights.length > 0 && (
          <section className="restaurant-highlights restaurant-highlights--nonveg">
            <h2>Non-veg picks</h2>
            {renderHighlights(restaurant.nonVegHighlights)}
          </section>
        )}
      </div>
    </section>
  );
}

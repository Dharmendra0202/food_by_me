import React from "react";
import { Link, useParams } from "react-router-dom";
import { getRestaurantById } from "../data/restaurants";
import "./RestaurantDetailsPage.css";

export default function RestaurantDetailsPage() {
  const { id } = useParams();
  const restaurant = getRestaurantById(id);

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

  return (
    <section className="restaurant-details-page">
      <div className="restaurant-details-shell container">
        <header className="restaurant-details-hero">
          <img src={restaurant.image} alt={restaurant.name} />
          <div className="restaurant-details-content">
            <p className="restaurant-details-kicker">Online Delivery Partner</p>
            <h1>{restaurant.name}</h1>
            <p className="restaurant-details-copy">{restaurant.description}</p>

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

            <div className="restaurant-details-actions">
              <Link to="/" className="restaurant-back-link">
                Back to Restaurants
              </Link>
              <button
                type="button"
                className="restaurant-order-btn"
                onClick={() => window.alert("Ordering flow coming soon!")}
              >
                Order now
              </button>
            </div>
          </div>
        </header>

        <section className="restaurant-highlights">
          <h2>Popular picks</h2>
          <ul>
            {restaurant.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

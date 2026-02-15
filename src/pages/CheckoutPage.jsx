import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRestaurantById } from "../data/restaurants";
import "./CheckoutPage.css";

const PAYMENT_METHODS = [
  {
    id: "upi",
    label: "UPI",
    description: "PhonePe, GPay, Paytm",
  },
  {
    id: "card",
    label: "Card",
    description: "Credit or debit card",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when order arrives",
  },
];

function parsePrice(text) {
  if (!text) return null;
  const match = String(text).match(/₹\s?(\d+)/);
  return match ? Number(match[1]) : null;
}

export default function CheckoutPage() {
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const restaurantId = location.state?.restaurantId;
  const selectedItem = location.state?.item;
  const restaurant = getRestaurantById(restaurantId);

  const item = useMemo(() => {
    if (!restaurant && !selectedItem) return null;

    const fallbackName = selectedItem?.name || restaurant?.name || "Food item";
    const fallbackImage = selectedItem?.image || restaurant?.image || "/images/Pizza.jpg";
    const fallbackOffer = selectedItem?.offer || restaurant?.offer || "SPECIAL OFFER";
    const fallbackEta =
      selectedItem?.eta ||
      (restaurant ? `${restaurant.etaMin}-${restaurant.etaMax} mins` : "30-40 mins");

    const fallbackPrice = restaurant ? Math.round(restaurant.priceForTwo / 2) : 199;
    const parsedFromOffer = parsePrice(selectedItem?.offer);

    return {
      name: fallbackName,
      image: fallbackImage,
      offer: fallbackOffer,
      eta: fallbackEta,
      cuisines: selectedItem?.cuisines || restaurant?.cuisines?.join(", ") || "Fast Food",
      area: selectedItem?.area || restaurant?.area || "City Center",
      price: selectedItem?.price ?? parsedFromOffer ?? fallbackPrice,
    };
  }, [restaurant, selectedItem]);

  if (!restaurant || !item) {
    return (
      <section className="checkout-page">
        <div className="checkout-shell container checkout-empty">
          <h1>No order selected</h1>
          <p>Select a dish from restaurant page to continue to payment.</p>
          <Link to="/" className="checkout-back-link">
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const deliveryFee = 39;
  const taxesAndCharges = Math.round(item.price * 0.05);
  const total = item.price + deliveryFee + taxesAndCharges;

  const handlePayment = (event) => {
    event.preventDefault();
    setIsPaying(true);

    window.setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);
    }, 900);
  };

  return (
    <section className="checkout-page">
      <div className="checkout-shell container">
        <header className="checkout-head">
          <p className="checkout-kicker">Secure Checkout</p>
          <h1>Place your order</h1>
          <p className="checkout-subtitle">
            {restaurant.name} - {item.name}
          </p>
        </header>

        {isPaid ? (
          <div className="checkout-success">
            <h2>Payment successful</h2>
            <p>
              Your order for <strong>{item.name}</strong> is confirmed. Estimated delivery in {item.eta}.
            </p>
            <div className="checkout-success-actions">
              <Link to={`/restaurant/${restaurant.id}`} className="checkout-back-link">
                Back to restaurant
              </Link>
              <Link to="/" className="checkout-home-link">
                Go to home
              </Link>
            </div>
          </div>
        ) : (
          <div className="checkout-layout">
            <aside className="checkout-summary">
              <div className="checkout-item-card">
                <div className="checkout-item-image-wrap">
                  <img src={item.image} alt={item.name} />
                  <span className="checkout-item-offer">{item.offer}</span>
                </div>

                <div className="checkout-item-info">
                  <h2>{item.name}</h2>
                  <p>{item.cuisines}</p>
                  <p>{item.area}</p>
                </div>
              </div>

              <div className="checkout-bill">
                <h3>Bill details</h3>
                <div className="checkout-bill-row">
                  <span>Item total</span>
                  <strong>₹{item.price}</strong>
                </div>
                <div className="checkout-bill-row">
                  <span>Delivery fee</span>
                  <strong>₹{deliveryFee}</strong>
                </div>
                <div className="checkout-bill-row">
                  <span>Taxes and charges</span>
                  <strong>₹{taxesAndCharges}</strong>
                </div>
                <div className="checkout-bill-row checkout-bill-total">
                  <span>To pay</span>
                  <strong>₹{total}</strong>
                </div>
              </div>
            </aside>

            <form className="checkout-form" onSubmit={handlePayment}>
              <h2>Delivery details</h2>

              <label className="checkout-field">
                <span>Full name</span>
                <input type="text" required placeholder="Enter your full name" />
              </label>

              <label className="checkout-field">
                <span>Phone number</span>
                <input type="tel" required placeholder="Enter mobile number" />
              </label>

              <label className="checkout-field">
                <span>Delivery address</span>
                <textarea required rows={3} placeholder="House no, street, area" />
              </label>

              <h2>Payment method</h2>

              <div className="checkout-pay-grid">
                {PAYMENT_METHODS.map((method) => (
                  <label
                    key={method.id}
                    className={`checkout-pay-option ${
                      paymentMethod === method.id ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                    />
                    <span className="checkout-pay-title">{method.label}</span>
                    <span className="checkout-pay-subtitle">{method.description}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <label className="checkout-field">
                  <span>UPI ID</span>
                  <input type="text" required placeholder="name@bank" />
                </label>
              )}

              {paymentMethod === "card" && (
                <div className="checkout-card-grid">
                  <label className="checkout-field">
                    <span>Card number</span>
                    <input type="text" required placeholder="1234 5678 9012 3456" />
                  </label>
                  <label className="checkout-field">
                    <span>Expiry</span>
                    <input type="text" required placeholder="MM/YY" />
                  </label>
                  <label className="checkout-field">
                    <span>CVV</span>
                    <input type="password" required placeholder="123" />
                  </label>
                </div>
              )}

              {paymentMethod === "cod" && (
                <p className="checkout-cod-note">
                  Cash on delivery selected. Keep exact amount handy for quick handover.
                </p>
              )}

              <button type="submit" className="checkout-pay-btn" disabled={isPaying}>
                {isPaying ? "Processing payment..." : `Pay ₹${total}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

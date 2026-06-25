import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Check, ChevronRight, ShoppingBag,
  CreditCard, MapPin, Eye, Zap,
} from "lucide-react";
import "./Checkout.css";

const steps = ["Shipping", "Payment", "Review"];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    showCvv: false,
  });

  const shipping_fee = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping_fee + tax;

  const handleShippingChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handlePaymentChange = (e) =>
    setPayment({ ...payment, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const token = localStorage.getItem("shopez_token");
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name, qty: item.quantity,
          image: item.image, price: item.price,
          product: item._id || item.id,
        })),
        shippingAddress: {
          address: shipping.address, city: shipping.city,
          postalCode: shipping.zip, country: shipping.country,
        },
        paymentMethod: "Card",
        itemsPrice: cartTotal,
        shippingPrice: shipping_fee,
        taxPrice: tax,
        totalPrice: total,
      };

      if (token) {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });
        if (!res.ok) throw new Error("Order failed");
      }
    } catch (err) {
      console.error("Order error:", err);
    } finally {
      setPlacing(false);
      setOrderPlaced(true);
      clearCart();
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="checkout-success__icon">
          <Check size={40} />
        </div>
        <h1 className="checkout-success__title">Order Confirmed!</h1>
        <p className="checkout-success__sub">
          Thank you, {shipping.firstName || "friend"}! Your order has been placed and is being processed.
        </p>
        <div className="checkout-success__actions">
          <button className="checkout-success__btn" onClick={() => navigate("/")}>
            <ShoppingBag size={17} /> Continue Shopping
          </button>
          <button className="checkout-success__btn checkout-success__btn--outline" onClick={() => navigate("/profile")}>
            View Orders
          </button>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    navigate("/cart"); return null;
  }

  return (
    <div className="checkout">
      <div className="checkout__inner">
        {/* Steps */}
        <div className="checkout__steps">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`checkout__step ${i === step ? "checkout__step--active" : ""} ${i < step ? "checkout__step--done" : ""}`}>
                <div className="checkout__step-circle">
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className="checkout__step-label">{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`checkout__step-line ${i < step ? "checkout__step-line--done" : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="checkout__layout">
          {/* Form */}
          <div className="checkout__form-wrap">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div className="checkout__form">
                <div className="checkout__form-header">
                  <MapPin size={20} color="#7c3aed" />
                  <h2 className="checkout__form-title">Shipping Address</h2>
                </div>
                <div className="checkout__grid-2">
                  <div className="checkout__field">
                    <label>First Name</label>
                    <input name="firstName" value={shipping.firstName} onChange={handleShippingChange} placeholder="John" />
                  </div>
                  <div className="checkout__field">
                    <label>Last Name</label>
                    <input name="lastName" value={shipping.lastName} onChange={handleShippingChange} placeholder="Doe" />
                  </div>
                </div>
                <div className="checkout__grid-2">
                  <div className="checkout__field">
                    <label>Email</label>
                    <input name="email" type="email" value={shipping.email} onChange={handleShippingChange} placeholder="john@example.com" />
                  </div>
                  <div className="checkout__field">
                    <label>Phone</label>
                    <input name="phone" value={shipping.phone} onChange={handleShippingChange} placeholder="+1 234 567 8900" />
                  </div>
                </div>
                <div className="checkout__field">
                  <label>Street Address</label>
                  <input name="address" value={shipping.address} onChange={handleShippingChange} placeholder="123 Main Street, Apt 4B" />
                </div>
                <div className="checkout__grid-3">
                  <div className="checkout__field">
                    <label>City</label>
                    <input name="city" value={shipping.city} onChange={handleShippingChange} placeholder="New York" />
                  </div>
                  <div className="checkout__field">
                    <label>State</label>
                    <input name="state" value={shipping.state} onChange={handleShippingChange} placeholder="NY" />
                  </div>
                  <div className="checkout__field">
                    <label>ZIP Code</label>
                    <input name="zip" value={shipping.zip} onChange={handleShippingChange} placeholder="10001" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="checkout__form">
                <div className="checkout__form-header">
                  <CreditCard size={20} color="#7c3aed" />
                  <h2 className="checkout__form-title">Payment Details</h2>
                </div>
                <div className="checkout__card-preview">
                  <div className="checkout__card-chip" />
                  <p className="checkout__card-number">
                    {payment.cardNumber || "•••• •••• •••• ••••"}
                  </p>
                  <div className="checkout__card-bottom">
                    <div>
                      <p className="checkout__card-label">Card Holder</p>
                      <p className="checkout__card-value">{payment.cardName || "YOUR NAME"}</p>
                    </div>
                    <div>
                      <p className="checkout__card-label">Expires</p>
                      <p className="checkout__card-value">{payment.expiry || "MM/YY"}</p>
                    </div>
                  </div>
                </div>
                <div className="checkout__field">
                  <label>Card Number</label>
                  <input
                    name="cardNumber" value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456" maxLength={19}
                  />
                </div>
                <div className="checkout__field">
                  <label>Cardholder Name</label>
                  <input name="cardName" value={payment.cardName} onChange={handlePaymentChange} placeholder="John Doe" />
                </div>
                <div className="checkout__grid-2">
                  <div className="checkout__field">
                    <label>Expiry Date</label>
                    <input name="expiry" value={payment.expiry} onChange={handlePaymentChange} placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div className="checkout__field">
                    <label>CVV</label>
                    <div className="checkout__cvv-wrap">
                      <input
                        name="cvv" type={payment.showCvv ? "text" : "password"}
                        value={payment.cvv} onChange={handlePaymentChange}
                        placeholder="•••" maxLength={4}
                      />
                      <button type="button" className="checkout__cvv-toggle"
                        onClick={() => setPayment({ ...payment, showCvv: !payment.showCvv })}>
                        <Eye size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="checkout__form">
                <div className="checkout__form-header">
                  <Eye size={20} color="#7c3aed" />
                  <h2 className="checkout__form-title">Review Your Order</h2>
                </div>
                <div className="checkout__review-items">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="checkout__review-item">
                      <img
                        src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop"}
                        alt={item.name}
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop"; }}
                      />
                      <div className="checkout__review-item-info">
                        <p className="checkout__review-item-name">{item.name}</p>
                        <p className="checkout__review-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="checkout__review-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="checkout__review-address">
                  <h4>Shipping To</h4>
                  <p>{shipping.firstName} {shipping.lastName}</p>
                  <p>{shipping.address}</p>
                  <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="checkout__nav">
              {step > 0 && (
                <button className="checkout__nav-back" onClick={handleBack}>
                  Back
                </button>
              )}
              {step < 2 ? (
                <button className="checkout__nav-next" onClick={handleNext}>
                  Continue <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  className="checkout__nav-place"
                  onClick={handlePlaceOrder}
                  disabled={placing}
                >
                  {placing ? (
                    <><div className="checkout__spinner" /> Processing...</>
                  ) : (
                    <><Zap size={17} /> Place Order — ${total.toFixed(2)}</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="checkout__summary">
            <h3 className="checkout__summary-title">Order Summary</h3>
            <div className="checkout__summary-items">
              {cartItems.slice(0, 3).map((item) => (
                <div key={item._id || item.id} className="checkout__summary-item">
                  <span className="checkout__summary-item-name">
                    {item.name.length > 28 ? item.name.slice(0, 28) + "…" : item.name}
                  </span>
                  <span className="checkout__summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              {cartItems.length > 3 && (
                <p className="checkout__summary-more">+{cartItems.length - 3} more items</p>
              )}
            </div>
            <div className="checkout__summary-divider" />
            <div className="checkout__summary-rows">
              <div className="checkout__summary-row">
                <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="checkout__summary-row">
                <span>Shipping</span>
                <span className={shipping_fee === 0 ? "checkout__free" : ""}>
                  {shipping_fee === 0 ? "FREE" : `$${shipping_fee.toFixed(2)}`}
                </span>
              </div>
              <div className="checkout__summary-row">
                <span>Tax</span><span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="checkout__summary-divider" />
            <div className="checkout__summary-total">
              <span>Total</span>
              <span className="checkout__summary-total-amt">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
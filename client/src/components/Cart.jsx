import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import "./Cart.css";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const image =
    item.image ||
    (item.images && item.images[0]) ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop";

  return (
    <div className="cart-item">
      <div className="cart-item__img-wrap">
        <img
          src={image}
          alt={item.name}
          className="cart-item__img"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop";
          }}
        />
      </div>

      <div className="cart-item__details">
        <Link
          to={`/product/${item._id || item.id}`}
          className="cart-item__name"
        >
          {item.name}
        </Link>
        {item.category && (
          <span className="cart-item__category">{item.category}</span>
        )}
        <p className="cart-item__unit-price">${item.price?.toFixed(2)} each</p>
      </div>

      <div className="cart-item__qty-wrap">
        <button
          className="cart-item__qty-btn"
          onClick={() =>
            updateQuantity(item._id || item.id, item.quantity - 1)
          }
          aria-label="Decrease"
        >
          <Minus size={13} />
        </button>
        <span className="cart-item__qty">{item.quantity}</span>
        <button
          className="cart-item__qty-btn"
          onClick={() =>
            updateQuantity(item._id || item.id, item.quantity + 1)
          }
          aria-label="Increase"
        >
          <Plus size={13} />
        </button>
      </div>

      <div className="cart-item__right">
        <p className="cart-item__total">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          className="cart-item__remove"
          onClick={() => removeFromCart(item._id || item.id)}
          aria-label="Remove item"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

const CartSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-summary">
      <h3 className="cart-summary__title">Order Summary</h3>

      <div className="cart-summary__rows">
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Shipping</span>
          <span className={shipping === 0 ? "cart-summary__free" : ""}>
            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="cart-summary__row">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {subtotal < 50 && (
          <p className="cart-summary__shipping-note">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping
          </p>
        )}
      </div>

      <div className="cart-summary__divider" />

      <div className="cart-summary__total-row">
        <span>Total</span>
        <span className="cart-summary__total-amount">${total.toFixed(2)}</span>
      </div>

      <Link to="/checkout" className="cart-summary__checkout-btn">
        <ShoppingBag size={17} />
        Proceed to Checkout
        <ArrowRight size={16} />
      </Link>

      <Link to="/category/all" className="cart-summary__continue">
        Continue Shopping
      </Link>
    </div>
  );
};

const Cart = () => {
  const { cartItems, clearCart } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__icon">
          <ShoppingBag size={48} />
        </div>
        <h2 className="cart-empty__title">Your cart is empty</h2>
        <p className="cart-empty__sub">
          Looks like you haven't added anything yet.
        </p>
        <Link to="/category/all" className="cart-empty__btn">
          Start Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1 className="cart-page__title">
          Your Cart{" "}
          <span className="cart-page__count">
            ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
          </span>
        </h1>
        <button className="cart-page__clear" onClick={clearCart}>
          <Trash2 size={15} />
          Clear All
        </button>
      </div>

      <div className="cart-page__layout">
        <div className="cart-page__items">
          {cartItems.map((item) => (
            <CartItem key={item._id || item.id} item={item} />
          ))}
        </div>
        <CartSummary cartItems={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
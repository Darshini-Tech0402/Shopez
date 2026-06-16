import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, subtotal, tax, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  });

  const [cardInfo, setCardInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleCard = e => setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });

  const validateStep1 = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.phone.trim() || form.phone.length < 10) errs.phone = 'Valid phone number is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state.trim()) errs.state = 'State is required';
    if (!form.pincode.trim() || form.pincode.length < 6) errs.pincode = 'Valid pincode is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    if (paymentMethod === 'card' || paymentMethod === 'debit') {
      const errs = {};
      if (!cardInfo.cardNumber || cardInfo.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Valid card number required';
      if (!cardInfo.expiry) errs.expiry = 'Expiry required';
      if (!cardInfo.cvv || cardInfo.cvv.length < 3) errs.cvv = 'Valid CVV required';
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateStep2()) return;
    const id = 'SHOP-2026-' + Math.floor(10000 + Math.random() * 90000);
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => navigate('/'), 4000);
  };

  if (cart.length === 0 && !orderPlaced) return (
    <div className="co-empty">
      <h2>🛒 Your cart is empty</h2>
      <button onClick={() => navigate('/')}>Shop Now</button>
    </div>
  );

  if (orderPlaced) return (
    <div className="co-success">
      <div className="co-success-icon">🎉</div>
      <h2>Order Placed Successfully!</h2>
      <p className="co-order-id">Order ID: <strong>{orderId}</strong></p>
      <p>Thank you, <strong>{form.fullName}</strong>! Your order is confirmed.</p>
      <p className="co-redirect">Redirecting to home in 4 seconds...</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );

  return (
    <div className="co-page">
      <h1 className="co-title">Checkout</h1>

      <div className="co-steps">
        <div className={`co-step ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
        <div className="co-step-line"></div>
        <div className={`co-step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
        <div className="co-step-line"></div>
        <div className={`co-step ${step >= 3 ? 'active' : ''}`}>3. Review</div>
      </div>

      <div className="co-layout">
        <div className="co-main">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="co-card">
              <h2>📦 Shipping Information</h2>
              <div className="co-form-grid">
                {[
                  { name: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
                  { name: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' },
                  { name: 'phone', label: 'Phone Number', placeholder: '9876543210', type: 'tel' },
                  { name: 'address', label: 'Address', placeholder: '123 Main Street', full: true },
                  { name: 'city', label: 'City', placeholder: 'Mumbai' },
                  { name: 'state', label: 'State', placeholder: 'Maharashtra' },
                  { name: 'pincode', label: 'Pincode', placeholder: '400001' },
                ].map(field => (
                  <div key={field.name} className={`co-field ${field.full ? 'full' : ''}`}>
                    <label>{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleForm}
                      className={errors[field.name] ? 'error' : ''}
                    />
                    {errors[field.name] && <span className="co-error">{errors[field.name]}</span>}
                  </div>
                ))}
              </div>
              <button className="co-next-btn" onClick={() => { if (validateStep1()) setStep(2); }}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="co-card">
              <h2>💳 Payment Method</h2>
              <div className="co-payment-options">
                {[
                  { value: 'cod', label: '💵 Cash on Delivery' },
                  { value: 'upi', label: '📱 UPI Payment' },
                  { value: 'card', label: '💳 Credit Card' },
                  { value: 'debit', label: '🏧 Debit Card' },
                ].map(opt => (
                  <label key={opt.value} className={`co-radio ${paymentMethod === opt.value ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={e => setPaymentMethod(e.target.value)} />
                    {opt.label}
                  </label>
                ))}
              </div>

              {(paymentMethod === 'card' || paymentMethod === 'debit') && (
                <div className="co-card-fields">
                  <div className="co-field full">
                    <label>Card Number</label>
                    <input name="cardNumber" placeholder="1234 5678 9012 3456" value={cardInfo.cardNumber} onChange={handleCard} maxLength={19} className={errors.cardNumber ? 'error' : ''} />
                    {errors.cardNumber && <span className="co-error">{errors.cardNumber}</span>}
                  </div>
                  <div className="co-field">
                    <label>Expiry Date</label>
                    <input name="expiry" placeholder="MM/YY" value={cardInfo.expiry} onChange={handleCard} maxLength={5} className={errors.expiry ? 'error' : ''} />
                    {errors.expiry && <span className="co-error">{errors.expiry}</span>}
                  </div>
                  <div className="co-field">
                    <label>CVV</label>
                    <input name="cvv" placeholder="123" value={cardInfo.cvv} onChange={handleCard} maxLength={3} type="password" className={errors.cvv ? 'error' : ''} />
                    {errors.cvv && <span className="co-error">{errors.cvv}</span>}
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="co-upi-info">
                  <p>📱 You will be redirected to your UPI app after placing the order.</p>
                </div>
              )}

              <div className="co-btn-row">
                <button className="co-back-btn" onClick={() => setStep(1)}>← Back</button>
                <button className="co-next-btn" onClick={() => { if (validateStep2()) setStep(3); }}>Review Order →</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="co-card">
              <h2>📋 Review Your Order</h2>

              <div className="co-review-section">
                <h3>Shipping To:</h3>
                <p>{form.fullName} • {form.phone}</p>
                <p>{form.address}, {form.city}, {form.state} - {form.pincode}</p>
                <p>{form.email}</p>
              </div>

              <div className="co-review-section">
                <h3>Payment:</h3>
                <p>{paymentMethod === 'cod' ? '💵 Cash on Delivery' : paymentMethod === 'upi' ? '📱 UPI' : paymentMethod === 'card' ? '💳 Credit Card' : '🏧 Debit Card'}</p>
              </div>

              <div className="co-review-section">
                <h3>Items ({cart.length}):</h3>
                {cart.map(item => (
                  <div key={item.id} className="co-review-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="co-review-name">{item.name}</p>
                      <p className="co-review-qty">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                    </div>
                    <span className="co-review-total">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="co-btn-row">
                <button className="co-back-btn" onClick={() => setStep(2)}>← Back</button>
                <button className="co-place-btn" onClick={handlePlaceOrder}>Place Order 🎉</button>
              </div>
            </div>
          )}
        </div>

        {/* ORDER SUMMARY SIDEBAR */}
        <div className="co-summary">
          <h2>Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="co-sum-item">
              <span className="co-sum-name">{item.name} ×{item.quantity}</span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="co-sum-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
          <div className="co-sum-row"><span>Tax (5%)</span><span>₹{tax.toLocaleString()}</span></div>
          <div className="co-sum-row"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
          <div className="co-sum-total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Cart({ cart, totalPrice, updateCartQuantity, removeFromCart, onCheckout, couponApplied, setCouponApplied }) {
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const subtotal = totalPrice;
  const deliveryFee = cart.length && subtotal < 499 ? 40 : 0;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = Math.max(0, subtotal + deliveryFee + tax - discount);

  return (
    <section className="container page-shell cart-page">
      <div className="section-head">
        <div>
          <span className="eyebrow small">Basket</span>
          <h2>Your Cart</h2>
        </div>
      </div>

      {cart.length ? (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={`${item.id}-${item.portion || 'regular'}`}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p>{item.restaurant}</p>
                  <strong>₹{item.price * item.quantity}</strong>
                </div>
                <div className="cart-actions">
                  <div className="stepper">
                    <button type="button" onClick={() => updateCartQuantity(item.id, -1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateCartQuantity(item.id, 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button className="trash-btn" type="button" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><strong>₹{subtotal}</strong></div>
            <div className="summary-row"><span>Delivery Fee</span><strong>₹{deliveryFee}</strong></div>
            <div className="summary-row"><span>Discount</span><strong>₹{discount}</strong></div>
            <div className="summary-row total"><span>Total</span><strong>₹{total}</strong></div>
            <form className="cart-coupon" onSubmit={e=>{e.preventDefault();if(coupon.trim().toUpperCase()==='SAVE10'){setCouponApplied(true);setCouponMessage('10% discount applied!')}else{setCouponApplied(false);setCouponMessage('Try code SAVE10 for 10% off.')}}}><input aria-label="Coupon code" value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="Coupon code"/><button>Apply</button></form>
            {couponMessage&&<small className="coupon-message">{couponMessage}</small>}
            <button type="button" className="primary-btn full-width" onClick={onCheckout}>Checkout</button>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Choose a few delicious items and come back here.</p>
        </div>
      )}
    </section>
  );
}

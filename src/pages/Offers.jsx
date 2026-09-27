export default function Offers() {
  return (
    <section className="container page-shell">
      <div className="section-head">
        <div>
          <span className="eyebrow small">Exclusive deals</span>
          <h2>Today’s Offers</h2>
        </div>
      </div>

      <div className="offer-grid">
        <div className="offer-card highlight">
          <span>Limited Time</span>
          <h3>20% OFF</h3>
          <p>On your first order.</p>
        </div>
        <div className="offer-card">
          <span>Club Deal</span>
          <h3>Flat ₹100 OFF</h3>
          <p>On orders above ₹499.</p>
        </div>
        <div className="offer-card">
          <span>Free Delivery</span>
          <h3>Selected Restaurants</h3>
          <p>Enjoy zero delivery fee on select outlets.</p>
        </div>
      </div>
    </section>
  );
}

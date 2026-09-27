import { Heart, Star } from 'lucide-react';
import { restaurants } from '../data/restaurants';

export default function Restaurants() {
  return (
    <section className="container page-shell">
      <div className="section-head">
        <div>
          <span className="eyebrow small">Top eateries</span>
          <h2>Popular Restaurants</h2>
        </div>
      </div>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant.id}>
            <div className="restaurant-banner" style={{ backgroundImage: `url(${restaurant.image})` }} />
            <div className="restaurant-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <h3>{restaurant.name}</h3>
                <button className="favorite-btn" type="button" aria-label={`Favorite ${restaurant.name}`}>
                  <Heart size={18} />
                </button>
              </div>
              <p>{restaurant.cuisine}</p>
              <div className="meta-row" style={{ marginTop: '10px' }}>
                <span><Star size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {restaurant.rating}</span>
                <span>{restaurant.deliveryTime}</span>
              </div>
              <span>Delivery fee ₹{restaurant.deliveryFee}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Heart, Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FoodCard({ item, favorite, onToggleFavorite, onAddToCart }) {
  const spiceIcons = Array.from({ length: 5 }, (_, index) => index < item.spiceLevel);

  return (
    <article className="food-card">
      <Link to={`/food/${item.id}`} className="food-card-link">
        <div className="food-image-wrap">
          <img src={item.image} alt={item.name} className="food-image" />
          <div className="rating-badge">
            <Star size={14} fill="currentColor" />
            {item.rating}
          </div>
        </div>

        <div className="food-body">
          <div className="food-header-row">
            <h3>{item.name}</h3>
          </div>
          <p className="restaurant-name">{item.restaurant}</p>

          <div className="meta-row">
            <span>{item.reviews} reviews</span>
            <span>{item.deliveryTime}</span>
          </div>

          <div className="spice-row">
            {spiceIcons.map((filled, index) => (
              <span key={`${item.id}-spice-${index}`} className={filled ? 'spice-on' : 'spice-off'}>🌶️</span>
            ))}
            <span className="spice-label">
              {item.spiceLevel >= 4 ? 'Very Hot' : item.spiceLevel >= 2 ? 'Medium' : 'Mild'}
            </span>
          </div>
        </div>
      </Link>

      <div className="food-footer" style={{ padding: '0 16px 16px' }}>
        <div className="food-price-block">
          <span className="veg-indicator">{item.vegetarian ? 'Veg' : 'Non-Veg'}</span>
          <strong>₹{item.price}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            className={`favorite-btn ${favorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={favorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
            type="button"
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
          </button>
          <button className="primary-btn add-btn" onClick={onAddToCart} aria-label={`Add ${item.name} to cart`} type="button">
            <Plus size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

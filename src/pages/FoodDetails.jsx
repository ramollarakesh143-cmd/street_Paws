import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, Star } from 'lucide-react';
import { foodItems, getFoodPrice, spiceLevels } from '../data/foods';

export default function FoodDetails({ favorites, toggleFavorite, addToCart }) {
  const { id } = useParams();
  const item = foodItems.find((entry) => entry.id === Number(id));
  const [portion, setPortion] = useState('Regular');
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState(item?.spiceLevel || 1);

  const spiceInfo = spiceLevels[spiceLevel] || spiceLevels[1];
  const currentPrice = useMemo(() => getFoodPrice(item, portion), [item, portion]);

  if (!item) {
    return (
      <section className="container page-shell">
        <div className="empty-state">
          <h3>Food not found.</h3>
        </div>
      </section>
    );
  }

  const totalPrice = currentPrice * quantity;

  return (
    <section className="container page-shell">
      <Link to="/menu" className="primary-btn" style={{ marginBottom: '24px' }}>
        <ArrowLeft size={18} /> Back to Menu
      </Link>

      <div className="detail-layout">
        <div className="detail-card">
          <img src={item.image} alt={item.name} className="detail-main-image" />
        </div>

        <div className="detail-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
            <div>
              <span className="eyebrow small">{item.category}</span>
            </div>
            <button
              className={`favorite-btn ${favorites.includes(item.id) ? 'active' : ''}`}
              onClick={() => toggleFavorite(item.id)}
              aria-label={favorites.includes(item.id) ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
              type="button"
            >
              <Heart size={18} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <h1>{item.name}</h1>

          <div className="detail-meta">
            <span>{item.restaurant}</span>
            <span><Star size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {item.rating}</span>
            <span>{item.reviews} reviews</span>
            <span>{item.deliveryTime}</span>
          </div>

          <p className="detail-description">{item.description}</p>

          <div className="ingredients-list">
            {(item.ingredients || ['Fresh ingredients', 'Signature sauce', 'House spices']).map((ingredient) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </div>

          <div className="price-block">
            <div>
              <span className="veg-indicator">{item.vegetarian ? 'Veg' : 'Non-Veg'}</span>
              <strong>₹{totalPrice}</strong>
            </div>
            <div className="qty-wrap">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3>Choose spice level</h3>
            <div className="spice-levels">
              {Object.entries(spiceLevels).map(([level, config]) => (
                <button
                  key={level}
                  type="button"
                  className={`spice-pill ${Number(level) === spiceLevel ? 'active' : ''}`}
                  onClick={() => setSpiceLevel(Number(level))}
                >
                  {config.name}
                </button>
              ))}
            </div>
            <p style={{ marginTop: '12px', color: '#6b7280' }}>
              {spiceInfo.name}: {spiceInfo.description}
            </p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3>Select portion</h3>
            <div className="portion-options">
              {['Regular', 'Large', 'Family'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`portion-tab ${portion === option ? 'active' : ''}`}
                  onClick={() => setPortion(option)}
                >
                  {option} <br />
                  <small>₹{item.price + (option === 'Large' ? 50 : option === 'Family' ? 250 : 0)}</small>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="primary-btn"
              onClick={() => addToCart({ ...item, quantity, price: currentPrice, spiceLevel, portion })}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="primary-btn" style={{ background: 'white', color: '#ff6b35', border: '1px solid rgba(255,107,53,.2)' }}>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

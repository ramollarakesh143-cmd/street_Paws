import { Link } from 'react-router-dom';
import { foodItems } from '../data/foods';
import FoodCard from '../components/FoodCard';

export default function Favorites({ favorites, toggleFavorite, addToCart }) {
  const savedFoods = foodItems.filter((item) => favorites.includes(item.id));

  return (
    <section className="container page-shell">
      <div className="section-head">
        <div>
          <span className="eyebrow small">Saved items</span>
          <h2>Your Favorites</h2>
        </div>
      </div>

      {savedFoods.length ? (
        <div className="food-grid">
          {savedFoods.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              favorite={true}
              onToggleFavorite={() => toggleFavorite(item.id)}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No favorite foods yet.</h3>
          <p>Tap the heart on any dish to save it here.</p>
        </div>
      )}
    </section>
  );
}

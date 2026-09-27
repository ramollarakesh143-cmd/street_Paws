import FoodCard from '../components/FoodCard';

export default function Menu({ filteredItems, favorites, toggleFavorite, addToCart }) {
  return (
    <section className="container page-shell">
      <div className="section-head">
        <div>
          <span className="eyebrow small">Explore</span>
          <h2>Full Menu</h2>
        </div>
      </div>

      {filteredItems.length ? (
        <div className="food-grid">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              favorite={favorites.includes(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
              onAddToCart={() => addToCart(item)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No food found.</h3>
        </div>
      )}
    </section>
  );
}

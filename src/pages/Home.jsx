import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Flame, Heart, MapPin, Salad, Star, Utensils } from 'lucide-react';
import { categories as categoryList } from '../data/categories';
import { foodItems } from '../data/foods';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';

const categoryMeta = {
  All: Utensils,
  Pizza: Flame,
  Burger: Utensils,
  Biryani: Flame,
  Chicken: Flame,
  Noodles: Utensils,
  Desserts: Heart,
  Drinks: Salad,
  Healthy: Salad,
};

export default function Home({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  spiceFilter,
  setSpiceFilter,
  filteredItems,
  favorites,
  toggleFavorite,
  addToCart,
}) {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Fast • Fresh • Flavorful</span>
            <h1>Delicious Food, Delivered Fast.</h1>
            <p>Discover your favorite meals from the best restaurants around you.</p>

            <div className="hero-controls">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <div className="location-box">
                <MapPin size={18} />
                <span>Downtown</span>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="cta-row">
              <Link to="/menu" className="primary-btn">Explore Menu <ArrowRight size={18} /></Link>
            </div>

            <div className="stats-row">
              <div>
                <strong>12k+</strong>
                <span>Orders</span>
              </div>
              <div>
                <strong>4.9</strong>
                <span>Rating</span>
              </div>
              <div>
                <strong>20 min</strong>
                <span>Avg. delivery</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="food-plate">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
                alt="Featured meal"
              />
            </div>
            <div className="floating-card floating-card-one">
              <span>🔥 Hot Pick</span>
              <strong>Fire Pizza</strong>
            </div>
            <div className="floating-card floating-card-two">
              <span>⭐ Top Rated</span>
              <strong>4.9 Reviews</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-block container">
        <div className="section-head">
          <div>
            <span className="eyebrow small">Browse by taste</span>
            <h2>Food Categories</h2>
          </div>
        </div>

        <div className="category-row">
          {categoryList.map((category) => {
            const Icon = categoryMeta[category] || Utensils;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                <Icon size={18} />
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="filter-panel container">
        <div className="filter-header">
          <h3>Filter by preferences</h3>
        </div>
        <div className="filter-controls">
          <label className="range-wrap">
            <span>Spice level: {spiceFilter}/5</span>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={spiceFilter}
              onChange={(event) => setSpiceFilter(Number(event.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="menu-section container">
        <div className="section-head">
          <div>
            <span className="eyebrow small">Popular picks</span>
            <h2>{activeCategory === 'All' ? 'Featured Menu' : activeCategory}</h2>
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
    </>
  );
}

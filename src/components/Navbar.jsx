import { Link, NavLink } from 'react-router-dom';
import { Heart, MapPin, Menu, Search, ShoppingCart, User } from 'lucide-react';

export default function Navbar({ cartCount, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="FoodExpress home">
          <span className="brand-mark">F</span>
          <span>FoodExpress</span>
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" end className="nav-link">Home</NavLink>
          <NavLink to="/menu" className="nav-link">Menu</NavLink>
          <NavLink to="/restaurants" className="nav-link">Restaurants</NavLink>
          <NavLink to="/offers" className="nav-link">Offers</NavLink>
          <NavLink to="/orders" className="nav-link">Orders</NavLink>
          <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" aria-label="Search">
            <Search size={18} />
          </button>
          <div className="location-pill">
            <MapPin size={16} />
            <span>Downtown</span>
          </div>
          <Link to="/favorites" className="icon-btn" aria-label="Favorites">
            <Heart size={18} />
          </Link>
          <Link to="/cart" className="cart-pill" aria-label="View cart">
            <ShoppingCart size={18} />
            <span>Cart</span>
            <strong>{cartCount}</strong>
          </Link>
          <Link to="/profile" className="icon-btn profile" aria-label="Profile">
            <User size={18} />
          </Link>
          <button
            className="mobile-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

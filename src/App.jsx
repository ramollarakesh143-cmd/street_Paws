import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import FoodDetails from './pages/FoodDetails';
import Restaurants from './pages/Restaurants';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import { foodItems } from './data/foods';
import FounderApp from './founder/FounderApp';
import CustomerAuth from './pages/CustomerAuth';
import Checkout from './pages/Checkout';

const STORAGE_KEYS = {
  favorites: 'foodexpress-favorites',
  cart: 'foodexpress-cart',
  orders: 'foodexpress-orders',
};

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState(5);
  const [foods, setFoods] = useState(() => { try { return JSON.parse(localStorage.getItem('fe-foods')) || foodItems; } catch { return foodItems; } });
  const [couponApplied, setCouponApplied] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.favorites);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.cart);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const syncFoods = () => { try { const saved=localStorage.getItem('fe-foods'); if(saved) setFoods(JSON.parse(saved)); } catch { /* keep current menu */ } };
    window.addEventListener('business-data', syncFoods);
    window.addEventListener('storage', syncFoods);
    return () => { window.removeEventListener('business-data', syncFoods); window.removeEventListener('storage', syncFoods); };
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredItems = useMemo(() => {
    return foods.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpice = item.spiceLevel <= spiceFilter;
      return matchesCategory && matchesSearch && matchesSpice && item.available !== false;
    });
  }, [activeCategory, searchQuery, spiceFilter, foods]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]
    );
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((entry) =>
          entry.id === id ? { ...entry, quantity: Math.max(0, entry.quantity + delta) } : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((entry) => entry.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);

  const subtotal = totalPrice;
  const deliveryFee = cart.length && subtotal < 499 ? 40 : 0;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discount);
  const handleCheckout = (customer, finalTotal = grandTotal) => {
    if (!cart.length) return;

    const orderId = `FD${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart,
      total: finalTotal,
      customer: customer.name,
      mobile: customer.mobile,
      email: customer.email,
      address: [customer.address, customer.city, customer.pin, customer.landmark].filter(Boolean).join(', '),
      payment: customer.payment,
      paymentStatus: customer.payment === 'Cash' ? 'Pending' : 'Paid',
      status: 'New',
    };

    const orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.orders) || '[]');
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify([newOrder, ...orders]));
    localStorage.setItem('foodexpress-customer', JSON.stringify({ name: customer.name, email: customer.email, mobile: customer.mobile, address: newOrder.address }));
    const businessOrders = JSON.parse(localStorage.getItem('fe-orders') || '[]');
    localStorage.setItem('fe-orders', JSON.stringify([{ id: orderId, customer: 'Guest Customer', mobile: '—', items: cart.map(({name,quantity})=>({name,quantity})), total: newOrder.total, payment: 'Cash', paymentStatus: 'Pending', status: 'New', date: newOrder.date, address: 'Address to be confirmed' }, ...businessOrders]));
    localStorage.setItem('fe-orders', JSON.stringify([{ ...newOrder, items: cart.map(({name,quantity})=>({name,quantity})) }, ...businessOrders]));
    const businessCustomers = JSON.parse(localStorage.getItem('fe-customers') || '[]');
    const customerRecord = businessCustomers.find(c=>c.email===customer.email);
    if(customerRecord){customerRecord.name=customer.name;customerRecord.mobile=customer.mobile;customerRecord.totalOrders=(customerRecord.totalOrders||0)+1;customerRecord.totalSpending=(customerRecord.totalSpending||0)+finalTotal;customerRecord.lastOrder=newOrder.date;}
    else businessCustomers.unshift({id:`CU-${Date.now().toString().slice(-6)}`,name:customer.name,email:customer.email,mobile:customer.mobile,totalOrders:1,totalSpending:finalTotal,lastOrder:newOrder.date,joined:newOrder.date,status:'Active'});
    localStorage.setItem('fe-customers',JSON.stringify(businessCustomers));
    window.dispatchEvent(new Event('business-data'));
    setCart([]);
    navigate(`/orders?orderId=${orderId}`);
  };

  if (window.location.pathname.startsWith('/founder')) return <FounderApp />;
  if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') return <Navigate to="/founder/dashboard" replace />;
  if (window.location.pathname.startsWith('/admin/')) return <Navigate to={window.location.pathname.replace('/admin', '/founder')} replace />;

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        <Routes>
          <Route path="/customer" element={<Home activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} spiceFilter={spiceFilter} setSpiceFilter={setSpiceFilter} filteredItems={filteredItems} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="/customer/home" element={<Navigate to="/customer" replace />} />
          <Route path="/customer/menu" element={<Navigate to="/menu" replace />} />
          <Route path="/customer/cart" element={<Navigate to="/cart" replace />} />
          <Route path="/customer/checkout" element={<Navigate to="/checkout" replace />} />
          <Route path="/customer/orders" element={<Navigate to="/orders" replace />} />
          <Route path="/customer/profile" element={<Navigate to="/profile" replace />} />
          <Route path="/customer/login" element={<CustomerAuth />} />
          <Route path="/customer/register" element={<CustomerAuth register />} />
          <Route
            path="/"
            element={
              <Home
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                spiceFilter={spiceFilter}
                setSpiceFilter={setSpiceFilter}
                filteredItems={filteredItems}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                filteredItems={filteredItems}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                addToCart={addToCart}
              />
            }
          />
          <Route path="/food/:id" element={<FoodDetails favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart cart={cart} totalPrice={totalPrice} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} couponApplied={couponApplied} setCouponApplied={setCouponApplied} onCheckout={()=>navigate('/checkout')} />} />
          <Route path="/checkout" element={<Checkout cart={cart} subtotal={subtotal} discount={discount} delivery={deliveryFee} tax={tax} total={grandTotal} onPlaceOrder={handleCheckout}/>} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">F</span>
              <span>FoodExpress</span>
            </div>
            <p>Fresh meals, delightful flavors, and lightning-fast delivery to your doorstep.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/offers">Offers</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="/orders">My Orders</a></li>
              <li><a href="tel:+919999999999">Help Center</a></li>
              <li><a href="mailto:hello@foodexpress.com">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="social-row">
              <a href="https://instagram.com" aria-label="Instagram">◎</a>
              <a href="https://facebook.com" aria-label="Facebook">◌</a>
              <a href="tel:+919999999999" aria-label="Phone">☎</a>
              <a href="mailto:hello@foodexpress.com" aria-label="Mail">✉</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

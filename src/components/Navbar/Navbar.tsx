import { useState, useEffect, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../Button/Button';
import './Navbar.css';

export const Navbar: FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <ShoppingBag className="logo-icon" size={28} />
          <span className="logo-text gradient-text">LuxeCart</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links desktop-only">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Products</Link>
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user?.name}</span>
              <button onClick={logout} className="logout-btn" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="login-btn">
                <User size={18} className="mr-2" />
                Login
              </Button>
            </Link>
          )}
          <Link to="/cart" className="cart-link">
            <div className="cart-icon-wrapper">
              <ShoppingBag size={24} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-only flex items-center gap-4">
          <Link to="/cart" className="cart-link">
            <div className="cart-icon-wrapper">
              <ShoppingBag size={24} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
          </Link>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          <div className="container flex flex-col gap-4 py-4">
            <Link to="/" className="mobile-nav-link">Products</Link>
            {isAuthenticated ? (
              <>
                <span className="mobile-nav-text">Logged in as {user?.name}</span>
                <Button onClick={logout} variant="secondary" fullWidth>Logout</Button>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link w-full">
                <Button fullWidth>Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

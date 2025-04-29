import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, Package, Home, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when changing location
  useEffect(() => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag size={28} className="text-blue-700" />
            <span className="text-xl font-bold text-gray-900">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-700 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-700 transition-colors">Products</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-700 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-700 transition-colors">Contact</Link>
          </nav>

          {/* Search, Cart, and User Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Cart button */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-blue-700 transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User actions */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-700"
              >
                <User size={24} />
                <span className="hidden lg:inline-block">
                  {isAuthenticated ? user?.name.split(' ')[0] : 'Account'}
                </span>
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <Package size={16} className="mr-2" />
                        Orders
                      </Link>
                      {user?.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <LayoutDashboard size={16} className="mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700"
              >
                <Search size={18} />
              </button>
            </form>

            <nav className="space-y-3">
              <Link to="/" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                <Home size={20} className="mr-2" />
                Home
              </Link>
              <Link to="/products" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                <ShoppingBag size={20} className="mr-2" />
                Products
              </Link>
              <Link to="/about" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                About
              </Link>
              <Link to="/contact" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                Contact
              </Link>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                      <User size={20} className="mr-2" />
                      Profile
                    </Link>
                    <Link to="/orders" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                      <Package size={20} className="mr-2" />
                      Orders
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                        <LayoutDashboard size={20} className="mr-2" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors w-full"
                    >
                      <LogOut size={20} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                      Login
                    </Link>
                    <Link to="/register" className="flex items-center py-2 text-gray-600 hover:text-blue-700 transition-colors">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ShoppingBag as StoreIcon,
  PackageCheck,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onOpenWishlist,
  onOpenOrders,
  onSelectProduct
}) => {
  const { darkMode, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Filter recommendations for search bar drop-down
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>⚡ Special Offer: Get 20% OFF with code <strong className="underline underline-offset-2">SUMMER20</strong> or Free Shipping with code <strong className="underline underline-offset-2">FREESHIP</strong></span>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-morphism border-b border-gray-200/80 dark:border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open mobile navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="flex items-center gap-2.5 group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                  <StoreIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    AuraMart
                  </span>
                  <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 -mt-1">
                    Premium Store
                  </span>
                </div>
              </button>
            </div>

            {/* Search Bar with Autocomplete */}
            <div className="flex-1 max-w-md hidden md:block relative" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search 20+ products, brands, tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/80 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all shadow-inner"
                />
                <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-gray-400 dark:text-gray-500" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Autocomplete Popup */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 animate-fade-in">
                  <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                    <span>Products Found</span>
                    <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  {searchResults.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        onSelectProduct(prod);
                        setIsSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-left transition-colors"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {prod.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {prod.brand} • <span className="text-sky-600 dark:text-sky-400 font-bold">${prod.price.toFixed(2)}</span>
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions & Navigation */}
            <div className="flex items-center gap-1.5 sm:gap-3">

              {/* Order History */}
              <button
                onClick={onOpenOrders}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="View Past Orders"
              >
                <PackageCheck className="w-4 h-4 text-sky-500" />
                <span>My Orders</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                aria-label="Toggle light or dark theme"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
                )}
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={onOpenWishlist}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                aria-label="View saved wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 text-rose-500" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md shadow-rose-500/30">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Icon Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {totalItemsCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Cart</span>
              </button>
            </div>
          </div>

          {/* Mobile Search input bar */}
          <div className="md:hidden py-2.5 border-t border-gray-100 dark:border-gray-800 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 animate-fade-in">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenOrders();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm text-gray-800 dark:text-gray-200"
              >
                <PackageCheck className="w-5 h-5 text-sky-500" />
                <span>My Order History</span>
              </button>
              <button
                onClick={() => {
                  onOpenWishlist();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm text-gray-800 dark:text-gray-200"
              >
                <Heart className="w-5 h-5 text-rose-500" />
                <span>Wishlist ({wishlistCount})</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

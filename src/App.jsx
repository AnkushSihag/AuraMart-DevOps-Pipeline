import React, { useState, useMemo, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBar } from './components/CategoryBar';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistModal } from './components/WishlistModal';
import { OrdersModal } from './components/OrdersModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

function AppContent() {
  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(350);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setPriceRange(350);
    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('featured');
    addToast('Filters reset to default', 'info');
  };

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesBrand = prod.brand.toLowerCase().includes(query);
        const matchesCat = prod.category.toLowerCase().includes(query);
        const matchesTag = prod.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTag) return false;
      }

      // Category
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }

      // Price limit
      if (prod.price > priceRange) return false;

      // Rating
      if (minRating > 0 && prod.rating < minRating) return false;

      // Stock
      if (inStockOnly && !prod.inStock) return false;

      // Sale
      if (onSaleOnly && (!prod.originalPrice || prod.originalPrice <= prod.price)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, activeCategory, priceRange, minRating, inStockOnly, onSaleOnly, sortBy]);

  return (
    <WishlistProvider onToast={addToast}>
      <CartProvider onToast={addToast}>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
          
          {/* Global Header Navigation */}
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenOrders={() => setIsOrdersOpen(true)}
            onSelectProduct={(p) => setQuickViewProduct(p)}
          />

          {/* Hero Carousel Section */}
          <HeroBanner
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          />

          {/* Horizontal Category Badges */}
          <CategoryBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Main Product Catalog Section */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
            <div className="flex gap-8">
              
              {/* Filter Sidebar */}
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                onSaleOnly={onSaleOnly}
                setOnSaleOnly={setOnSaleOnly}
                resetFilters={resetFilters}
                isOpenMobile={mobileFiltersOpen}
                setIsOpenMobile={setMobileFiltersOpen}
              />

              {/* Product Grid Listing */}
              <ProductGrid
                products={filteredProducts}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onQuickView={(p) => setQuickViewProduct(p)}
                onOpenMobileFilters={() => setMobileFiltersOpen(true)}
                resetFilters={resetFilters}
              />
            </div>
          </main>

          {/* Footer */}
          <Footer onToast={addToast} />

          {/* Slide-over Cart Drawer */}
          <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

          {/* Product Detail Modal Lightbox */}
          <ProductDetailModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onBuyNow={() => {
              setQuickViewProduct(null);
              setIsCheckoutOpen(true);
            }}
          />

          {/* Wishlist Modal */}
          <WishlistModal
            isOpen={isWishlistOpen}
            onClose={() => setIsWishlistOpen(false)}
          />

          {/* Order History Modal */}
          <OrdersModal
            isOpen={isOrdersOpen}
            onClose={() => setIsOrdersOpen(false)}
          />

          {/* Checkout Modal */}
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            onOrderSuccess={(newOrder) => {
              setConfirmedOrder(newOrder);
            }}
          />

          {/* Order Confirmation Receipt Modal */}
          <OrderConfirmationModal
            order={confirmedOrder}
            onClose={() => setConfirmedOrder(null)}
          />

          {/* Global Toast Alerts */}
          <Toast toasts={toasts} onDismiss={dismissToast} />

        </div>
      </CartProvider>
    </WishlistProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

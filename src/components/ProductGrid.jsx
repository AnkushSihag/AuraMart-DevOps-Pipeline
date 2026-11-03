import React from 'react';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List, SlidersHorizontal, PackageSearch } from 'lucide-react';

export const ProductGrid = ({
  products,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onQuickView,
  onOpenMobileFilters,
  resetFilters,
}) => {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top Bar Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm">
        
        {/* Results Counter & Mobile Filter Toggle */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-sky-500" />
            <span>Filters</span>
          </button>
          
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            Showing <strong className="text-gray-900 dark:text-gray-100">{products.length}</strong> products
          </span>
        </div>

        {/* Sort & View Mode Switcher */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          {/* Sort Select */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List Listing */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-sky-500 mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 mb-1">
            No products found
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mb-6">
            Try adjusting your search query, price range, or clearing active category filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:bg-sky-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

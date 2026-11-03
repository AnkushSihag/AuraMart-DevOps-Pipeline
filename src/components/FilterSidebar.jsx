import React from 'react';
import { SlidersHorizontal, Star, RotateCcw, X, Check } from 'lucide-react';

export const FilterSidebar = ({
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  inStockOnly,
  setInStockOnly,
  onSaleOnly,
  setOnSaleOnly,
  resetFilters,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const filterContent = (
    <div className="flex flex-col gap-6 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 font-extrabold text-base text-gray-900 dark:text-gray-100">
          <SlidersHorizontal className="w-5 h-5 text-sky-500" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between font-bold text-xs text-gray-800 dark:text-gray-200">
          <span>Max Price</span>
          <span className="text-sky-600 dark:text-sky-400 text-sm font-extrabold">${priceRange}</span>
        </div>
        <input
          type="range"
          min="20"
          max="350"
          step="5"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-sky-600"
        />
        <div className="flex justify-between text-[11px] font-medium text-gray-400">
          <span>$20</span>
          <span>$180</span>
          <span>$350</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="flex flex-col gap-3">
        <span className="font-bold text-xs text-gray-800 dark:text-gray-200">Customer Rating</span>
        <div className="flex flex-col gap-1.5">
          {[4, 3, 0].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                minRating === rating
                  ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/80 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {rating === 0 ? (
                  <span>All Ratings</span>
                ) : (
                  <>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rating ? 'fill-amber-400' : 'text-gray-300 dark:text-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{rating}★ & Above</span>
                  </>
                )}
              </div>
              {minRating === rating && <Check className="w-4 h-4 text-sky-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <span className="font-bold text-xs text-gray-800 dark:text-gray-200">Availability & Deals</span>
        
        {/* In Stock Only */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 dark:bg-gray-900 cursor-pointer"
          />
        </label>

        {/* On Sale Only */}
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
            On Sale (Discounted)
          </span>
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => setOnSaleOnly(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 dark:bg-gray-900 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 shadow-sm sticky top-24 self-start">
        {filterContent}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpenMobile(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white dark:bg-gray-900 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-gray-100">Filter Products</h3>
                <button
                  onClick={() => setIsOpenMobile(false)}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterContent}
            </div>
            <button
              onClick={() => setIsOpenMobile(false)}
              className="mt-6 w-full py-3 rounded-2xl bg-sky-600 text-white font-bold text-sm shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

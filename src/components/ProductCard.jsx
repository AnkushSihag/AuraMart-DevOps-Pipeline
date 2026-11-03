import React from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onQuickView, viewMode = 'grid' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (viewMode === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row gap-5 p-4 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Product Image */}
        <div className="relative w-full sm:w-52 h-48 sm:h-auto rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-md">
              -{discountPercent}%
            </span>
          )}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-md"
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-300">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewCount})</span>
              </div>
            </div>

            <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1 mb-2">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-gray-900 dark:text-gray-100">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-semibold">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuickView(product)}
                className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => addToCart(product)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-sky-600/20 hover:scale-105 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-sky-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-md tracking-wider">
              NEW
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow-md tracking-wider">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-md hover:scale-110 active:scale-90"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 transition-all ${isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
        </button>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-gray-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-gray-100 font-bold text-xs shadow-xl backdrop-blur-md hover:scale-105 transition-transform"
          >
            <Eye className="w-4 h-4 text-sky-500" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 font-bold text-gray-700 dark:text-gray-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-gray-900 dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="block text-[11px] text-gray-400 line-through font-semibold">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-sky-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

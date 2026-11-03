import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, Check, Plus, Minus } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const ProductDetailModal = ({ product, onClose, onBuyNow }) => {
  if (!product) return null;

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.variants?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const images = product.images || [product.image];
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleDirectBuy = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    if (onBuyNow) onBuyNow();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10 my-auto animate-fade-in max-h-[90vh] flex flex-col">
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          aria-label="Close detail modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase shadow-md">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-sky-500 scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Specs & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {product.brand} • {product.category}
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-rose-500 dark:text-gray-400 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 mb-3">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 mb-4 text-xs font-semibold">
                <div className="flex items-center gap-1 text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200/50 dark:border-amber-800/50">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="text-gray-900 dark:text-gray-100 font-bold">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>In Stock ({product.stockCount} left)</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <span className="text-3xl font-black text-gray-900 dark:text-gray-100">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-bold text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.variants?.colors?.length > 0 && (
                <div className="mb-5">
                  <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Color: <strong className="text-sky-600 dark:text-sky-400">{selectedColor}</strong>
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.variants.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedColor === color
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.variants?.sizes?.length > 0 && (
                <div className="mb-6">
                  <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Size: <strong className="text-sky-600 dark:text-sky-400">{selectedSize}</strong>
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {product.variants.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === size
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400'
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features List */}
              {product.features?.length > 0 && (
                <div className="mb-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions & Quantity */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
                    className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-sky-600 text-sky-600 dark:text-sky-400 font-bold text-xs hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleDirectBuy}
                  className="py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex items-center justify-around text-[11px] font-medium text-gray-400 pt-2">
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-sky-500" /> Fast Delivery</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 2-Year Warranty</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

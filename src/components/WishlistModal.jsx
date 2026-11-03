import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => addToCart(item));
    clearWishlist();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10 my-auto animate-fade-in max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-lg text-gray-900 dark:text-gray-100">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>My Wishlist ({wishlist.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <Heart className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-3 stroke-[1.5]" />
              <h4 className="font-extrabold text-base text-gray-800 dark:text-gray-200">Your wishlist is empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1 mb-4">
                Explore our catalog and click the heart icon to save products for later!
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-200 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-gray-900 dark:text-gray-100 truncate max-w-[200px] sm:max-w-xs">
                      {product.name}
                    </h4>
                    <span className="text-xs font-black text-sky-600 dark:text-sky-400">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(product);
                      removeFromWishlist(product.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Move to Cart</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-between items-center">
            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-gray-500 hover:text-rose-500"
            >
              Clear All
            </button>
            <button
              onClick={handleMoveAllToCart}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-extrabold text-xs shadow-md flex items-center gap-2"
            >
              <span>Move All to Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

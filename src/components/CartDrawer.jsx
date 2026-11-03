import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight, Truck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 50;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 h-full shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col z-10 animate-slide-in-right">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-lg text-gray-900 dark:text-gray-100">
            <ShoppingBag className="w-5 h-5 text-sky-500" />
            <span>Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-sky-50 dark:bg-sky-950/40 border-b border-sky-100 dark:border-sky-900/50">
          <div className="flex items-center justify-between text-xs font-bold text-sky-900 dark:text-sky-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-sky-500" />
              {amountForFreeShipping === 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400">🎉 You unlocked FREE Express Shipping!</span>
              ) : (
                <span>Add ${amountForFreeShipping.toFixed(2)} more for FREE Shipping</span>
              )}
            </span>
            <span>{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-sky-200 dark:bg-sky-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-3 stroke-[1.5]" />
              <h4 className="font-extrabold text-base text-gray-800 dark:text-gray-200">Your cart is empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mt-1 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-sky-600 text-white font-bold text-xs shadow-md"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="flex gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-gray-200 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-extrabold text-gray-900 dark:text-gray-100 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {(item.selectedColor || item.selectedSize) && (
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                        {item.selectedColor && `Color: ${item.selectedColor}`}
                        {item.selectedColor && item.selectedSize && ' | '}
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-black text-gray-900 dark:text-gray-100">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-4">
            
            {/* Promo Code Input Form */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold">
                  <Tag className="w-4 h-4 text-emerald-500" />
                  <span>Coupon {appliedCoupon.code} ({appliedCoupon.description})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-rose-600 font-bold ml-2 underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Promo code (SAVE10, SUMMER20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 uppercase font-semibold"
                  />
                  <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold text-xs hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {shippingFee === 0 ? <strong className="text-emerald-500">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-100 dark:border-gray-800">
                <span>Total</span>
                <span className="text-sky-600 dark:text-sky-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-sky-600/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

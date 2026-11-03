import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, MapPin, Truck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal = ({ isOpen, onClose, onOrderSuccess }) => {
  if (!isOpen) return null;

  const { cart, subtotal, discountAmount, shippingFee, taxAmount, total, placeOrder } = useCart();

  const [formData, setFormData] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    zip: '97477',
    country: 'United States',
    paymentMethod: 'card', // card, paypal, applepay, cod
    cardNumber: '4532 •••• •••• 8910',
    cardExpiry: '08/28',
    cardCvc: '884',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder(formData);
      setIsSubmitting(false);
      onClose();
      if (onOrderSuccess) onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10 my-auto animate-fade-in max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-lg text-gray-900 dark:text-gray-100">
            <Lock className="w-5 h-5 text-emerald-500" />
            <span>256-Bit Encrypted Express Checkout</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Col: Shipping Address */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="flex items-center gap-2 font-extrabold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-sky-500" />
                <span>Shipping Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-2 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <h3 className="flex items-center gap-2 font-extrabold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                  <CreditCard className="w-4 h-4 text-sky-500" />
                  <span>Payment Method</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {[
                    { id: 'card', label: 'Credit Card', icon: '💳' },
                    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                    { id: 'applepay', label: 'Apple Pay', icon: '🍏' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 shadow-sm font-bold'
                          : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="block text-base mb-1">{method.icon}</span>
                      <span className="text-[11px] font-semibold">{method.label}</span>
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700 space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Order Summary Review */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-800 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-xs text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                  Order Summary ({cart.reduce((a, b) => a + b.quantity, 0)} items)
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto mb-4 pr-1">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex items-center justify-between text-xs">
                      <span className="text-gray-700 dark:text-gray-300 truncate max-w-[140px]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Tax</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total Due</span>
                    <span className="text-sky-600 dark:text-sky-400">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Pay ${total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

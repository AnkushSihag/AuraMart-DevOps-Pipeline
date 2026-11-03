import React from 'react';
import { CheckCircle2, Package, Calendar, MapPin, ArrowRight, Printer } from 'lucide-react';

export const OrderConfirmationModal = ({ order, onClose }) => {
  if (!order) return null;

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  const deliveryStr = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-10 my-auto animate-fade-in p-6 sm:p-8 text-center">
        
        {/* Animated Checkmark */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20 animate-bounce">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-1">
          Order Confirmed! 🎉
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Thank you for shopping with AuraMart. A confirmation receipt has been sent to <strong>{order.customer.email}</strong>.
        </p>

        {/* Order Details Card */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700 text-left mb-6 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 text-xs">
            <div>
              <span className="block text-gray-400 text-[10px] font-bold uppercase">Order Number</span>
              <strong className="text-sky-600 dark:text-sky-400 font-extrabold text-sm">{order.orderId}</strong>
            </div>
            <div className="text-right">
              <span className="block text-gray-400 text-[10px] font-bold uppercase">Est. Delivery</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {deliveryStr}
              </strong>
            </div>
          </div>

          {/* Itemized summary */}
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {order.items.map((item) => (
              <div key={item.cartId} className="flex items-center justify-between text-xs">
                <span className="text-gray-700 dark:text-gray-300">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs">
            <span className="font-bold text-gray-700 dark:text-gray-300">Total Paid</span>
            <span className="text-lg font-black text-sky-600 dark:text-sky-400">
              ${order.summary.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

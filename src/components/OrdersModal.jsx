import React from 'react';
import { X, PackageCheck, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrdersModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { orderHistory } = useCart();

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
            <PackageCheck className="w-5 h-5 text-sky-500" />
            <span>My Order History ({orderHistory.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderHistory.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-3 stroke-[1.5]" />
              <h4 className="font-extrabold text-base text-gray-800 dark:text-gray-200">No past orders yet</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto mt-1">
                Once you complete a purchase, your orders and receipts will show up here.
              </p>
            </div>
          ) : (
            orderHistory.map((order) => (
              <div
                key={order.orderId}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3 text-xs">
                  <div>
                    <span className="block text-gray-400 text-[10px] font-bold uppercase">Order ID</span>
                    <strong className="text-sky-600 dark:text-sky-400 font-extrabold">{order.orderId}</strong>
                  </div>
                  <div className="text-right">
                    <span className="block text-gray-400 text-[10px] font-bold uppercase">Date</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{order.date}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {order.items.map((item) => (
                    <div key={item.cartId} className="flex items-center justify-between text-xs">
                      <span className="text-gray-800 dark:text-gray-200">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    ● {order.status}
                  </span>
                  <div className="text-right">
                    <span className="text-gray-400 text-[10px] mr-2">Total Paid:</span>
                    <strong className="text-sm font-black text-gray-900 dark:text-gray-100">
                      ${order.summary.total.toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

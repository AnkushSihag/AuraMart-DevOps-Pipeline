import React, { useState } from 'react';
import { Store, Send, ShieldCheck, Heart, Github, Twitter, Instagram } from 'lucide-react';

export const Footer = ({ onToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      if (onToast) onToast(`Subscribed ${newsletterEmail} to AuraVIP newsletter! 📩`, 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200/80 dark:border-gray-800 mt-20 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200/80 dark:border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
                AuraMart
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              Your modern destination for premium electronics, streetwear fashion, ergonomics, and high-quality lifestyle accessories with fast global express shipping.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <span className="block text-xs font-bold text-gray-900 dark:text-gray-100 mb-2">
                Subscribe for Exclusive Deals & 10% OFF
              </span>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Electronics & Gadgets</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Audio & Headphones</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Urban Streetwear</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Home & Living</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Leather Accessories</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Shipping Rates & Policy</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">30-Day Easy Returns</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Warranty & Repairs</a></li>
              <li><a href="#" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Help Center & FAQ</a></li>
            </ul>
          </div>

          {/* Trust & Badges */}
          <div>
            <h4 className="font-extrabold text-xs text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              100% Secure Checkout
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              We support all major payment providers with 256-bit SSL security encryption.
            </p>
            <div className="flex items-center gap-2 flex-wrap text-sm font-bold text-gray-400">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">💳 Visa</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">💳 Mastercard</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">🅿️ PayPal</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">🍏 Apple Pay</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 AuraMart Inc. All rights reserved. Crafted with React & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

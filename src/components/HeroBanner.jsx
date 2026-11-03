import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    badge: 'NEW ARRIVAL 2026',
    title: 'Next-Gen Wireless ANC Headphones',
    subtitle: 'Experience studio-grade active noise cancellation with 40-hour battery life.',
    cta: 'Explore Audio',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    color: 'from-sky-900/90 via-indigo-950/80 to-slate-950/90'
  },
  {
    id: 2,
    badge: 'SUMMER TECH SALE',
    title: 'Smartwatches & Wearables Up to 30% Off',
    subtitle: 'Track your fitness, ECG, and oxygen levels with aircraft-grade aluminum design.',
    cta: 'Shop Tech Deals',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    color: 'from-purple-900/90 via-indigo-950/80 to-gray-950/90'
  },
  {
    id: 3,
    badge: 'URBAN CRAFT COLLECTION',
    title: 'Minimalist Premium Cotton Apparel',
    subtitle: '450 GSM Heavyweight organic cotton engineered for modern everyday style.',
    cta: 'Shop Fashion',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
    color: 'from-slate-900/90 via-gray-900/80 to-slate-950/90'
  }
];

export const HeroBanner = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden mb-8">
      {/* Hero Carousel Banner */}
      <div className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-3xl overflow-hidden shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-4 group">
        
        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0 transition-all duration-700 ease-in-out">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} backdrop-blur-[2px]`} />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 max-w-3xl h-full flex flex-col justify-center p-6 sm:p-10 lg:p-16 text-white min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider w-fit mb-4">
            ✨ {slide.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 drop-shadow-md">
            {slide.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-200 mb-8 max-w-xl line-clamp-2 sm:line-clamp-none font-medium">
            {slide.subtitle}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectCategory(slide.category)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-8 bg-sky-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Value Proposition Grid Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Free Shipping</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">30-Day Money Back</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Hassle-free returns</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">Secure Checkout</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">256-bit SSL encryption</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Live chat & email</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

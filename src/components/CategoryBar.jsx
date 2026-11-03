import React from 'react';
import { CATEGORIES } from '../data/products';
import { Sparkles, Smartphone, Headphones, Shirt, Home, Watch } from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Smartphone,
  Headphones,
  Shirt,
  Home,
  Watch,
};

export const CategoryBar = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Sparkles;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white border-transparent shadow-md shadow-sky-500/20 scale-105'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-500'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

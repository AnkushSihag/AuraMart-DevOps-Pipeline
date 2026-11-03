import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children, onToast }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('auramart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('auramart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        if (onToast) onToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        if (onToast) onToast(`Added "${product.name}" to wishlist ❤️`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

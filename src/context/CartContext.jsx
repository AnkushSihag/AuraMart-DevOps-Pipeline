import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { PROMO_COUPONS } from '../data/products';

const CartContext = createContext();

export const CartProvider = ({ children, onToast }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('auramart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('auramart_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('auramart_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('auramart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('auramart_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('auramart_orders', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const color = selectedColor || (product.variants?.colors?.[0] || null);
    const size = selectedSize || (product.variants?.sizes?.[0] || null);
    const cartId = `${product.id}-${color || 'default'}-${size || 'default'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty > product.stockCount ? product.stockCount : newQty
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartId,
            product,
            quantity: quantity > product.stockCount ? product.stockCount : quantity,
            selectedColor: color,
            selectedSize: size,
          },
        ];
      }
    });

    if (onToast) {
      onToast(`Added "${product.name}" to cart 🛒`, 'success');
    }
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => {
      const item = prev.find((i) => i.cartId === cartId);
      if (item && onToast) {
        onToast(`Removed "${item.product.name}" from cart`, 'info');
      }
      return prev.filter((i) => i.cartId !== cartId);
    });
  };

  const updateQuantity = (cartId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const maxStock = item.product.stockCount || 99;
          const cappedQty = Math.min(newQty, maxStock);
          return { ...item, quantity: cappedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (codeStr) => {
    const code = codeStr.trim().toUpperCase();
    if (!code) return { success: false, message: 'Please enter a coupon code.' };
    
    const coupon = PROMO_COUPONS[code];
    if (coupon) {
      setAppliedCoupon(coupon);
      if (onToast) onToast(`Coupon "${code}" applied successfully! 🎉`, 'success');
      return { success: true, message: `Coupon "${code}" applied!` };
    } else {
      if (onToast) onToast(`Invalid coupon code: "${code}"`, 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    if (onToast) onToast('Coupon removed', 'info');
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const totalItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return (subtotal * appliedCoupon.discountValue) / 100;
    }
    if (appliedCoupon.discountType === 'fixed') {
      return Math.min(subtotal, appliedCoupon.discountValue);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const rawShippingFee = subtotal > 0 ? (subtotal >= 50 ? 0 : 9.99) : 0;
  const shippingFee = appliedCoupon?.discountType === 'shipping' ? 0 : rawShippingFee;

  const taxAmount = useMemo(() => {
    const taxableSubtotal = Math.max(0, subtotal - discountAmount);
    return taxableSubtotal * 0.08; // 8% estimated tax
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);
  }, [subtotal, discountAmount, shippingFee, taxAmount]);

  const placeOrder = (customerDetails) => {
    const orderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      summary: {
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        total,
      },
      customer: customerDetails,
      status: 'Confirmed'
    };

    setOrderHistory((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        placeOrder,
        orderHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

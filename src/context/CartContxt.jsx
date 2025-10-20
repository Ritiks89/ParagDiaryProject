// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productCode === product.productCode
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.productCode === product.productCode
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove item
  const removeFromCart = (code) => {
    setCart((prevCart) => prevCart.filter((item) => item.productCode !== code));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
export const useCart = () => useContext(CartContext);

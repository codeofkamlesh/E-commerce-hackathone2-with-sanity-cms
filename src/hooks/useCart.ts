// hooks/useCart.ts

import { useState } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState<number>(0);

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const removeFromCart = () => {
    setCartItems(prev => (prev > 0 ? prev - 1 : 0));
  };

  return { cartItems, addToCart, removeFromCart };
};

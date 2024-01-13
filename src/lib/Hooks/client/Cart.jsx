"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    setLoaded(true);
  }, [cartItems, loaded]);

  useEffect(() => {
    if (window !== undefined) {
      try {
        const localCart = localStorage.getItem("cartItems");
        localCart !== null
          ? setCartItems(JSON.parse(localCart))
          : setCartItems([]);
      } catch (error) {
        console.log("error");
      }
    }
  }, []);

  const addToCart = (item) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );
    console.log(isItemInCart);
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item }]);
    }
  };

  const removeFromCart = (item) => {
    setCartItems(
      cartItems.filter((cartItem) => {
        return cartItem !== item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // const getCartTotal = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        // clearCart,
        // getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

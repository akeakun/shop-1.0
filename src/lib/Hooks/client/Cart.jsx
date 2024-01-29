"use client";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({
    products: [],
    total: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      console.log(cartItems);
      const json = JSON.stringify(cartItems)
      const encoded = btoa(json)
      localStorage.setItem("cart_ref", encoded);
    }
    setLoaded(true);
  }, [cartItems, loaded]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const localCart = localStorage.getItem("cart_ref");
        localCart !== null
          ? setCartItems((prevCart) => {
            const buffer = atob(localCart)
            const decodedCart = JSON.parse(buffer)
            return decodedCart
          })
          : setCartItems({ products: [], total: 0 });
      } catch (error) {
        console.log("Error parsing local storage:", error);
      }
    }
  }, []);

  const addToCart = (item) => {
    setCartItems((prevCart) => {
      const isItemInCart = prevCart.products.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      let updatedProducts;
      if (isItemInCart) {
        updatedProducts = prevCart.products.map((cartItem) =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        );
      } else {
        updatedProducts = [...prevCart.products, { ...item }];
      }

      const updatedTotal = updatedProducts.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );

      return {
        ...prevCart,
        products: updatedProducts,
        total: updatedTotal,
      };
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prevCart) => {
      const updatedProducts = prevCart.products.filter(
        (cartItem) => cartItem.id !== item.id || cartItem.size !== item.size
      );

      const updatedTotal = updatedProducts.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );

      return {
        ...prevCart,
        products: updatedProducts,
        total: updatedTotal,
      };
    });
  };

  const clearCart = () => {
    setCartItems({ products: [], total: 0 });
  };

  // const getCartTotal = () => {
  //   return cartItems.products.reduce(
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
        clearCart,
        // getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

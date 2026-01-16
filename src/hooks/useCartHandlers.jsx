import { useState, useCallback } from "react";
import { useContext } from "react";
import { CartDataContext } from "../context/CartContext";

const useCartHandlers = () => {
  const [cartData, setCartData] = useContext(CartDataContext);

  const removeFromCart = (productId) => {
    const filteredCartData = cartData.filter(
      (product) => product._id !== productId
    );
    setCartData(filteredCartData);
  };

  const handleProductDecrease = (product) => {
    const index = cartData.findIndex((item) => item._id === product._id);
    if (product.quantity > 1) {
      const shallowCartData = [...cartData];
      product.quantity -= 1;
      shallowCartData.splice(index, 1, product);
      return setCartData(shallowCartData);
    }
  };
  
  const handleProductIncrease = (product) => {
    const index = cartData.findIndex((item) => item._id === product._id);
    const shallowCartData = [...cartData];
    product.quantity += 1;
    shallowCartData.splice(index, 1, product);
    setCartData(shallowCartData);
  };
  return {
    removeFromCart,
    handleProductIncrease,
    handleProductDecrease,
  };
};

export default useCartHandlers;

import React, { createContext, useState } from "react";

export const CartDataContext = createContext();

const CartContext = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  return (
    <div>
      <CartDataContext.Provider
        value={[
          cartData,
          setCartData,
          subTotal,
          setSubTotal,
          discount,
          setDiscount,
          shipping,
          setShipping,
          total,
          setTotal,
        ]}
      >
        {children}
      </CartDataContext.Provider>
    </div>
  );
};

export default CartContext;

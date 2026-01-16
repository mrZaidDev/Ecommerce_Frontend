import React, { useContext, useEffect } from "react";
import { CartDataContext } from "../context/CartContext";
import useCartHandlers from "../hooks/useCartHandlers";
import { Link } from "react-router-dom";
const Cart = () => {
  const { removeFromCart, handleProductDecrease, handleProductIncrease } =
    useCartHandlers();
  const [
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
  ] = useContext(CartDataContext);

  useEffect(() => {
    const calculateSubTotal = () => {
      const total = cartData.reduce((acc, currentValue) => {
        return acc + currentValue.price * currentValue.quantity;
      }, 0);
      setSubTotal(total);
    };
    calculateSubTotal();
  }, [cartData]);

  useEffect(() => {
    const collecting = subTotal + discount + shipping;
    setTotal(collecting);
  }, [subTotal, cartData, discount, shipping]);

  return (
    <div className="min-h-screen">
      {/* Parent Wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side – Products */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1  items-center md:gap-10 border-t p-4 mb-4 relative">
            {cartData.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-2 md:grid-cols-3 items-center md:gap-10 border-b p-4 mb-4 relative"
              >
                <div
                  className="absolute right-0 top-0 m-3 cursor-pointer"
                  onClick={() => removeFromCart(product._id)}
                >
                  ✕
                </div>
                {/* Product Info */}
                <div className="flex items-center gap-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <p className="font-medium text-lg hidden md:block">
                    {product.name}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex my-2 gap-1 mt-8">
                  <button
                    className="bg-gray-300 px-2 py-0 rounded"
                    onClick={() => handleProductDecrease(product)}
                  >
                    -
                  </button>
                  <p className="text-sm text-gray-500">
                    Quantity
                    <span className="text-black font-[20px]">
                      {product.quantity}
                    </span>
                  </p>
                  <button
                    className="bg-gray-300 px-2 py-0 rounded"
                    onClick={() => handleProductIncrease(product)}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <p className="text-sm text-gray-700 text-[20px] font-bold mt-1 ml-4">
                  Rs. {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side – Summary */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Coupon Section */}
          <div className="flex flex-col justify-between font-semibold mb-8">
            <div className="flex items-center justify-between">
              <label>Apply Coupon</label>
              <input type="text" className="border px-2 py-1" />
            </div>

            <div className="flex items-center justify-between mt-2">
              <button className="bg-gray-300 px-2 font-semibold rounded w-20">
                Apply
              </button>
              <button className="bg-gray-300 px-2 font-semibold rounded">
                Remove Coupon
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="flex justify-between font-semibold">
            <span>Sub Total</span>
            <span>Rs. {subTotal}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Discount</span>
            <span>Rs. {discount}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Shipping</span>
            <span>Rs. {shipping}</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>

          <Link to="/checkout">
            <button className="w-full mt-4 bg-black text-white py-2 rounded">
              Checkout
            </button>
          </Link>
        </div>

        {/* Right Side done */}
      </div>
    </div>
  );
};

export default Cart;

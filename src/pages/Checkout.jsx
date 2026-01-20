import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_API } from "../config/api";
import { AuthDataContext } from "../context/AuthContext";
import { CartDataContext } from "../context/CartContext";

const Checkout = () => {
  const [isAuthenticated, isAdmin, user] = useContext(AuthDataContext);

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
   const [shippingAddress, setShippingAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
  });

  const [formData, setFormData] = useState({
    user: user._id,
    orderItems: cartData,
    subtotal: subTotal,
    discount,
    total,
    shippingAddress
  });
 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // try {
    //   const res = await axios.post(`${BASE_API}/orders/create`, formData, {
    //     withCredentials: true,
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Shipping Information
          </h1>
          <p className="text-gray-600">
            Enter your delivery details for order shipment
          </p>
        </div>

        {/* Shipping Form Card */}
        <form
          className="bg-white rounded-xl shadow-lg p-8"
          onSubmit={handleFormSubmit}
        >
          {/* Form Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Shipping Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                value={shippingAddress.line1}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, line1: e.target.value })
                }
                type="text"
                placeholder="House number, street name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>

            {/* Secondary Shipping Address (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 2
              </label>
              <input
                value={shippingAddress.line2}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, line2: e.target.value })
                }
                type="text"
                placeholder="Apartment, suite, landmark (optional)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, city: e.target.value })
                }
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* State or Province */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State / Province
              </label>
              <input
                value={shippingAddress.province}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, province: e.target.value })
                }
                type="text"
                placeholder="Enter state or province"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Postal or ZIP Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                }
                type="text"
                placeholder="ZIP / Postal Code"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Country */}
            <div className="">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country
              </label>
              <input
                value={formData.shippingAddress}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, country: e.target.value })
                }
                type="text"
                placeholder="Enter your country"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-linear-to-r from-blue-400 to-blue-700 text-white font-semibold rounded-lg  transition-all shadow-lg"
            >
              Place Order
            </button>

            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

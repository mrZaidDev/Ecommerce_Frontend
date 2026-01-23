import React, { useEffect, useState } from "react";
import useFetchById from "../../../hooks/useFetchById";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API } from "../../../config/api";
import axios from "axios";
import { errorNotify, successNotify } from "../../../utils/Toast";

const UpdateOrder = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);

  const [formData, setFormData] = useState({
    paymentStatus: "",
    orderStatus: "",
  });

  const { response } = useFetchById(`${BASE_API}/admin/orders/${id}`);

  useEffect(() => {
    if (response) {
      setOrderData(response);
      setFormData({
        paymentStatus: response.paymentStatus,
        orderStatus: response.orderStatus,
      });
    }
  }, [response]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_API}/admin/orders/${id}`,
        {
          paymentStatus: formData.paymentStatus,
          orderStatus: formData.orderStatus,
        },
        { withCredentials: true },
      );
      successNotify(res.data.message);
      navigate('/admin/orders')
    } catch (error) {
      errorNotify(error.res.data.message);
    }
  };
  
  if (orderData) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 space-y-6"
        >
          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-800">Update Order</h2>

          {/* Order Info */}
          <div className="text-sm text-gray-500">
            Order ID: {orderData?._id}
          </div>

          {/* Customer Info (Read Only) */}
          <div className="border rounded-xl p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Customer</h3>
            <p className="text-sm text-gray-600">{orderData?.user?.name}</p>
            <p className="text-sm text-gray-600">{orderData?.user?.email}</p>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Status
            </label>
            <select
              value={formData.paymentStatus}
              onChange={(e) =>
                setFormData({ ...formData, paymentStatus: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          {/* Order Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Status
            </label>
            <select
              value={formData.orderStatus}
              onChange={(e) =>
                setFormData({ ...formData, orderStatus: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Method (Read Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <input
              type="text"
              disabled
              value={orderData?.paymentMethod}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Summary */}
          <div className="border rounded-xl p-4 text-sm text-gray-600 space-y-1">
            <p>Subtotal: ${orderData?.subtotal}</p>
            <p>Discount: ${orderData?.discount || 0}</p>
            <p className="font-semibold text-gray-800">
              Total: ${orderData?.total}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
            >
              Update Order
            </button>
            <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default UpdateOrder;

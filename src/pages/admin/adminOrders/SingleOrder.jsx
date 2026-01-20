import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchById from "../../../hooks/useFetchById";
import { BASE_API } from "../../../config/api";

const SingleOrder = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const { response } = useFetchById(`${BASE_API}/admin/orders/${id}`);
  useEffect(() => {
    if (response) {
      setOrderData(response);
    }
  }, [response]);

  console.log(orderData);
  if (orderData) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Order Details
            </h2>
            <span className="text-sm text-gray-500">
              Order ID: {orderData?._id}
            </span>
          </div>

          {/* Customer Info */}
          <section className="border rounded-xl p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Customer Information
            </h3>
            <p className="text-sm text-gray-600">
              Name: {orderData?.user?.name}
            </p>
            <p className="text-sm text-gray-600">
              Email: {orderData?.user?.email}
            </p>
          </section>

          {/* Shipping Address */}
          <section className="border rounded-xl p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Shipping Address
            </h3>
            <p className="text-sm text-gray-600">
              {orderData?.shippingAddress?.line1}
            </p>
            {orderData?.shippingAddress?.line2 && (
              <p className="text-sm text-gray-600">
                {orderData.shippingAddress.line2}
              </p>
            )}
            <p className="text-sm text-gray-600">
              {orderData?.shippingAddress?.city},{" "}
              {orderData?.shippingAddress?.province}
            </p>
            <p className="text-sm text-gray-600">
              {orderData?.shippingAddress?.country} -{" "}
              {orderData?.shippingAddress?.postalCode}
            </p>
          </section>

          {/* Order Items */}
          <section className="border rounded-xl p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Ordered Products
            </h3>

            <div className="space-y-4">
              {orderData?.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    {/* <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">
                      Image
                    </div> */}
                    <div>
                      <p className="font-medium text-gray-800">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        ${item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-700">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Summary */}
          <section className="border rounded-xl p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Payment Summary
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Subtotal: ${orderData?.subtotal}</p>
              <p>Discount: ${orderData?.discount || 0}</p>
              <p className="font-semibold text-gray-800">
                Total: ${orderData?.total}
              </p>
            </div>
          </section>

          {/* Status Section */}
          <section className="border rounded-xl p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Order Status
            </h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                Payment: {orderData?.paymentStatus}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                Order: {orderData?.orderStatus}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                Method: {orderData?.paymentMethod}
              </span>
            </div>
          </section>

          {/* Admin Actions */}
          <div className="flex gap-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl">
              Update Status
            </button>
            <button className="bg-red-100 hover:bg-red-200 text-red-700 px-5 py-2 rounded-xl">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div>loading...</div>;
};

export default SingleOrder;

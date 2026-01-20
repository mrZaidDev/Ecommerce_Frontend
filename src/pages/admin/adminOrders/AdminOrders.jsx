import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../config/api";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await axios.get(`${BASE_API}/admin/orders`, {
          withCredentials: true,
        });
        console.log(res);
        setOrders(res.data.allOrders);
      } catch (error) {
        console.log(error);
      }
    };
    getAllOrders();
  }, []);

  const handleOrderUpdate = (orderId) => {
    navigate(`/admin/update-order/${orderId}`);
  }

  const handleOrderView = (orderId) => {
    navigate(`/admin/view-order/${orderId}`);
  };

  return (
    <main className="">
      <div className="flex items-center gap-10 p-5">
        <h2 className="text-[22px] font-semibold">Products</h2>
      </div>
      <div className="overflow-x-auto">
        {/* {products ? ( */}
        <table className="min-w-full bg-white shadow-md rounded-lg ">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Order Id
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Customer
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Total Amount
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Payment Status
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Order Status
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Payment Method
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Created Date
              </th>

              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className={"bg-gray-50 hover:bg-gray-100"}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {order._id}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {order.user.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {order.total}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {order.paymentStatus}
                </td>

                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {order.orderStatus}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {order.paymentMethod}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {2025}
                </td>

                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  <div className="flex">
                    <button
                      onClick={() => handleOrderView(order._id)}
                      className="bg-green-600 text-white rounded py-1 px-2"
                    >
                      View
                    </button>
                    <button
                      className="bg-blue-600 ml-5 text-white rounded py-1 
                    px-2"
                      onClick={() => handleOrderUpdate(order._id)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdminOrders;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "../../../utils/Toast";

const AdminDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllDiscounts = async () => {
      try {
        const res = await axios.get(`${BASE_API}/discount/all`, {
          withCredentials: true,
        });
        setDiscounts(res.data);
      } catch (error) {
        errorNotify(error.res.data.message);
      }
    };
    getAllDiscounts();
  }, []);

  const handleDiscountDelete = async (discountId) => {
    try {
      const res = await axios.delete(
        `${BASE_API}/discount/delete/${discountId}`,
      );
      successNotify(res.data.message);
    } catch (error) {
      errorNotify(error.res.data.message);
    }
  };

  const handleDiscountUpdate = (discountId) => {
    navigate(`/admin/update-discount/${discountId}`);
  };

  return (
    <main className="">
      <div className="flex items-center gap-10 p-5">
        <h2 className="text-[22px] font-semibold">Discounts</h2>
        <button
          className="bg-blue-600 text-white rounded py-2 px-4 "
          onClick={() => navigate("/admin/create-discount")}
        >
          Add New Discount Code
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg ">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Code
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Type
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Discount
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                MinimumPurchase
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Active
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount, index) => (
              <tr key={index} className={"bg-gray-50 hover:bg-gray-100"}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {discount.code}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {discount.discountType}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {discount.value === 0 ? "Free Shipping" : discount.value}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {discount.minimumPurchase}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {discount.active ? "true" : "false"}
                </td>

                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  <div className="flex">
                    <button
                      onClick={() => handleDiscountUpdate(discount._id)}
                      className="bg-green-600 text-white rounded py-1 px-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDiscountDelete(discount._id)}
                      className="bg-red-600 ml-5 text-white rounded py-1 px-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* } */}
      </div>
    </main>
  );
};

export default AdminDiscounts;

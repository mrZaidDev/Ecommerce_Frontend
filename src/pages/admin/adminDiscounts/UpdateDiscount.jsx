import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_API } from "../../../config/api";
import { useParams } from "react-router-dom";

import useFetchById from "../../../hooks/useFetchById";

const UpdateDiscount = () => {
  const { id } = useParams();
  const [discountData, setDiscountData] = useState(null);
  const { response } = useFetchById(`${BASE_API}/discount/get/${id}`);
  useEffect(() => {
    if (response) {
      setFormData({
        code: response.discount.code,
        description: response.discount.description,
        discountType: response.discount.discountType,
        value: response.discount.value,
        minimumPurchase: response.discount.minimumPurchase,
        active: response.discount.active,
      });
    }
  }, [response]);

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "",
    value: "",
    minimumPurchase: "",
    active: "",
  });

  console.log(formData)
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `${BASE_API}/discount/update/${id}`,
          {
            code: formData.code,
            description: formData.description,
            discountType: formData.discountType,
            value: Number(formData.value),
            minimumPurchase: Number(formData.minimumPurchase),
            active: Boolean(formData.active),
          },
          {
            withCredentials: true,
          },
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Update Discount
        </h2>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {/* Discount Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Code
            </label>
            <input
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              type="text"
              placeholder="e.g. SAVE20"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              placeholder="Optional discount description"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.discountType}
              onChange={(e) =>
                setFormData({ ...formData, discountType: e.target.value })
              }
            >
              <option value="">Select discount type</option>
              <option value="PERCENT">Percentage</option>
              <option value="FLAT">Flat Amount</option>
              <option value="SHIPPING">Free Shipping</option>
            </select>
          </div>

          {/* Discount Value */}
          {formData.discountType !== "SHIPPING" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Value
              </label>
              <input
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                type="number"
                placeholder="e.g. 20"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Minimum Purchase */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Purchase Amount
            </label>
            <input
              value={formData.minimumPurchase}
              onChange={(e) =>
                setFormData({ ...formData, minimumPurchase: e.target.value })
              }
              type="number"
              placeholder="e.g. 100"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              value={formData.active}
              onChange={(e) => {
                console.log(e.target);
                setFormData({ ...formData, active: e.target.value });
              }}
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">Active</label>
          </div>

          {/* Submit Button */}
           <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
              >
                Update Product
              </button>

              <button
                type="button"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDiscount;

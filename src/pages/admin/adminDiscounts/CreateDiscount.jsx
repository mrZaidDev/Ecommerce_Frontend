import axios from "axios";
import React, { useState } from "react";
import { BASE_API } from "../../../config/api";

const CreateDiscount = () => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "",
    value: "",
    minimumPurchase: "",
    active: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_API}/discount/create`,
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

  console.log(formData);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Discount
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
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
          >
            Create Discount
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscount;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchById from "../../../hooks/useFetchById";
import { BASE_API } from "../../../config/api";
import { useEffect } from "react";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const { response } = useFetchById(`${BASE_API}/products/product/${id}`);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
  });
  console.log(formData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   try {
     const res = await axios.put(
      `${BASE_API}/products/product/${id}`,
      {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        stock: Number(formData.stock),
      },
      { withCredentials: true },
    );
    console.log(res)
   } catch (error) {
    console.log(error)
   }
  };

  useEffect(() => {
    if (response) {
      setFormData({
        name: response.product.name,
        description: response.product.description,
        price: response.product.price,
        image: response.product.image,
        stock: response.product.stock,
      });
    }
  }, [response]);

  if (response) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Update Product
          </h2>

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Action Buttons */}
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
  }
};

export default UpdateProduct;

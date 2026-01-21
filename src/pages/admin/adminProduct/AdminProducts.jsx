import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { errorNotify, successNotify } from "../../../utils/Toast";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`${BASE_API}/products/all`, {
          withCredentials: true,
        });
        setProducts(res.data.allProducts);
      } catch (error) {
        errorNotify(error.response.data.message)
      }
    };
    getAllProducts();
  }, []);

  const handleProductEdit = async (product) => {
    navigate(`/admin/update-product/${product._id}`);
  };

  const handleProductDelete = async (productId) => {
    try {
      const res = await axios.delete(`${BASE_API}/products/product/${productId}`)
      successNotify(res.data.message)
    } catch (error) {
      errorNotify(error.res.data.message)
    }
  } 

  return (
    <main className="">
      <div className="flex items-center gap-10 p-5">
        <h2 className="text-[22px] font-semibold">Products</h2>
        <button
          className="bg-blue-600 text-white rounded py-2 px-4 "
          onClick={() => navigate("/admin/create-product")}
        >
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg ">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Name
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Price
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Image
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Stock
              </th>
              <th className="py-3 px-4 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={"bg-gray-50 hover:bg-gray-100"}>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {product.name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {product.price}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  <img
                    className="w-15 h-15 rounded"
                    src={product.image}
                    alt=""
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  {product.stock}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-700">
                  <div className="flex">
                    <button
                      className="bg-green-600 text-white rounded py-1 px-2"
                      onClick={() => handleProductEdit(product)}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleProductDelete(product._id)}
                    className="bg-red-600 ml-5 text-white rounded py-1 px-2">
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

export default AdminProducts;

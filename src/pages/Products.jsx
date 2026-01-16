import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartDataContext } from "../context/CartContext";

const Products = () => {
  const [cartData, setCartData] = useContext(CartDataContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  console.log(cartData);
  const imageClick = (e) => {
    navigate(`/products/${e._id}`);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await axios.get(
        "http://localhost:5000/api/products/all"
      );
      setProducts(products.data.allProducts);
    };
    getAllProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log(product);

    const alreadyExists = cartData.find((p) => p._id === product._id);
    if (!alreadyExists) {
      product.quantity = 1;
      const cartProduct = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      };
      return setCartData([...cartData, cartProduct]);
    }
    console.log("product already exists");
  };

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="relative h-48 bg-gray-200 overflow-hidden">
            <img
              onClick={() => {
                imageClick(product);
              }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-700">
                Rs.{product.price}
              </span>
              {product.stock > 0 ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-black  text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add to cart
                </button>
              ) : (
                <button className="bg-red-500  text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  {" "}
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

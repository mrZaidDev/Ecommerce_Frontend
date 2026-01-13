import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(product)
  useEffect(() => {
    const fetchProductById = async () => {
      const product = await axios.get(
        `http://localhost:5000/api/products/product/${id}`
      );
      setProduct(product.data.findSingleProduct);
    };
    fetchProductById();
  },[]);

  return (
    <div className="min-h-[screen] p-4 lg:p-8">
      {/* Parent Of Both */}
      {product ? (
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Image Gallery */}
            <div className="lg:w-1/2 p-4 lg:p-8">
              <div className="flex flex-col-reverse lg:flex-row gap-4">
                {/* Images */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                  {/* {product.image.map((img, idx) => (
                    <button
                      key={idx}
                      className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-32 rounded-lg overflow-hidden border-3 transition-all ${
                        img === selectImage ? "border-blue-500" : ""
                      } `}
                      onClick={() => setSelectImage(img)}
                    >
                      <img
                        src={img}
                        alt={`Product view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))} */}
                </div>
                {/* Main Image */}
                <div className="flex-1">
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt="Selected product view"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-blue-600">
                    {product.price}
                  </span>
                </div>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
                  {/* <ShoppingCart className="w-5 h-5" /> */}
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>loading..</p>
      )}
    </div>
  );
};

export default ProductDetails;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const OWNER_WHATSAPP = "923334819147";

  const categories = [
    { name: "Electronics", icon: "💻", color: "bg-blue-100" },
    { name: "Home", icon: "🏠", color: "bg-green-100" },
    { name: "Sports", icon: "⚽", color: "bg-yellow-100" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Aziz Imported Collections
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your One-Stop Shop for Quality Products
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            <Link to={"/products"}>Shop Now</Link>
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-5xl  mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => setCurrentPage("products")}
                className={`${category.color} p-6 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable shipping to your doorstep
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Quality Products</h3>
              <p className="text-gray-600">
                100% authentic and high-quality items
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="h-screen flex justify-center items-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to My Shopping Cart Project
        </h1>
        <div className="space-y-4">
          <Link
            to="/product-list"
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Navigate to Product List
          </Link>
          <Link
            to="/cart"
            className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
          >
            Navigate to Your Cart
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;

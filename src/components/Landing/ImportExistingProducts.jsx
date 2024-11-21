import React from 'react';

const ImportExistingProducts = () => {
  return (
    <div className="bg-gray-50 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-16 ">
        {/* Left Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 overflow-hidden">
          <img 
            src="/import.png" // Replace with an actual image URL
            alt="Import Existing Products"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Import Existing Products
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Effortlessly manage your product listings by importing existing products from popular e-commerce platforms like Amazon, eBay, Shopify, and Walmart. Simplify the process of transferring your product data in just a few clicks using CSV files, saving time and boosting productivity.
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-6">
            <li>Easily upload product catalogs in CSV format.</li>
            <li>Preserve product titles, descriptions, prices, and images.</li>
            <li>Save time with automated bulk imports.</li>
          </ul>
          
          <button className="  bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
            Import Your Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportExistingProducts;


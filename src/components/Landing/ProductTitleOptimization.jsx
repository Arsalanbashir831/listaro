import React from 'react';

const ProductTitleOptimization = () => {
  return (
    <div className="bg-gray-50 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-16 ">
        {/* Left Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 overflow-hidden">
          <img 
            src="/prodTitle.png" // Replace with an actual image URL
            alt="Import Existing Products"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          AI Product Title Optimization
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Unlock the potential of your e-commerce listings with AI-powered product title optimization. Craft engaging, platform-specific, and keyword-rich titles that attract more clicks and boost your product visibility. Whether you're selling on Amazon, eBay, Shopify, or Walmart, our AI ensures your product titles stand out in search results and captivate your customers.
          </p>
          {/* <ul className="list-disc pl-5 text-gray-600 mb-6">
            <li>Easily upload product catalogs in CSV format.</li>
            <li>Preserve product titles, descriptions, prices, and images.</li>
            <li>Save time with automated bulk imports.</li>
          </ul> */}
          
          <button className="  bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
            Import Your Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTitleOptimization;


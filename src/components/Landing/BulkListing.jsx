import React from 'react';

const BulkListing = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container  flex flex-col md:flex-row items-center justify-between gap-12 px-4 ">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl text-left md:text-5xl font-extrabold text-gray-900 mb-6">
         Bulk Listing
          </h2>
          <p className="text-lg md:text-xl text-left text-gray-700 mb-6 leading-relaxed">
          Effortlessly create, manage, and optimize product listings for multiple e-commerce platforms with our powerful AI-driven solution. Whether you're listing on Amazon, eBay, Shopify, or Walmart, our bulk listing feature saves you time, enhances accuracy, and ensures your products shine in a competitive marketplace.
          </p>
          <ul className="list-disc pl-5 text-left text-gray-700 mb-8 space-y-3">
            <li>Upload multiple products at once and save hours of manual work.</li>
            <li>Tailor your listings to meet the unique requirements of Amazon, eBay, Shopify, and more.</li>
            <li>Generate keyword-rich descriptions to maximize visibility and drive more sales.</li>
          </ul>
          <div className='text-left'>
          <button className="  bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
            Get Started with AI Content
          </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src="/import.png" // Replace with the actual image URL
              alt="AI Content Generation"
              className="w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
            {/* Futuristic Glow */}
            <div className="absolute  to-transparent opacity-50 blur-xl rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkListing;

import React from 'react';

const AIListingSection = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container  flex flex-col md:flex-row items-center justify-between gap-12 px-4 ">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl text-left md:text-4xl font-extrabold text-gray-900 mb-6">
          Effortless AI-Powered Product Listings
          </h2>
          <p className="text-lg md:text-xl text-left text-gray-700 mb-6 leading-relaxed">
          Take the hassle out of listing creation. Our AI automatically crafts engaging, platform-specific product listings that help you stand out in competitive marketplaces like Amazon, eBay, Shopify, and Walmart
          </p>
          <ul className="list-disc pl-5 text-left text-gray-700 mb-8 space-y-3">
            <li>Generate unique, high-converting titles and descriptions in seconds</li>
            <li>Save time by optimizing for SEO and platform guidelines</li>
            <li>Deliver professional-quality listings without manual effort</li>
          </ul>
          <div className='text-left'>
          <button className="  bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
          Start with AI Content
          </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src="/listing_1.png" // Replace with the actual image URL
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

export default AIListingSection;

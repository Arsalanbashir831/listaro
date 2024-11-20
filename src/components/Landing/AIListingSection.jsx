import React from 'react';

const AIListingSection = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-4 ">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            AI-Driven Content Generation
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Generate high-quality, platform-specific product listings for your
            e-commerce store. Whether it's Amazon, eBay, or Shopify, our AI
            ensures your products stand out with optimized descriptions.
          </p>
          <ul className="list-disc pl-5 text-gray-700 mb-8 space-y-3">
            <li>Automatically generate engaging product titles</li>
            <li>Create detailed and compelling descriptions</li>
            <li>Optimize for search engines and platform-specific requirements</li>
          </ul>
          <button className="bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
            Get Started with AI Content
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src="/dashboard.png" // Replace with the actual image URL
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

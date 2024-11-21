import React from 'react';

const AIDescriptionOptimization = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container  flex flex-col md:flex-row items-center justify-between gap-12 px-4 ">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl text-left md:text-4xl font-extrabold text-gray-900 mb-6">
            AI Product Description Optimization
          </h2>
          <p className="text-lg md:text-xl text-left text-gray-700 mb-6 leading-relaxed">
            Elevate your product listings with AI-powered description optimization. Create compelling, SEO-friendly product descriptions that resonate with your audience, highlight unique selling points, and improve search visibility across platforms like Amazon, eBay, Shopify, and Walmart.
          </p>
          <ul className="list-disc pl-5 text-left text-gray-700 mb-8 space-y-3">
            <li>Craft persuasive descriptions that captivate potential buyers.</li>
            <li>Generate platform-specific content tailored to e-commerce giants.</li>
            <li>Boost search engine rankings with keyword-rich, optimized content.</li>
            <li>Highlight key features and benefits that make your product stand out.</li>
          </ul>
          <div className="text-left">
            <button className="bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
              Optimize Descriptions Now
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src="/ProdDesc.png" // Replace with the actual image URL
              alt="AI Description Optimization"
              className="w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-500"
            />
            {/* Futuristic Glow */}
            <div className="absolute to-transparent opacity-50 blur-xl rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDescriptionOptimization;

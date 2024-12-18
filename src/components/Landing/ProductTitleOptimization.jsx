import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductTitleOptimization = () => {
  const navigation = useNavigate()
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
          Engaging Product Titles That Drive Clicks
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Capture attention instantly with AI-generated titles tailored for your target audience. Our algorithms analyze trends, keywords, and competitors to deliver titles optimized for search engines and customers alike
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-6">
            <li>Maximize discoverability with platform-specific keywords.</li>
            <li>Create concise, click-worthy titles that boost sales.</li>
         
          </ul>
          
          <button onClick={()=>navigation('/auth')} className="  bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
         Optimize Title Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTitleOptimization;


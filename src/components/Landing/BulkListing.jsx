import React from 'react';
import { useNavigate } from 'react-router-dom';

const BulkListing = () => {
  const navigation= useNavigate()
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container  flex flex-col md:flex-row items-center justify-between gap-12 px-4 ">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl text-left md:text-5xl font-extrabold text-gray-900 mb-6">
          Save Time with Bulk Actions
          </h2>
          <p className="text-lg md:text-xl text-left text-gray-700 mb-6 leading-relaxed">
          Manage multiple listings simultaneously with our bulk upload and editing capabilities. Whether you're launching new products or updating existing ones, our tool handles it with efficiency and precision
          </p>
          <ul className="list-disc pl-5 text-left text-gray-700 mb-8 space-y-3">
            <li>Upload hundreds of listings at once.</li>
            <li>Streamline updates across marketplaces with a single click</li>
           
          </ul>
          <div className='text-left'>
          <button onClick={()=>navigation('/auth')}  className="  bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transform hover:scale-105 transition-transform duration-300">
            Start with Bulk Listing Now
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

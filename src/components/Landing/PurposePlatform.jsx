import React from "react";
import { useNavigate } from "react-router-dom";

const PurposePlatform = () => {
  const navigation = useNavigate()
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-12 px-4">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Built Specifically For E-commerce
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Unlike generic AI tools like <strong>ChatGPT</strong> or{" "}
            <strong>Jasper</strong>, Listaro is purpose-built to help e-commerce
            sellers craft <strong>high-performing product listings</strong> that
            drive sales efficiently.
          </p>
          <ul className="list-disc pl-5 text-gray-700 mb-8 space-y-3">
            <li>Purpose-built for e-commerce rather than general AI use.</li>
            <li>
              Outperforms ChatGPT and Jasper by tailoring features for online
              sellers.
            </li>
            <li>
              Helps sellers craft professional, high-converting listings faster
              than manual processes or generic AI solutions.
            </li>
          </ul>
          <div className="text-left">
            <button onClick={()=>navigation('/auth')} className="bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-transform duration-300">
              Start Creating Listings Now
            </button>
          </div>
        </div>

        {/* Right Content - Professional Image */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src="/ecommerce_img.png" // Replace with the actual image path
              alt="E-commerce AI Tool"
              className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
            />
            {/* Optional: Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-400 to-transparent opacity-40 blur-2xl rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurposePlatform;

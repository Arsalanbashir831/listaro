import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigation = useNavigate()
  return (
    <div className="flex flex-col md:flex-row items-center justify-between   text-gray-900">
      {/* Left Content */}
      <div className="max-w-md md:max-w-lg space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          The Fastest way to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">
            Create Winning 
          </span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
          Listings
          </span>
          {" "}that{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-400">
            Sell More
          </span>{" "}
        
         
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
        Leverage the power of AI to simplify your e-commerce workflows. Generate optimized product titles, descriptions, and keywords that rank higher and convert better—all in seconds.

        </p>
        <Button onClick={() => navigation('/auth')}
          type="primary"
          className="mt-6 font-bold bg-purple-800 py-5 text-white px-8  rounded-lg shadow-md hover:opacity-90 transition-all transform hover:scale-105"
        >
          Get Started
        </Button>
      </div>

      {/* Right Content */}
      <div className="mt-12 md:mt-0 flex justify-center">
        <div className="relative">
          <img
            src="/dashboard.png"
            alt="Interface preview"
            className="w-full max-w-xl rounded-lg shadow-lg"
          />
          {/* Add light futuristic glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200 opacity-50 rounded-lg shadow-2xl" />
          {/* Floating animation */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl opacity-75 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

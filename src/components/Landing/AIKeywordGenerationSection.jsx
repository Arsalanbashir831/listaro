import React from 'react';

const AIKeywordGenerationSection = () => {
  return (
    <div className="bg-gray-50 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-16 ">
        {/* Left Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 overflow-hidden">
          <img
            src="/keyword.png" // Replace with an actual image URL
            alt="AI Keyword Generation"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Boost Visibility with Intelligent Keywords
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Supercharge your product visibility with AI-generated, platform-specific keywords. Unlock high-performing suggestions tailored to your audience, marketplace, and industry.

          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-6">
            <li>Rank higher with search-optimized keyword recommendations.</li>
            <li>Save hours on manual keyword research with AI automation</li>
       
          </ul>
          <button className="bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
          Try the AI Keyword Generator
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIKeywordGenerationSection;

import React from "react";

const logos = [
  "/amazon.png",
  "/ebay.png",
  "/shopify.png",
  "/walmart.png",
  "/wixlogo.png",
  "/woocomerce.png",
  "/squarespacelogo.png",
  "/etsylogo.png",
];

const SpecificDomain = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-12 px-4">
        {/* Left Content - Logos Grid */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-4 gap-4">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-3 bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={logo}
                  alt={`Logo ${index}`}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Optimized Listings for Any Marketplace
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Ensure your product listings shine on any marketplace. Listaro’s AI
            adapts each output to meet the unique guidelines and SEO
            requirements of platforms like{" "}
            <strong>Amazon, eBay, Shopify, Wix, WooCommerce,</strong> and{" "}
            <strong>Squarespace</strong>.
          </p>
          <ul className="list-disc pl-5 text-gray-700 mb-8 space-y-3">
            <li>
              Automatically adjusts to each platform's rules and formats.
            </li>
            <li>
              Fine-tunes SEO keywords for maximum visibility on specific
              marketplaces.
            </li>
            <li>
              Delivers listings tailored to platform preferences, boosting
              conversions.
            </li>
          </ul>
          <div className="text-left">
            <button className="bg-purple-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-transform duration-300">
              Optimize Your Listings Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificDomain;

import React from "react";
import { motion } from "framer-motion";

const CarouselAnimation = () => {
  const logos = [
    "/amazon.png",
    "/ebay.png",
    "/shopify.png",
    "/walmart.png",
    '/wixlogo.png',
    '/woocomerce.png',
    '/squarespacelogo.png',
    '/etsylogo.png',
    "/amazon.png",
    "/ebay.png",
    "/shopify.png",
    "/walmart.png",
    '/wixlogo.png',
    '/woocomerce.png',
    '/squarespacelogo.png',
    '/etsylogo.png',
 
  ]; 

  return (
    <div className="w-full overflow-hidden  py-6">
      <motion.div
        className="flex gap-8"
        animate={{ x: [0, -1000] }} // Adjust distance based on logo width
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
        {/* Duplicate logos array for seamless loop */}
        {logos.concat(logos).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo ${index}`}
            className="w-32 h-32 object-contain"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CarouselAnimation;

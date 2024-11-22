import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      "I’ve saved countless hours on listing creation. This AI-powered tool is a must-have for every seller!",
    name: 'John Doe',
    position: 'E-commerce Specialist',
    image: 'https://via.placeholder.com/100',
  },
  {
    quote:
      "Using this AI service has boosted my sales by 40%! It's intuitive, fast, and produces high-quality content tailored for my platform.",
    name: 'Jane Smith',
    position: 'Digital Marketer',
    image: 'https://via.placeholder.com/100',
  },
  {
    quote:
      "This tool transformed my e-commerce workflow. From keyword optimization to creating product descriptions, it’s a game-changer",
    name: 'Michael Johnson',
    position: 'Product Manager',
    image: 'https://via.placeholder.com/100',
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          What Our Clients Say
        </h2>
        <motion.div
          className="flex gap-12"
          animate={{ x: ['0%', '-100%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 20,
          }}
          style={{ display: 'flex', width: '200%' }}
        >
          {/* Duplicate testimonials for seamless animation */}
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-1/3 px-4 text-center"
              style={{ minWidth: '33.333%' }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg text-gray-700 italic mb-4">
                “{testimonial.quote}”
              </p>
              <h4 className="text-xl font-bold text-gray-900">
                {testimonial.name}
              </h4>
              <p className="text-gray-500">{testimonial.position}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;

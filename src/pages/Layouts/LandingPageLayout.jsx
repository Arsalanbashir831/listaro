import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "../../components/Landing/HeroSection";
import CarouselAnimation from "../../components/Landing/CuraselAnimation";
import AIKeywordGenerationSection from "../../components/Landing/AIKeywordGenerationSection";
import AIListingSection from "../../components/Landing/AIListingSection";
import Testimonial from "../../components/Landing/Testimonial";
import ImportExistingProducts from "../../components/Landing/ImportExistingProducts";
import BulkListing from "../../components/Landing/BulkListing";
import ProductTitleOptimization from "../../components/Landing/ProductTitleOptimization";
import AIDescriptionOptimization from "../../components/Landing/AIDescriptionOptimization";
import { FaArrowAltCircleUp } from "react-icons/fa";
import SpecificDomain from "../../components/Landing/SpecificDomain";
import PurposePlatform from "../../components/Landing/PurposePlatform";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const LandingPageLayout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 relative">
      {/* Content Section */}
      <div className="container mx-auto py-16 px-4 sm:px-8 md:px-12 lg:px-20">
        {/* Hero Section */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <HeroSection />
        </motion.div>

        {/* Carousel Animation */}
        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <CarouselAnimation />
        </motion.div>

       

        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AIListingSection />
        </motion.div>

        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ProductTitleOptimization />
        </motion.div>

        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AIDescriptionOptimization />
        </motion.div>
        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AIKeywordGenerationSection />
        </motion.div>
       

        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PurposePlatform />
        </motion.div>
        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SpecificDomain />
        </motion.div>
        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <BulkListing />
        </motion.div>
        {/* <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ImportExistingProducts />
        </motion.div> */}
        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Testimonial />
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-700 text-white rounded-full p-4 shadow-lg hover:bg-purple-800 transition-transform transform hover:scale-110"
          aria-label="Scroll to Top"
        >
          <FaArrowAltCircleUp />
        </button>
      )}
    </div>
  );
};

export default LandingPageLayout;

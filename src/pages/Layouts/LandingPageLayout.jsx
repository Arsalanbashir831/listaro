import React from 'react';
import Navbar from '../../components/_common/Navbar';
import HeroSection from '../../components/Landing/HeroSection';
import CarouselAnimation from '../../components/Landing/CuraselAnimation';
import AIKeywordGenerationSection from '../../components/Landing/AIKeywordGenerationSection';
import AIListingSection from '../../components/Landing/AIListingSection';
import Testimonial from '../../components/Landing/Testimonial';

const LandingPageLayout = () => {
  return (
    <div className="bg-gray-50">
    
      {/* Content Section */}
      <div className="container mx-auto py-16 px-4 sm:px-8 md:px-12 lg:px-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Carousel Animation */}
        <div className="mt-16">
          <CarouselAnimation />
        </div>
      
        <div className="mt-16">
          <AIKeywordGenerationSection/>
        </div>
        <div className="mt-16">
          <AIListingSection/>
        </div>
        <div className="mt-16">
          <Testimonial/>
        </div>
      </div>
      
    </div>
  );
};

export default LandingPageLayout;

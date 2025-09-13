import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://www.royalmabati.com/cdn/shop/files/e770c4baeb5a1cc012d092390269b003_1.jpg?v=1718194991&width=1600',
  'https://www.royalmabati.com/cdn/shop/files/WhatsApp_Image_2024-07-03_at_08.49.08_6580b4d3.jpg?v=1719986125&width=1600',
  'https://www.ruirumabati.co.ke/images/2023/07/03/about.jpg',
  'https://i.ytimg.com/vi/WqPKhxb7bSk/hqdefault.jpg'
];

// Text overlays for each slide
const slideContent = [
  {
    title: "Premium Roofing Solutions",
    subtitle: "Quality materials for lasting protection",
    ctaText: "Explore Our Range"
  },
  {
    title: "Expert Installation",
    subtitle: "Professional service nationwide",
    ctaText: "Get a Quote"
  },
  {
    title: "Custom Design Options",
    subtitle: "Perfect for any architectural style",
    ctaText: "View Designs"
  },
  {
    title: "Affordable Excellence",
    subtitle: "Quality that fits your budget",
    ctaText: "See Pricing"
  }
];

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000);
  }, [isPaused]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startTimer();
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startTimer();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    startTimer();
  };

  return (
    <div 
      className="relative w-full h-[550px] overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="absolute w-full h-full object-cover"
          />
          
          {/* Text content */}
          <div 
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {slideContent[index].title}
            </h2>
            
            <p className="text-xl mb-8 max-w-2xl drop-shadow-md">
              {slideContent[index].subtitle}
            </p>
            
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {slideContent[index].ctaText}
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 z-30">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-linear"
          style={{ width: isPaused ? '0%' : '100%', transitionDuration: isPaused ? '0ms' : '5000ms' }}
        />
      </div>
    </div>
  );
};
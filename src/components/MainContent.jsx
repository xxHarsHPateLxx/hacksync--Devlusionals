import React, { useState, useEffect } from 'react';
import TrendingSection from './TrendingSection';
import QuickSearch from './QuickSearch';
import YouMightLike from './YouMightLike';
import TopPodcasters from './TopPodcasters';
import NowPlaying from './NowPlaying';

// A simple slider component with auto-slide every 2.5 seconds
function AutoSlider() {
  // Replace these placeholder images with your own or different placeholders
  const slides = [
    'https://imageio.forbes.com/specials-images/imageserve/651bbeb1c78cc403f92a6abd/0x0.jpg?format=jpg&crop=2500,1405,x0,y0,safe&height=900&width=1600&fit=bounds',
    'https://i0.wp.com/blog.kalvium.com/wp-content/uploads/2024/07/7.jpg?resize=800%2C534&ssl=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnGujLJpwhnsT6LW1IGzE6QcN0Vcq2PinFw&s=Slide+3',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move to the next slide every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manually go to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Manually go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg bg-gray-800 flex items-center justify-center">
      {/* Current slide */}
      <img
        src={slides[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-cover"
      />

      {/* Left (Prev) button */}
      <button
        onClick={handlePrev}
        className="absolute left-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
      >
        Prev
      </button>

      {/* Right (Next) button */}
      <button
        onClick={handleNext}
        className="absolute right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
      >
        Next
      </button>
    </div>
  );
}

function MainContent() {
  return (
    <main className="flex-1 p-6">
      {/* AutoSlider placed at the top, no sizing disturbed */}
      <AutoSlider />

      {/* Top Row: Trending + Quick Search */}
      <div className="flex flex-col lg:flex-row gap-6">
        <TrendingSection />
        <QuickSearch />
      </div>

      {/* You Might Like */}
      <div className="mt-6">
        <YouMightLike />
      </div>

      {/* Bottom Row: Top Podcasters + Now Playing */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <TopPodcasters />
        <NowPlaying />
      </div>
    </main>
  );
}

export default MainContent;

import React, { useEffect, useState } from 'react';

function Slideshow({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] max-w-3xl flex items-center justify-center rounded-lg overflow-hidden shadow-lg bg-white">
      {images.length > 0 ? (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 text-3xl text-indigo-600 font-bold bg-white/80 rounded-full px-2 py-1 hover:bg-white transition"
          >
            ‹
          </button>

          <a href={images[currentIndex].viewUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={images[currentIndex].link} // ✅ USE main link
              alt={images[currentIndex].name}
              className="object-cover w-full h-[400px] animate-fadeIn"
              onError={(e) => {
                console.error(`Failed to load image: ${images[currentIndex].link}`);
                e.target.style.display = 'none';
              }}
            />
          </a>

          <button
            onClick={nextSlide}
            className="absolute right-4 text-3xl text-indigo-600 font-bold bg-white/80 rounded-full px-2 py-1 hover:bg-white transition"
          >
            ›
          </button>
        </>
      ) : (
        <p className="text-lg text-gray-800">No images available</p>
      )}
    </div>
  );
}

export default Slideshow;

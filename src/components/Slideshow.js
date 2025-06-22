import React, { useState, useEffect, useRef, useCallback } from 'react';

const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef(null);

  const startSlideshow = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 3000); // fade out duration matches CSS transition duration
    }, 7000); // longer interval for slower transition
  }, [images.length]);

  const pauseSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (images.length > 0) startSlideshow();
    return () => pauseSlideshow();
  }, [images.length, startSlideshow]);

  const goToPrevious = () => {
    pauseSlideshow();
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true);
      startSlideshow();
    }, 3000); // same as fade out duration
  };

  const goToNext = () => {
    pauseSlideshow();
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setFade(true);
      startSlideshow();
    }, 3000); // same as fade out duration
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-lg"
      onMouseEnter={pauseSlideshow}
      onMouseLeave={startSlideshow}
    >
      {images.length > 0 && (
        <img
          src={`http://localhost:5000/api/image/${images[currentIndex].id}`}
          alt={images[currentIndex].name}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-[3000ms] ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl text-indigo-600 font-bold bg-white/70 rounded-full px-2 py-1 hover:bg-white transition"
      >
        &#8249;
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-indigo-600 font-bold bg-white/70 rounded-full px-2 py-1 hover:bg-white transition"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Slideshow;

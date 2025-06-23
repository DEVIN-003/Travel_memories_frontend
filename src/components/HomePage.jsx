import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slideshow from './Slideshow';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  // States to toggle shaking per button
  const [shakeNewFolder, setShakeNewFolder] = useState(true);
  const [shakeExistingFolder, setShakeExistingFolder] = useState(true);

  // Refs to hold timers so we can clear on unmount
  const timers = useRef([]);

  useEffect(() => {
    fetchImages();

    // Setup shake toggle loops for both buttons with different offsets
    startShakeCycle(setShakeNewFolder, 0);
    startShakeCycle(setShakeExistingFolder, 500); // 0.5s offset for second button

    // Cleanup timers on unmount
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  // Function to start the shaking toggle cycle for a button
  const startShakeCycle = (setShake, initialDelay = 0) => {
    const cycle = () => {
      // Start shaking
      setShake(true);

      // After 2s, stop shaking
      const stopTimer = setTimeout(() => {
        setShake(false);
      }, 2000);

      timers.current.push(stopTimer);

      // After 12s total (2s shake + 10s pause), restart cycle
      const restartTimer = setTimeout(() => {
        cycle();
      }, 12000);

      timers.current.push(restartTimer);
    };

    // Start after initial delay (for offset)
    const initialTimer = setTimeout(() => {
      cycle();
    }, initialDelay);

    timers.current.push(initialTimer);
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get('https://travel-memories-backend.vercel.app/api/gallery');
      const formattedImages = res.data.map((file) => ({
        id: file.id,
        name: file.name,
        directLink: file.directLink,
      }));
      setImages(formattedImages);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  const renderBloomingText = (text) => (
    <div className="bloom-container">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="bloom-letter"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center relative text-white"
      style={{
        backgroundImage: "url('/images/family.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-white opacity-20"></div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold mb-8 tracking-wide animate-slideIn text-center drop-shadow-lg">
          Travel Memories
        </h1>

        <div className="flex gap-6 mb-8 flex-wrap justify-center">
          <button
            onClick={() => navigate('/new-folder')}
            className={`bg-white text-indigo-700 px-8 py-3 rounded-xl shadow-lg font-semibold transition transform hover:scale-105 hover:bg-indigo-600 hover:text-white hover:shadow-2xl hover:shadow-indigo-400/60 ${
              shakeNewFolder ? 'shake delay-0' : ''
            }`}
          >
            New Folder
          </button>
          <button
            onClick={() => navigate('/existing-folder')}
            className={`bg-white text-indigo-700 px-8 py-3 rounded-xl shadow-lg font-semibold transition transform hover:scale-105 hover:bg-indigo-600 hover:text-white hover:shadow-2xl hover:shadow-indigo-400/60 ${
              shakeExistingFolder ? 'shake delay-1' : ''
            }`}
          >
            Existing Folder
          </button>
        </div>

        <div className="homepage-content mt-6">
          <div className="slideshow-side">
            <Slideshow images={images} />
          </div>

          <div className="quote-side">
            {renderBloomingText(
              "Living in one place is like holding a single page; when you travel, you don’t just turn pages — you walk through an entire library of life."
            )}
          </div>
        </div>

        <footer className="mt-8 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} Travel Memories — Updated Annually</p>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="home-container">
      <h1>Travel Memories</h1>
      <div className="button-group">
        <button onClick={() => navigate('/new-folder')}>New Folder</button>
        <button onClick={() => navigate('/existing-folder')}>Existing Folder</button>
      </div>

      <div className="slideshow-container">
        {images.length > 0 ? (
          <div className="slideshow">
            <button onClick={prevSlide} className="arrow">&lt;</button>
            <img
              src={images[currentIndex].link}   // ✅ THIS is the actual image link
              alt={images[currentIndex].name}
              className="slide-image"
            />
            <button onClick={nextSlide} className="arrow">&gt;</button>
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;

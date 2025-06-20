import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slideshow from './Slideshow';

function HomePage() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setImages(res.data);
    } catch (err) {
      console.error('Error fetching images:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-4 text-white">
      <h1 className="text-4xl font-extrabold mb-6 animate-fadeIn">Travel Memories</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate('/new-folder')}
          className="bg-white text-indigo-700 px-6 py-2 rounded-lg shadow-md font-medium hover:bg-gray-100 transition"
        >
          New Folder
        </button>
        <button
          onClick={() => navigate('/existing-folder')}
          className="bg-white text-indigo-700 px-6 py-2 rounded-lg shadow-md font-medium hover:bg-gray-100 transition"
        >
          Existing Folder
        </button>
      </div>

      <Slideshow images={images} />
    </div>
  );
}

export default HomePage;

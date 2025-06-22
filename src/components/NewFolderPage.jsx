import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from './ParticlesBackground'; // ✅ Importing Particles

function NewFolderPage() {
  const [folderName, setFolderName] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!folderName || files.length === 0) {
      alert('Please enter a folder name and select files.');
      return;
    }

    const formData = new FormData();
    formData.append('folderName', folderName);
    Array.from(files).forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('http://localhost:5000/api/upload/new-folder', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Files uploaded successfully');
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative text-white p-4 bg-black">
      {/* ✅ Background 3D Dynamic Particles */}
      <ParticlesBackground />

      {/* ✅ Upload Box */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md z-10 relative animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 drop-shadow-lg">Create New Folder</h2>

        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          required
          className="w-full px-4 py-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
        />

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="w-full mb-6 text-gray-700"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold text-lg"
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default NewFolderPage;

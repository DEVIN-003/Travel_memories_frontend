import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExistingFolderPage.css'; // ✅ Add this line for custom background animation

function ExistingFolderPage() {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/folders');
      setFolders(res.data);
    } catch (err) {
      console.error('Error fetching folders:', err);
    }
  };

  const handleUpload = async () => {
    if (!selectedFolderId || files.length === 0) {
      alert('Please select a folder and choose at least one file');
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await axios.post(`http://localhost:5000/api/upload/existing/${selectedFolderId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully');
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const handleDelete = async (folderId) => {
    if (!window.confirm('Are you sure you want to delete this folder?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/folders/${folderId}`);
      alert('Folder deleted successfully');
      fetchFolders();
    } catch (err) {
      console.error(err);
      alert('Failed to delete folder');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* ✅ Dynamic Background */}
      <div className="animated-gradient-bg absolute inset-0 z-0"></div>

      {/* ✅ Main Content */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl animate-fadeIn z-10 relative">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Upload to Existing Folder</h2>

        <select
          onChange={(e) => setSelectedFolderId(e.target.value)}
          value={selectedFolderId}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select Folder</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="w-full mb-4 text-gray-700"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 mb-6"
        >
          Upload
        </button>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">Folders</h3>
        {folders.length > 0 ? (
          <ul className="space-y-3">
            {folders.map((folder) => (
              <li key={folder.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow">
                <span className="text-gray-800 font-medium">{folder.name}</span>
                <button
                  onClick={() => handleDelete(folder.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No folders found</p>
        )}
      </div>
    </div>
  );
}

export default ExistingFolderPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExistingFolderPage() {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState('');
  const [file, setFile] = useState(null);

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
    if (!selectedFolderId || !file) {
      alert('Please select a folder and choose a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`http://localhost:5000/api/upload/existing/${selectedFolderId}`, formData);
      alert('File uploaded successfully');
      setFile(null);
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
      fetchFolders(); // refresh the list
    } catch (err) {
      console.error(err);
      alert('Failed to delete folder');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Upload to Existing Folder</h1>

      <select onChange={(e) => setSelectedFolderId(e.target.value)} value={selectedFolderId}>
        <option value="">Select Folder</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '10px' }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload} style={{ marginLeft: '10px' }}>
          Upload
        </button>
      </div>

      <h2 style={{ marginTop: '30px' }}>Folders</h2>
      {folders.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {folders.map((folder) => (
            <li key={folder.id} style={{ marginBottom: '10px' }}>
              {folder.name}{' '}
              <button
                onClick={() => handleDelete(folder.id)}
                style={{ color: 'white', background: 'red', border: 'none', padding: '4px 8px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No folders found</p>
      )}
    </div>
  );
}

export default ExistingFolderPage;

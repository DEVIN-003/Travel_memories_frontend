import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewFolderPage() {
  const [folderName, setFolderName] = useState('');
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!folderName || files.length === 0) {
      alert('Enter folder name and choose files.');
      return;
    }

    const formData = new FormData();
    formData.append('folderName', folderName);
    Array.from(files).forEach((file) => formData.append('files', file));

    try {
      await axios.post('http://localhost:5000/api/upload/new-folder', formData);
      alert('Uploaded successfully');
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Create New Folder</h2>
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      /><br /><br />
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      /><br /><br />
      <button onClick={handleUpload}>Done</button>
    </div>
  );
}

export default NewFolderPage;

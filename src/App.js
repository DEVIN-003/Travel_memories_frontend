import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import NewFolderPage from './components/NewFolderPage';
import ExistingFolderPage from './components/ExistingFolderPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-gray-900">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new-folder" element={<NewFolderPage />} />
          <Route path="/existing-folder" element={<ExistingFolderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

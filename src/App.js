import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import NewFolderPage from './components/NewFolderPage';
import ExistingFolderPage from './components/ExistingFolderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-folder" element={<NewFolderPage />} />
        <Route path="/existing-folder" element={<ExistingFolderPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const sentence = 'Welcome to the World of Travel Memories';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin123') {
      navigate('/home');
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/travel-forest.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 📝 Login Form */}
      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-md px-4 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-white/20 transition"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:bg-white/20 transition"
        />
        <button
          type="submit"
          className="w-full bg-transparent border border-white text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:border-indigo-600 transition duration-300"
        >
          Login
        </button>
      </form>

      {/* 🔤 Falling Letters Animation */}
      <div className="falling-letters z-0 mt-10">
        {sentence.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LoginPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow about-container max-w-4xl mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-[#678894] mb-6">About WEDLY</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="mb-4 text-lg">WEDLY is an AI-powered wedding planner designed to make your special day unforgettable.</p>
          <p className="mb-4 text-lg">Our platform uses advanced AI to help you plan every aspect of your wedding, from venue selection to guest management.</p>
          <p className="mb-4 text-lg">We understand that planning a wedding can be overwhelming, which is why we've created a comprehensive solution that brings together all the tools you need in one place.</p>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleBackToHome}
            className="bg-[#678894] text-white px-6 py-2 rounded-md hover:bg-[#557381] transition-colors"
          >
            Back to {token ? 'Dashboard' : 'Home'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

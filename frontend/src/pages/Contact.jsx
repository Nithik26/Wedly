import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setStatus(response.data.message);
      alert('✅ Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setStatus('Error sending message. Please try again.');
      alert('❌ Error sending message. Please try again.');
    }
  };

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
      <div className="flex-grow contact-container max-w-2xl mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-[#678894] mb-6">Contact Us</h1>
        
        {/* Contact Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-[#678894] font-semibold mr-2">📞 Contact No:</span>
              <span className="text-gray-700">+91 98921 75757</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#678894] font-semibold mr-2">📧 Email:</span>
              <span className="text-gray-700">support@wedly.com</span>
            </div>
            <div className="flex items-start">
              <span className="text-[#678894] font-semibold mr-2">📍 Address:</span>
              <span className="text-gray-700">123 Wedding Plaza, Suite 456<br />Prabhadevi, BOM 400010<br />India</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
          <p className="mb-6 text-gray-600">Have questions or need support? Fill out the form below and we'll get back to you soon.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#678894]"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#678894]"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#678894]"
              ></textarea>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={handleBackToHome}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back to {token ? 'Dashboard' : 'Home'}
              </button>
              
              <button
                type="submit"
                className="bg-[#678894] text-white px-6 py-2 rounded-md hover:bg-[#557381] transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
          
          {status && (
            <div className="mt-4 text-center">
              <p className={status.includes('Error') ? 'text-red-500' : 'text-green-500'}>
                {status}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// In src/pages/Auth.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // This e.preventDefault() STOPS the page from reloading
    e.preventDefault(); 
    
    if (isLogin) {
      console.log("Attempting to log in...");
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard/details');
      }
    } else {
      // --- Signup Logic ---
      try {
        console.log("Attempting to sign up with:", { name, email });
        await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
        
        console.log("Signup successful!");
        alert('Signup successful! Please log in.');
        setIsLogin(true);
        setPassword('');
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <Link to="/" className="auth-logo">WEDLY</Link>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        
        {/*
          --- THIS IS THE CRITICAL LINE ---
          The form MUST have onSubmit={handleSubmit}
        */}
        <form onSubmit={handleSubmit} className="auth-form">
          
          {!isLogin && (
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required={!isLogin} 
              />
            </div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              minLength="6" 
            />
          </div>
          <button type="submit" className="primary-btn submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <button onClick={() => setIsLogin(!isLogin)} className="toggle-auth-btn">
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
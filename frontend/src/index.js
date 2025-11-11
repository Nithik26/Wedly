// In src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// --- ADDED ---
// Import the AuthProvider to manage login state
import { AuthProvider } from './context/AuthContext';
// Import the BrowserRouter to enable routing
import { BrowserRouter } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* --- ADDED --- */}
    {/* These wrappers must be here to fix your redirect */}
    <BrowserRouter> 
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
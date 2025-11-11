// In src/components/Footer.jsx
import React from 'react';

const footerStyle = {
  textAlign: 'center',
  padding: '2rem',
  marginTop: '2rem',
  borderTop: '1px solid #eee',
  background: '#f9f9f9',
};

// --------> CRITICAL LINE <--------
export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 WEDLY. All rights reserved.</p>
    </footer>
  );
}
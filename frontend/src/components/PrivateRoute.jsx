// In src/components/PrivateRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const PrivateRoute = () => {
  const { token } = useAuth();
  const localToken = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle any trailing slashes
  useEffect(() => {
    if (location.pathname.endsWith('/') && location.pathname !== '/dashboard/') {
      navigate(location.pathname.slice(0, -1), { replace: true });
    }
  }, [location.pathname, navigate]);

  // If both are null, not logged in
  if (!token && !localToken) {
    return <Navigate to="/login" replace />;
  }

  // If AuthContext is still loading token, show temporary loader
  if (token === undefined) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#678894]"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <main className="main-content flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PrivateRoute;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(token ? "/dashboard" : "/");
  };

  const handleSidebarToggle = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      if (isSidebarOpen) {
        sidebar.classList.add("-translate-x-full");
      } else {
        sidebar.classList.remove("-translate-x-full");
      }
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[#678894] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            {token && (
              <button
                onClick={handleSidebarToggle}
                className="text-2xl font-bold focus:outline-none md:hidden mr-2"
              >
                ☰
              </button>
            )}
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold tracking-wide hover:opacity-90"
            >
              WEDLY
            </button>
          </div>

          {/* Center Section - Navigation Links (Always Visible on Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-white text-sm font-medium hover:text-[#ffeaea] transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white text-sm font-medium hover:text-[#ffeaea] transition-colors">
              Contact
            </Link>
            <Link to="/admin" className="text-white text-sm font-medium hover:text-[#ffeaea] transition-colors">
              Admin
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center text-sm font-medium hover:text-[#ffeaea] transition-colors"
                >
                  Profile
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-[#678894] px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-[#ffeaea] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#ffeaea] hover:bg-[#557381]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#ffeaea] hover:bg-[#557381]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#ffeaea] hover:bg-[#557381]"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              {token ? (
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#ffeaea] hover:bg-[#557381]"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-[#ffeaea] hover:bg-[#557381]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

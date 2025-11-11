import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className="
        sidebar fixed md:flex flex-col justify-between
        bg-white w-64 h-[calc(100vh-64px)] top-[64px] border-r border-gray-200 z-40 p-4
        transition-transform duration-300 ease-in-out transform
        md:translate-x-0
      "
    >
      {/* -------- Menu Section -------- */}
      <div>
        <h2 className="text-lg font-semibold text-[#678894] mb-4">Menu</h2>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "bg-[#ff7675] text-white shadow-sm"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
          >
            🏠 <span>Home</span>
          </NavLink>

          <NavLink
            to="/dashboard/details"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "bg-[#ff7675] text-white shadow-sm"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
          >
            💍 <span>Wedding Details</span>
          </NavLink>

          <NavLink
            to="/dashboard/ai-assistant"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "bg-[#ff7675] text-white shadow-sm"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
          >
            🤖 <span>AI Assistant</span>
          </NavLink>

          {/* ✅ Fixed Checklist link — it will now appear consistently */}
          <NavLink
            to="/dashboard/checklist"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "bg-[#ff7675] text-white shadow-sm"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
          >
            ✅ <span>Checklist</span>
          </NavLink>

          <NavLink
            to="/dashboard/itinerary"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium flex items-center gap-2 transition-colors duration-200 ${
                isActive
                  ? "bg-[#ff7675] text-white shadow-sm"
                  : "text-gray-800 hover:bg-gray-100"
              }`
            }
          >
            📋 <span>Itinerary</span>
          </NavLink>
        </nav>
      </div>

      {/* -------- Footer Section -------- */}
      <div className="border-t pt-4 text-center">
        <div className="flex flex-col items-center mb-2">
          <span className="text-2xl">👤</span>
          <span className="font-semibold text-gray-700">You</span>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-red-500 font-semibold hover:text-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

// src/pages/Checklist.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../assets/Checklist.css";

export default function Checklist() {
  const { token } = useAuth() || {}; // ✅ prevents crash if context undefined
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🧠 Prevent running API before token is ready
  useEffect(() => {
    fetchChecklist();
  }, []);

  const fetchChecklist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/checklist", {
        withCredentials: true
      });
      if (res.data && res.data.items) {
        setItems(sortItems(res.data.items));
        setError(null);
      } else {
        setError("Invalid response format from server");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Could not load checklist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sortItems = (list) => [...list].sort((a, b) => a.completed - b.completed);

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/checklist",
        { text: newItem },
        { withCredentials: true }
      );
      setItems(sortItems(res.data.items));
      setNewItem("");
    } catch (err) {
      console.error("❌ Add item error:", err.message);
      setError("Failed to add item");
    }
  };

  const toggleItem = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/checklist/${id}`,
        {},
        { withCredentials: true }
      );
      setItems(sortItems(res.data.items));
    } catch (err) {
      setError("Failed to toggle item");
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/checklist/${id}`, {
        withCredentials: true
      });
      setItems(sortItems(res.data.items));
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const progress = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading your checklist...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Wedding Checklist ✅</h2>
          <p className="text-gray-500 mb-6">
            {completedCount} of {totalCount} tasks completed
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-[#678894] h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <form onSubmit={addItem} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new task..."
              className="border rounded-lg p-2 flex-1"
            />
            <button
              type="submit"
              className="bg-[#678894] text-white px-4 py-2 rounded-lg hover:bg-[#56727f]"
            >
              Add
            </button>
          </form>

          <ul>
            {items.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks yet — start planning 💍</p>
            ) : (
              items.map((item) => (
                <li
                  key={item._id}
                  className={`flex justify-between items-center bg-white shadow-sm rounded-lg p-3 mb-2 ${
                    item.completed ? "opacity-80" : ""
                  }`}
                >
                  <span
                    onClick={() => toggleItem(item._id)}
                    className={`cursor-pointer ${
                      item.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700 hover:text-[#678894]"
                    }`}
                  >
                    {item.text}
                  </span>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </li>
              ))
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}

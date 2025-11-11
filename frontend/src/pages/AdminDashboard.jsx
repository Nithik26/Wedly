import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const [data, setData] = useState({
    users: [],
    checklists: [],
    itineraries: [],
    weddingDetails: [],
    contacts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/all-data', {
        withCredentials: true
      });
      setData(res.data);
      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (collection, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${collection} record?`)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/admin/${collection}/${id}`, {
        withCredentials: true
      });
      fetchAllData(); // Refresh data
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Failed to delete record');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen pt-16">
          <div className="text-xl text-gray-600">Loading data...</div>
        </div>
      </div>
    );
  }

  const renderTable = (collection, items) => {
    if (!items || items.length === 0) {
      return <p className="text-gray-500 text-center py-4">No {collection} found</p>;
    }

    // Render specific format based on collection type
    switch(collection) {
      case 'users':
        return renderUsersTable(items);
      case 'checklists':
        return renderChecklistsTable(items);
      case 'itineraries':
        return renderItinerariesTable(items);
      case 'weddingDetails':
        return renderWeddingDetailsTable(items);
      case 'contacts':
        return renderContactsTable(items);
      default:
        return null;
    }
  };

  const renderUsersTable = (items) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Created At</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-600">{item._id?.slice(0, 8)}...</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800 font-medium">
                {item.name || 'N/A'}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                {item.email || 'N/A'}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDelete('users', item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderChecklistsTable = (items) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Task</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Couple Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-800 font-medium">{item.task}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {item.category || 'General'}
                </span>
              </td>
              <td className="px-4 py-2 border-b text-sm">
                <span className={`px-2 py-1 rounded text-xs ${
                  item.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.completed ? 'Completed' : 'Pending'}
                </span>
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800 font-medium">
                {item.userId ? item.userId.replace(/_/g, ' & ') : 'N/A'}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDelete('checklists', item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderItinerariesTable = (items) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Event Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Time</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Location</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Couple Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-800 font-medium">{item.eventName}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">{item.time || 'N/A'}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">{item.location || 'N/A'}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800 font-medium">
                {item.userId ? item.userId.replace(/_/g, ' & ') : 'N/A'}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDelete('itineraries', item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderWeddingDetailsTable = (items) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Couple</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Wedding Date</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Venue</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Budget</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Guest Count</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-800 font-medium">
                {item.partner1} & {item.partner2}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                {item.weddingDate ? new Date(item.weddingDate).toLocaleDateString() : 'N/A'}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">{item.venue || 'N/A'}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                {item.budget ? `$${item.budget.toLocaleString()}` : 'N/A'}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">{item.guestCount || 'N/A'}</td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDelete('weddingDetails', item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContactsTable = (items) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Subject</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Message</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-800 font-medium">{item.name}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">{item.email}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">{item.subject || 'N/A'}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-600 max-w-xs truncate">
                {item.message}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-600">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
              </td>
              <td className="px-4 py-2 border-b">
                <button
                  onClick={() => handleDelete('contacts', item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-300">
          <div className="flex space-x-4">
            {['users', 'checklists', 'itineraries', 'weddingDetails', 'contacts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-[#678894] text-[#678894]'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab} ({data[tab]?.length || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Data Display */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 capitalize">{activeTab}</h2>
          {renderTable(activeTab, data[activeTab])}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { format } from 'date-fns';

export default function Itinerary() {
  const { token } = useAuth() || {};
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    time: '',
    title: '',
    description: '',
    location: '',
    duration: ''
  });

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchItinerary();
  }, [token]);

  const fetchItinerary = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/itinerary', {
        withCredentials: true
      });
      setItinerary(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch itinerary:', err);
      setError('Could not load itinerary');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (!newEvent.time || !newEvent.title) {
      setError('Time and title are required');
      return;
    }

    try {
      // Make sure we have valid time format (HH:mm)
      if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(newEvent.time)) {
        setError('Please enter a valid time in HH:mm format');
        return;
      }

      const events = [...(itinerary?.events || []), newEvent].sort((a, b) => {
        return new Date('2000/01/01 ' + a.time) - new Date('2000/01/01 ' + b.time);
      });

      const res = await axios.post(
        'http://localhost:5000/api/itinerary',
        {
          events,
          weddingDate: itinerary?.weddingDate || new Date()
        },
        {
          withCredentials: true
        }
      );

      setItinerary(res.data);
      setNewEvent({
        time: '',
        title: '',
        description: '',
        location: '',
        duration: ''
      });
    } catch (err) {
      // More detailed error handling
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to add event';
      setError(errorMessage);
      console.error('Error adding event:', err.response?.data || err.message);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/itinerary/event/${eventId}`,
        {
          withCredentials: true
        }
      );
      setItinerary(res.data);
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl text-gray-600">Loading itinerary...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-700 mb-2">Wedding Day Itinerary 📋</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Add new event form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    placeholder="e.g., Ceremony Start"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    placeholder="e.g., Main Hall"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    placeholder="e.g., 1 hour"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    placeholder="Add any additional details..."
                    rows="2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-[#678894] text-white px-4 py-2 rounded-lg hover:bg-[#56727f]"
              >
                Add Event
              </button>
            </form>

            {/* Timeline */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Timeline</h3>
              {(!itinerary?.events || itinerary.events.length === 0) ? (
                <p className="text-gray-500 text-center py-4">
                  No events added yet. Start building your wedding day timeline! ✨
                </p>
              ) : (
                <div className="space-y-4">
                  {itinerary.events.map((event, index) => (
                    <div
                      key={event._id || index}
                      className="flex items-start bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex-shrink-0 w-24 text-[#678894] font-semibold">
                        {event.time}
                      </div>
                      <div className="flex-1 ml-4">
                        <h4 className="font-semibold text-gray-800">{event.title}</h4>
                        {event.location && (
                          <p className="text-sm text-gray-600">📍 {event.location}</p>
                        )}
                        {event.duration && (
                          <p className="text-sm text-gray-600">⏱ {event.duration}</p>
                        )}
                        {event.description && (
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteEvent(event._id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
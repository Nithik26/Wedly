import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../assets/WeddingDetails.css";

export default function WeddingDetails() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    partner1: "",
    partner2: "",
    weddingDate: "",
    budget: "",
    guestCount: "",
    venue: "",
    theme: "",
    notes: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/weddingdetails", {
          withCredentials: true
        });
        if (res.data) setFormData((p) => ({ ...p, ...res.data }));
      } catch (e) {
        console.error("Fetch wedding details error:", e?.response?.data || e.message);
      }
    };
    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/weddingdetails",
        formData,
        { withCredentials: true }
      );

      alert("Wedding details saved!");
      // You now have a full plan from the backend:
      console.log("Generated Plan:", res.data.plan);

      // (Optional) store plan to localStorage to show in another page
      localStorage.setItem("wedly_plan", JSON.stringify(res.data.plan));

      navigate("/dashboard"); // or a dedicated page to view the plan
    } catch (e) {
      console.error("Save wedding details error:", e?.response?.data || e.message);
      alert("Failed to save wedding details. Please try again.");
    }
  };

  return (
    <div className="wedding-details-container">
      <h2>Wedding Details</h2>
      <p>Please provide some details about your wedding to help us assist you better.</p>

      <form onSubmit={handleSubmit} className="wedding-details-form">
        <div className="form-group">
          <label>Partner 1 Name:</label>
          <input name="partner1" value={formData.partner1} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Partner 2 Name:</label>
          <input name="partner2" value={formData.partner2} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Wedding Date:</label>
          <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Budget (INR):</label>
          <input type="number" name="budget" min="0" value={formData.budget} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Number of Guests:</label>
          <input type="number" name="guestCount" min="1" value={formData.guestCount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Preferred Venue Type:</label>
          <select name="venue" value={formData.venue} onChange={handleChange} required>
            <option value="">Select venue type</option>
            <option value="Beach">Beach</option>
            <option value="Garden">Garden</option>
            <option value="Ballroom">Ballroom</option>
            <option value="Barn">Barn</option>
            <option value="Hotel">Hotel</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Wedding Theme:</label>
          <input name="theme" value={formData.theme} onChange={handleChange} placeholder="e.g., Indian, Rustic, Elegant" required />
        </div>

        <div className="form-group">
          <label>Additional Notes:</label>
          <textarea name="notes" rows="4" value={formData.notes} onChange={handleChange} />
        </div>

        <button type="submit" className="primary-btn submit-btn">Save Details & Continue</button>
      </form>
    </div>
  );
}

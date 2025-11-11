// backend/models/weddingdetails.model.js
import mongoose from "mongoose";

const weddingDetailsSchema = new mongoose.Schema(
  {
    coupleId: { type: String, unique: true, required: true }, // Unique identifier for the couple
    partner1: { type: String, required: true },
    partner2: { type: String, required: true },

    // store as YYYY-MM-DD to match <input type="date" />
    weddingDate: { type: String, required: true },

    budget: { type: Number, default: 0 },       // in USD (keep consistent across app)
    guestCount: { type: Number, default: 0 },

    // normalize a bit
    venue: { type: String, enum: ["Beach", "Garden", "Ballroom", "Barn", "Hotel", "Other"], default: "Other" },
    theme: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("WeddingDetails", weddingDetailsSchema);

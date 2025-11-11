// backend/controllers/weddingDetails.controller.js
import mongoose from "mongoose";
import WeddingDetails from "../models/weddingdetails.model.js";

/* ------------------------- HELPER: Build Indian Plan ------------------------ */
function buildIndianPlan(details) {
  const {
    budget = 0,
    guestCount = 0,
    venue = "Hotel",
    theme = "Indian",
    weddingDate,
  } = details;

  // Budget split (typical North-Indian style)
  const pct = {
    venueAndCatering: 0.40,
    decor: 0.15,
    photography: 0.08,
    outfitsJewelry: 0.15,
    entertainment: 0.06,
    invitationsGifts: 0.04,
    ritualsPandit: 0.03,
    logistics: 0.05,
    miscBuffer: 0.04,
  };

  const round = (n) => Math.round(n);

  const breakdown = {
    venueAndCatering: round(budget * pct.venueAndCatering),
    decor: round(budget * pct.decor),
    photography: round(budget * pct.photography),
    outfitsJewelry: round(budget * pct.outfitsJewelry),
    entertainment: round(budget * pct.entertainment),
    invitationsGifts: round(budget * pct.invitationsGifts),
    ritualsPandit: round(budget * pct.ritualsPandit),
    logistics: round(budget * pct.logistics),
    miscBuffer: round(budget * pct.miscBuffer),
  };

  const perHeadFood = guestCount ? round((breakdown.venueAndCatering * 0.75) / guestCount) : 0; // assume 75% of venue+catering goes to food

  // Day-wise schedule (D-2, D-1, D-0 format is authentic and flexible)
  const schedule = [
    {
      day: "D-2 (Haldi + Mehendi)",
      events: [
        { time: "10:00–12:00", title: "Haldi", notes: "Turmeric ceremony with close family. Dress code: yellow." },
        { time: "16:00–20:00", title: "Mehendi", notes: "Henna artists, folk playlist, simple snacks." },
      ],
      suggestedVendors: ["Home/banquet lawn", "Mehendi artists x3–4", "Dhol player (1–2)"],
      food: "Chaat counter, tea/coffee, mini mains",
    },
    {
      day: "D-1 (Sangeet & Cocktail)",
      events: [
        { time: "19:00–23:00", title: "Sangeet", notes: "Family performances + DJ. Rehearsal earlier in day." },
      ],
      suggestedVendors: ["Banquet/ballroom", "DJ + basic lighting rig", "MC for flow"],
      food: "Starters (veg/non-veg), mains, desserts; live counter if budget allows",
    },
    {
      day: "D-0 (Wedding & Reception)",
      events: [
        { time: "08:00–10:00", title: "Baraat", notes: "Band + dhol; 45–60min procession" },
        { time: "10:30–12:00", title: "Pheras/Vivah", notes: "Mandap + pandit-ji, sacred fire" },
        { time: "19:00–23:00", title: "Reception", notes: "Grand entry + photo-ops + open buffet" },
      ],
      suggestedVendors: ["Band/Dhol", "Pandit-ji", "Photographer + 2nd shooter + 1 videographer"],
      food: "Wider menu + dessert bar; stage backdrop for greetings",
    },
  ];

  return {
    currency: "USD",
    totals: {
      budget,
      guestCount,
      perHeadFoodEstimate: perHeadFood,
      venue,
      theme,
      weddingDate,
    },
    breakdown,
    schedule,
    notes: [
      "If guest count > 250, split catering over multiple live counters to avoid queues.",
      "For beach/garden venues, keep 10% of decor for weather contingency (tents/misting/heaters).",
      "Book pandit-ji and band at least 6–8 weeks prior (peak dates get sold out).",
    ],
  };
}

/* ------------------------------- CONTROLLERS ------------------------------- */

// GET /api/weddingdetails  (protected)
export const getWeddingDetails = async (req, res) => {
  try {
    const coupleId = req.session.coupleId;
    
    if (!coupleId) {
      return res.json({});
    }

    const details = await WeddingDetails.findOne({ coupleId });
    return res.json(details || {});
  } catch (err) {
    console.error("Error fetching wedding details:", err);
    return res.status(500).json({ error: "Failed to fetch wedding details" });
  }
};

// POST /api/weddingdetails  (protected)
export const saveWeddingDetails = async (req, res) => {
  try {
    const {
      partner1,
      partner2,
      weddingDate,
      budget,
      guestCount,
      venue,
      theme,
      notes,
    } = req.body;

    // Generate coupleId from partner names
    const coupleId = `${partner1.toLowerCase().replace(/\s+/g, '')}_${partner2.toLowerCase().replace(/\s+/g, '')}`;

    const doc = await WeddingDetails.findOneAndUpdate(
      { coupleId },
      {
        coupleId,
        partner1,
        partner2,
        weddingDate,                       // keep YYYY-MM-DD string
        budget: Number(budget) || 0,
        guestCount: Number(guestCount) || 0,
        venue,
        theme,
        notes,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Store coupleId in session for future requests
    req.session.coupleId = coupleId;

    const plan = buildIndianPlan(doc.toObject());

    return res.json({
      message: "Wedding details saved successfully!",
      details: doc,
      plan,                               // <-- send the generated plan back
    });
  } catch (err) {
    console.error("Error saving wedding details:", err);
    return res.status(500).json({ error: "Failed to save wedding details" });
  }
};

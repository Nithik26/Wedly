import Itinerary from '../models/itinerary.model.js';

// Get itinerary for the logged-in user
export const getItinerary = async (req, res) => {
  try {
    const userId = req.user._id;
    let itinerary = await Itinerary.findOne({ userId });
    if (!itinerary) {
      // If no itinerary exists, create an empty one
      const newItinerary = new Itinerary({
        userId,
        events: [],
        weddingDate: new Date(),
      });
      await newItinerary.save();
      return res.json(newItinerary);
    }
    res.json(itinerary);
  } catch (error) {
    console.error('Itinerary fetch error:', error);
    res.status(500).json({ message: 'Error fetching itinerary', error: error.message });
  }
};

// Create or update itinerary
export const updateItinerary = async (req, res) => {
  try {
    const { events, weddingDate } = req.body;
    
    // Validate input
    if (!Array.isArray(events)) {
      return res.status(400).json({ error: "Events must be an array" });
    }

    if (!weddingDate || isNaN(new Date(weddingDate).getTime())) {
      return res.status(400).json({ error: "Invalid wedding date" });
    }

    // Validate each event
    for (const event of events) {
      if (!event.title || !event.time) {
        return res.status(400).json({ error: "Each event must have a title and time" });
      }
    }
    
    const itinerary = await Itinerary.findOneAndUpdate(
      { userId: req.user._id },
      { 
        events,
        weddingDate,
        lastUpdated: Date.now()
      },
      { new: true, upsert: true }
    );

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Error updating itinerary', error: error.message });
  }
};

// Delete an event from itinerary
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const itinerary = await Itinerary.findOne({ userId: req.user._id });
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    itinerary.events = itinerary.events.filter(event => event._id.toString() !== eventId);
    await itinerary.save();
    
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};
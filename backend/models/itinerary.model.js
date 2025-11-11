import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  events: [{
    time: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    location: {
      type: String
    },
    duration: {
      type: String
    }
  }],
  weddingDate: {
    type: Date,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Itinerary', itinerarySchema);
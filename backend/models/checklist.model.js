import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  items: [
    {
      text: { type: String, required: true },
      completed: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    },
  ],
});

export default mongoose.model("Checklist", checklistSchema);

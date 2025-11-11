import Checklist from "../models/checklist.model.js";

// ✅ Get checklist for logged-in user
export const getChecklist = async (req, res) => {
  try {
    const userId = req.user._id;
    let checklist = await Checklist.findOne({ userId });

    if (!checklist) {
      checklist = await Checklist.create({ userId, items: [] });
    }

    res.json({ items: checklist.items });
  } catch (err) {
    console.error("Error fetching checklist:", err);
    res.status(500).json({ error: "Failed to load checklist" });
  }
};

// ✅ Add checklist item
export const addChecklistItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: "Invalid text provided" });
    }

    const checklist = await Checklist.findOneAndUpdate(
      { userId },
      { $push: { items: { text } } },
      { new: true, upsert: true }
    );

    res.json({ items: checklist.items });
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ error: "Failed to add item" });
  }
};

// ✅ Toggle item completion
export const toggleChecklistItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const checklist = await Checklist.findOne({ userId });

    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    const item = checklist.items.id(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.completed = !item.completed;
    await checklist.save();

    res.json({ items: checklist.items });
  } catch (err) {
    console.error("Error toggling item:", err);
    res.status(500).json({ error: "Failed to toggle item" });
  }
};

// ✅ Delete checklist item
export const deleteChecklistItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const checklist = await Checklist.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: id } } },
      { new: true }
    );

    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    res.json({ items: checklist.items });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
};

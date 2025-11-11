// In backend/controllers/contact.controller.js
import Contact from '../models/contact.model.js';

// Handles saving the contact form submission to MongoDB
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // ✅ Create and save the contact message
    const newSubmission = new Contact({
      name,
      email,
      message,
    });

    await newSubmission.save();
    console.log('📩 New contact saved:', newSubmission);

    // ✅ Respond to frontend
    res.status(201).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('❌ Error in contact controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

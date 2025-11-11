// In backend/models/contact.model.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

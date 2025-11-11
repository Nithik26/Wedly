// In backend/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can have the same email
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Enforce a minimum password length
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps
    timestamps: true, 
  }
);

const User = mongoose.model('User', userSchema);

// This is the line that was missing
export default User;
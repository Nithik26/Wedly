// In backend/controllers/auth.controller.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- SIGNUP CONTROLLER ---
// This 'export' keyword is what was missing
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully! You can now log in.' });

  } catch (error) {
    console.error('Error in signup controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// --- LOGIN CONTROLLER ---
// This 'export' keyword was also missing
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // If all is correct, create a JSON Web Token (JWT)
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Send the token back to the frontend
    res.status(200).json({
      token,
      message: 'Logged in successfully.',
    });

  } catch (error) {
    console.error('Error in login controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
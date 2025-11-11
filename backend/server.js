import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import connectToDB from "./config/db.js";

// Import routes
import contactRoutes from "./routes/contact.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";
import weddingDetailsRoutes from "./routes/weddingdetails.routes.js";
import checklistRoutes from "./routes/checklist.routes.js";
import itineraryRoutes from "./routes/itinerary.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Session middleware
app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    user: req.user
  });

  // Send detailed error in development
  const error = {
    message: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? {
      error: err.message,
      path: req.path,
      method: req.method
    } : undefined
  };

  res.status(500).json(error);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/weddingdetails", weddingDetailsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/checklist", checklistRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  connectToDB();
});

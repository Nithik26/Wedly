import jwt from "jsonwebtoken";

// ✅ Development-friendly middleware that skips token validation
const protectRoute = (req, res, next) => {
  try {
    // For development, set a default user ID
    req.user = { _id: "655e786d1e7b51ff95d87654" }; // Default development user ID

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;

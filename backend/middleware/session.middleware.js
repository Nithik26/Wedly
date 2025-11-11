// Session-based authentication middleware
export const requireSession = (req, res, next) => {
  // Check if coupleId exists in session
  if (!req.session.coupleId) {
    // Generate a temporary session ID until couple sets up their wedding details
    req.session.coupleId = req.sessionID;
  }
  
  req.user = { _id: req.session.coupleId };
  next();
};

// Middleware to set couple ID from wedding details
export const setCoupleId = (coupleId) => {
  return (req, res, next) => {
    req.session.coupleId = coupleId;
    next();
  };
};

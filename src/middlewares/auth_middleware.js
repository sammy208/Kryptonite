const jwt = require('jsonwebtoken'); // Import JWT library
const config = require('../config'); // Import configuration

// Middleware to authenticate JWT tokens
const authenticateJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization; // Get the token from the Authorization header
    if (!token) {
      return res.status(401).send('Access Denied'); // Respond with 401 if no token is provided
    }
    const decoded = jwt.verify(token, config.jwtSecret); // Verify the token
    req.kryptonian = decoded; // Attach the decoded token to the request object
    next(); // Call the next middleware function
  } catch (error) {
    res.status(500).send('Invalid Token'); // Respond with 400 if token is invalid
  }
};

module.exports = authenticateJWT;
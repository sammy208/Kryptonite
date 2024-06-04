const Kryptonian = require('../models/UserModel.js'); // Import Kryptonian model

// Middleware to validate API keys
const validateApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Get the API key from the request headers
    if (!apiKey) {
        return res.status(400).json({ error: 'API key is required' }); // Respond with 400 if no API key is provided
    }

    const kryptonian = await Kryptonian.findOne({ apiKey }); // Find the Kryptonian by API key
    if (!kryptonian) {
        return res.status(404).json({ error: 'Invalid API key' }); // Respond with 401 if API key is invalid
    }

    req.kryptonian = kryptonian; // Attach the Kryptonian to the request object
    next(); // Call the next middleware function
};

module.exports = validateApiKey;
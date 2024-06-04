const express = require('express'); // Import Express
const authController = require('../controller/auth_controller.js'); // Import authentication controller
const authenticateJWT = require('../middleware/authMiddleware'); // Import JWT authentication middleware
const router = express.Router(); // Create a new router

router.post('/register', authController.register); // Register route
router.post('/generate-otp', authController.generateOTP); // Generate OTP route
router.post('/verify-otp', authController.verifyOTP); // Verify OTP route
router.post('/invalidate-api-key', authenticateJWT, authController.invalidateApiKey); // Invalidate API key route

module.exports = router;
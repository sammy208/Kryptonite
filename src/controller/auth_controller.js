// /register 
// /generate_otp
// /verify_otp
const User = require('../models/UserModel.js');
const uuid = require('uuid');
const { generate_token } = require('../utils/tools.js');
const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const CODES = {
  serverError: "Server Error Occurred",
  ONOF: "Otp Not found",
  UNOF: "User not found ",
  FOBI: "Forbidden request "
};


const register = async function(req, res) {
  try {
    const { email, password } = req.body;
    //^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$
    if (!email.test(regex)) {
      return res.status(403).json({ message: "Email pattern not accepted" })
    }

    const _user = await User.findOne({ email });
    if (_user) {
      return res.status(404).json({ message: CODES.UNOF });
    }

    const __user = new User({ email, password });
    __user.apiKey = uuid.v4();
    const saved = await __user.save();

    if (!saved) {
      return res.status(500).json({ message: CODES.serverError });
    }

    let data = generate_token(__user._id);
    if (!data) {
      return res.status(500).json({ message: "otp not generated" });
    }

    return res.status(201).json({ token: data.token, api_key: data.apiKey });
  } catch (e) {
    return res.status(500).json({ message: CODES.serverError });
  }
}

const user_login = async function(req, res) {
  try {
    const { email, password } = req.body;
    //^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$

    if (!email.test(regex)) {
      return res.status(403).json({ message: "Email pattern not accepted" })
    }
    const _user = await User.findOne({ email });
    if (!_user) {
      return res.status(404).json({ message: CODES.UNOF });
    }
    req.session.email = email;
    return res.redirect(301, '/generate-otp');
  } catch (e) {
    return res.status(500).json({ message: CODES.serverError })
  }
}


// Controller for generating OTP
const generateOTP = async (req, res) => {
  try {
    const email = req.session.email; // Extract email from request body
    let check = await authService.generateOTP(email); // Generate OTP for the email
    if (!check) {
      console.log('Error generating otp');
      return;
    }
    res.status(200).json({ message: 'OTP sent to email' }); // Respond with success message
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with error message
  }
};

// Controller for verifying OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body; // Extract email and OTP from request body
    const token = await authService.verifyOTP(email, otp); // Verify OTP
    res.status(200).json({ token }); // Respond with JWT token
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error message
  }
};

// Controller for invalidating API key
const invalidateApiKey = async (req, res) => {
  try {
    const { apiKey } = req.body; // Extract API key from request body
    await authService.invalidateApiKey(apiKey); // Invalidate the API key
    res.status(200).json({ message: 'API key invalidated' }); // Respond with success message
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error message
  }
};
module.exports = {
  register,
  generateOTP,
  verifyOTP,
  invalidateApiKey
}
require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/kryptonite",
  jwtSecret: process.env.JWT_SECRET,
  elasticEmailApiKey: process.env.ELASTIC_EMAIL_API_KEY,
  // redisHost: process.env.REDIS_HOST || "localhost", 
  // redisPort: process.env.REDIS_PORT || 6379,
  otpExpiry: process.env.OTP_EXPIRY || 300
};
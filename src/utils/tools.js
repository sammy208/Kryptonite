const crypto = require('crypto');
const config = require('../config.js');
const jwt = require('jsonwebtoken');




const generateSalt = (saltLength = 16) => {
  return crypto.randomBytes(saltLength).toString('hex');
};



const hashPassword = function(password, iterations = 10000, keylen = 512, digest = 'sha512') {
  const salt = generateSalt();
  return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
};

const generate_token = function(id) {
  try {
    const token = jwt.sign({ id}, config.jwtSecret, { expiresIn: '1h' });
    return { token, apiKey };
  } catch (e) {
    throw e
  }
}
module.exports = {
  generate_token,
  hashPassword
};
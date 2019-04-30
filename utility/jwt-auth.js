const jwt = require('jsonwebtoken');

function createToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET);
}

function verifyToken(token) {
  let verified;
  
  // Verify token synchronously
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    verified = true;
  } catch (err) {
    console.log(err); // TODO: Logging?
    verified = false;
  }

  return verified;
}

// ...

module.exports = {
  createToken,
  verifyToken,
};
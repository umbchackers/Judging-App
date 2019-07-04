const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

/** Authenticate each request with browser's JWT */
router.use((req, res, next) => {
  const token = req.cookies.access_token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    res.status(401)
    .send({ auth: false, user: null });
  }
});

module.exports = router;
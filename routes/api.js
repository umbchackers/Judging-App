const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  const token = req.cookies.access_token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).send({ auth: false, user: null });
  }
});

// REFACTOR - ADD TO INDEX ROUTE INSTEAD OF API
router.get('/user/me', (req, res) => {
  res.status(200).json({ auth: true, user: req.decoded});
});

module.exports = router;
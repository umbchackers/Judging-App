const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

const spro = require('../utility/spreadsheet-ops');

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

router.get('/assignments', async (req, res) => {
  const user = req.query.user;
  let data;
  try {
    data = await spro.getAssignmentsFor(user);
  } catch (err) {
    data = err;
  }
  res.status(typeof data === 'Object' ? 200 : 400)
    .send({ data });
});

module.exports = router;
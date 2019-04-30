const spro = require('../utility/spreadsheet-ops.js'); 
const auth = require('../utility/jwt-auth.js');

const express = require('express');
const router = express.Router();

router.all('/', (req, res) => {
  const token = req.cookies.access_token;

  if (!auth.verifyToken(token)) {
    res.status(401).send();
  } else {
    next();
  }
});

// Used by client to authenticate admins and judges
router.post('/authorize', async (req, res) => {
  const { username, password } = req.body;  // Extract arguments from request
  let status = 401;                         // Default unauthorized status

  if (await spro.isJudge(username, password)) {
    res.cookie('access_token', auth.createToken(), {httpOnly: true});
    status = 200;
  }

  res.status(status).send();
});

module.exports = router;
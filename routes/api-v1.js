const spro = require('../utility/spreadsheet-ops.js'); 

const express = require('express');
const router = express.Router();

// Used by client to authenticate admins and judges
router.post('/auth', async (req, res) => {

  const authed = await spro.isJudge(req.body.username, req.body.password);
  const status = authed ? 200 : 401;
  const body = authed ? 'pass\n' : 'fail\n';
  // Return access token, refresh token

  res.status(status).send(body);
});

module.exports = router;
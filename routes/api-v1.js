const spro = require('../utility/spreadsheet-ops.js'); 

/* TEST */
spro.isJudge('test@gmail.com');

const express = require('express');
const router = express.Router();

// Quick little endpoint to test if API is operational
router.get('/ping', (req, res) => {
  res.send({data: 'pong!'});
});

// Used by client to authenticate admins and judges
router.post('/login', (req, res) => {
  let status = 401;
  let body = 'fail'; 

  /* Some pseudo
  status = spro.isJudge(req.body) ? 200 : 401; // Probably need async
  body = status == 200 ? 'pass' : 'fail';
  */

  res.status(status).send(body);
});

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const spro = require('./spreadsheet-ops.js');

const app = express();
const port = process.env.PORT || 5000;

// Load environment variables only when in development mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

// Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// HTTP listen on given port
app.listen(port, () => console.log(`Listening on port ${port}!`));

// Quick little endpoint to test if API is operational
app.get('/api/ping', (req, res) => {
  res.send({data: 'pong!'});
});

// Used by client to authenticate admins and judges
app.post('/api/login', (req, res) => {
  let status = 401;
  let body = 'fail'; 

  /* Some pseudo
  status = spro.authUser(req.body) ? 200 : 401; // Probably need async
  body = status == 200 ? 'pass' : 'fail';
  */

  res.status(status).send(body);
});
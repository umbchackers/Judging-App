const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Load environment variables in development mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

// Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}!`));

// Quick little endpoint to test if API is operational
app.get('/api/ping', (req, res) => {
  res.send({data: 'pong!'});
});

// Used by client to authenticate godmode users
app.post('/api/login', (req, res) => {
  let status = req.body.password === process.env.GODMODE_PASSWORD ? 200 : 401;
  res.status(status).send();
});
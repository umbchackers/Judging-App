require('dotenv').config(); // Populate process.env with environment vars

const express = require('express');
const bodyParser = require('body-parser');
const apiv1 = require('./routes/api-v1.js');

const app = express();
const port = process.env.PORT || 5000;

// JSON Parsing middleware for POST requests
app.use(bodyParser.json());                       
app.use(bodyParser.urlencoded({extended: true}));

// Quick little endpoint to test if API is operational
app.get('/ping', (req, res) => {
  res.send({data: 'pong!'});
});

// Handle different API versions
app.use('/api/v1', apiv1);

app.listen(port, () => console.log(`Listening on port ${port}!`));
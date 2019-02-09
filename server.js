const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}!`));

app.get('/api/ping', (req, res) => {
  res.send({express: 'pong!'});
});

app.post('/api/auth', (req, res) => {
  console.log(req.body);
});
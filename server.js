require('dotenv').config(); // Populate process.env with environment vars

const jwt = require('jsonwebtoken');
const spro = require('./utility/spreadsheet-ops.js'); 

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const api = require('./routes/api');

const app = express();
const port = process.env.PORT || 5000;

// JSON Parsing middleware for POST requests
app.use(cookieParser());
app.use(bodyParser.json());                       
app.use(bodyParser.urlencoded({extended: true}));

/** Return user object associated with signed JWT */
app.get('/user/me', (req, res) => {
  const token = req.cookies.access_token;
  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET); 
  } catch (err) {
    user = null;
  }

  res.status(user !== null ? 200 : 401)
  .send({ auth: user !== null, user });
});

/** Sign a JWT and send it as a cookie to the browser */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const auth = await spro.isJudge(username, password);

  if (auth) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.cookie('access_token', token, {httpOnly: true}); 
  }

  res.status(auth ? 200 : 401)
  .send({ auth });
});

/** Remove the access_token from the browser's cookies */
app.post('/logout', async (req, res) => {
  // Send delete command to client
  // ...
});

app.use('/api', api);

app.listen(port, () => console.log(`Listening on port ${port}!`));
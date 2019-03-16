const { google } = require('googleapis');
const key = require('./client_secret.json');

// Sheets API authorization WITH SERVICE ACCOUNT
const jwtClient = new google.auth.JWT(
  key.client_email, 
  null, 
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize((err, tokens) => {
  const authMessage = err || 'Successfully connected';
  console.log(authMessage);
});

// Spreadsheet Operations
function isJudge(email) {

}

module.exports = {
  isJudge,
};
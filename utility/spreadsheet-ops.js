const { google } = require('googleapis');
const key = require('./client_secret.json');

// Sheets API authorization WITH SERVICE ACCOUNT
let jwtClient = new google.auth.JWT(
  key.client_email, 
  null, 
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize((err, tokens) => {
  const authMessage = err || 'Successfully connected';
  console.log(authMessage);
});

let sheets = google.sheets('v4');

// Spreadsheet Operations
function isJudge(email) {
  sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: '',
    range: 'judges:A',
  }), (err, res) => {
    /*
    for each email in response
      if email is target email 
        return true!
    */
  }

  return false;
}

module.exports = {
  isJudge,
};
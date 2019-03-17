const { google } = require('googleapis');
const key = require('./client_secret.json');

let jwtClient;
let sheets = google.sheets('v4');

/**
 * Authorize Google Sheets usage
 */
function authorize() {

  jwtClient = new google.auth.JWT(
    key.client_email, 
    null, 
    key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  return new Promise((resolve, reject) => {
    jwtClient.authorize((error, token) => {
      resolve(error === null);
    });
  });  
}

/**
 * Validate email existance on judge sheet
 * @param {string} email - email to be validated
 */
async function isJudge(email) {

  let authed = await authorize();
  if (!authed) { throw 'Sheets not authorized'; }

  sheets.spreadsheets.values.get({
    auth: jwtClient,
    spreadsheetId: process.env.SPR_ID,
    range: 'judges!A'
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      let emails = response.data.values;
      for (let i = 0; i < emails.length; i++) {
        if (emails[i].includes(email)) {
          return true;
        }
      }
      return false;
    }
  });
}

module.exports = {
  isJudge,
};
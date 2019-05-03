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
 * Validate username existance on judge sheet
 * @param {string} username - username to be validated
 * @param {string} password - password to be validated
 */
async function isJudge(username, password) {

  if (password != process.env.JUDGE_PASS) {
    return false;
  }

  let authed = await authorize();
  if (!authed) { throw 'Sheets not authorized'; }

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: process.env.SPR_ID,
      range: 'judges!A:A'
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        let usernames = response.data.values;
        for (let i = 0; i < usernames.length; i++) {
          if (usernames[i].includes(username)) {
            resolve(true);
          }
        }
        resolve(false);
      }
    });
  });
}

module.exports = {
  isJudge,
};
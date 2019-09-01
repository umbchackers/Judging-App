const { google } = require('googleapis');
const key = require('./client_secret.json');

let jwtClient;
const sheets = google.sheets('v4');

const JUDGES = 'judges!A:A';
const PROJECTS = 'raw-devpost!A2:A';
const ASSIGNMENTS = 'assignments';
const SCORECARD = 'scorecard!A:A';

/** Authorize Google Sheets usage */
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

/** Helper function to retrieve a range of values */
async function getValues(range) {
  return new Promise(async (resolve, reject) => {
    const authed = await authorize();
    if (!authed) reject('Sheets not authorized');

    sheets.spreadsheets.values.get({
      auth: jwtClient,
      spreadsheetId: process.env.SPR_ID,
      range
    }, (error, { data }) => {
      if (error) {
        reject(error);
      } else {  
        resolve(data.values.map(value => value[0]));
      }
    });
  });
}

/** Helper function to update a range of values */
async function updateValues(range, values) {
  return new Promise(async (resolve, reject) => {
    const authed = await authorize();
    if (!authed) reject('Sheets not authorized');

    sheets.spreadsheets.values.update({
      auth: jwtClient,
      spreadsheetId: process.env.SPR_ID,
      valueInputOption: 'RAW',
      range,
      resource: {
        values,
        majorDimension: 'COLUMNS',
      }
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/** Helper function to append a range of values */
async function appendValues(range, values) {
  return new Promise(async (resolve, reject) => {
    const authed = await authorize();
    if (!authed) reject('Sheets not authorized');

    sheets.spreadsheets.values.append({
      auth: jwtClient,
      spreadsheetId: process.env.SPR_ID,
      valueInputOption: 'RAW',
      range,
      resource: {
        values,
        majorDimension: 'COLUMNS',
      }
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

async function isJudge(username, password) {
  if (password !== process.env.JUDGE_PASS) {
    return false
  }

  return getValues(JUDGES_COL).then(values => {
    values.forEach(value => {
      if (value === username) return true;
    });
  });
}

function getJudgeList() { 
  return getValues(JUDGES); 
}

function getProjectList() { 
  return getValues(PROJECTS);
}

function updateAssignmentList(index, assignment) { 
  const { judge, projects } = assignment;
  const range = `${ASSIGNMENTS}!A${index}:B${index + projects.length - 1}`;
  return updateValues(range, [[judge], projects]);
}

function generateScorecard(projects) {
  return updateValues(SCORECARD, [projects]);
}

module.exports = {
  getJudgeList,
  getProjectList,
  updateAssignmentList,
  generateScorecard,
  isJudge,
};
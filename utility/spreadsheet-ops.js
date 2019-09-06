const { google } = require('googleapis');
const key = require('./client_secret.json');

let jwtClient;
const sheets = google.sheets('v4');

const JUDGES = 'judges!B2:B';
const PROJECTS = 'raw-devpost!A2:B';
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
        resolve(data.values.map(value => value.join(' #')));
      }
    });
  });
}

/** Helper function to update a range of values */
async function updateValues(range, values, options) {
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
        ...options,
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
async function appendValues(range, values, options) {
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
        majorDimension: 'COLUMN',
        ...options,
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

  return getValues(JUDGES).then(values => {
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
  const range = `${ASSIGNMENTS}!A${index}:B${index + projects.length}`;
  return updateValues(range, [[judge], ['', ...projects]]);
}

function generateScorecard(projects) {
  return updateValues(SCORECARD, [projects]);
}

async function getAssignmentsFor(user) {
  const users = await getValues(`${ASSIGNMENTS}!A:A`);
  let start, stop;
  for (let i = 0; i < users.length; i++) {
    if (users[i] === user) {
      start = i + 2;
      break;
    } else if (i === users.length - 1) {
      throw `Assignments for user ${user} not found.`;
    }
  }
  stop = start - 1 === users.length ? '' : start;
  while (stop !== '' && users[stop] === '') stop++;
  return getValues(`${ASSIGNMENTS}!B${start}:B${stop}`);
}

module.exports = {
  getJudgeList,
  getProjectList,
  updateAssignmentList,
  generateScorecard,
  getAssignmentsFor,
  isJudge,
};
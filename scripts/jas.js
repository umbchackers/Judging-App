require('dotenv').config(); // Populate process.env with environment vars

const spro = require('../utility/spreadsheet-ops');

const args = process.argv.slice(2);

function assignProjectsToJudges(projects, judges) {
  const visits = parseInt(args[0]);
  const groups = judges.map(judge => ({ judge, projects: [] }));
  let judge = 0;
  for (let visit = 0; visit < visits; visit++) {
    projects.forEach(project => {
      while (groups[judge].projects.includes(project)) judge++;
      groups[judge].projects.push(project);
      judge = (judge + 1) % judges.length;
    });
  }
  return groups;
}

async function uploadGroupsToSheets(groups) {

}

async function generateScorecards() {

}

async function main() {
  const projects = await spro.getProjectList();
  const judges = await spro.getJudgeList();
  console.info('Assigning projects to judges...');
  const groups = assignProjectsToJudges(projects, judges);
  console.info('Uploading assignments to Google Sheets...');
  const upload = uploadGroupsToSheets(groups);
  console.info('Generating scorecards for each project...');
  const generate = generateScorecards();
  Promise.all([upload, generate]).then(values => {
    console.info('\x1b[32m%s\x1b[0m', 'Done!');
  });
}

main();
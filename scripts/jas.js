require('dotenv').config(); // Populate process.env with environment vars

const spro = require('../utility/spreadsheet-ops');

const args = process.argv.slice(2);

async function assignProjectsToJudges() {
  const visits = parseInt(args[0]);
  const projects = await spro.getProjectList();
  const judges = await spro.getJudgeList();
  const groups = judges.map(judge => ({ judge, projects: [] }));
  let judge = 0;
  for (let visit = 0; visit < visits; visit++) {
    projects.forEach(project => {
      const projs = groups[judge].projects;
      while (projs.includes(project)) judge++;
      groups[judge].projects.push(project);
      judge = (judge + 1) % judges.length;
    });
  }
  return groups;
}

/**
 * 1. Get list of project titles from raw-devpost
 * 2. Get list of judges from judges
 * 3. Divide up using args
 */
async function main() {
  const groups = await assignProjectsToJudges();
}

main();
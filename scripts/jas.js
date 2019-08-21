require('dotenv').config(); // Populate process.env with environment vars

const spro = require('../utility/spreadsheet-ops');

/**
 * 1. Get list of project titles from raw-devpost
 * 2. Get list of judges from judges
 * 3. Divide up using args
 */
function main() {
  const args = process.argv.slice(2);
  const visits = parseInt(args[0]);
  let pPromise = spro.getProjectList();
  let jPromise = spro.getJudgeList();
  Promise.all([pPromise, jPromise]).then(([projects, judges]) => {
    judges = judges.map(judge => ({ judge, projects: [] }));
    let judge = 0;
    for (let visit = 0; visit < visits; visit++) {
      projects.forEach(project => {
        const proj = judges[judge].projects;
        while (proj.includes(project)) judge++;
        judges[judge].projects.push(project);
        judge = (judge + 1) % judges.length;
      });
    }
  });
}

main();
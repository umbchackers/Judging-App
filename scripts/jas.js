require('dotenv').config(); // Populate process.env with environment vars

const spro = require('../utility/spreadsheet-ops');

/**
 * 1. Get list of project titles from raw-devpost
 * 2. Get list of judges from judges
 * 3. Divide up using args
 */
function main() {
  const args = process.argv.slice(2);
  let projects = spro.getProjectList();
  let judges = spro.getJudgeList();
  Promise.all([projects, judges]).then(values => {
    [projects, judges] = values
  });
}

main();
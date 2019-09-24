const getAssignments = async () => {
  const projects = [];
  const n = 15;
  for (let i = 0; i < n; i++) projects.push('Project ' + i);
  return projects;
};

const getUserInfo = async () => ({ user: { username: 'judgedreadd' } });

const postLogin = async (username, login) => ({ auth: true });

// Unsure exactly what is returned from this POST. Will update when I get home today.
const postRankings = async (rankings) => ({ });

export  {
  getAssignments,
  getUserInfo,
  postLogin,
  postRankings,
};
const getAssignments = async () => {
  const projects = [];
  const n = 15;
  for (let i = 0; i < n; i++) projects.push('Project ' + i);
  return projects;
};

const getUserInfo = async () => ({ });

const postLogin = async (username, login) => ({ auth: true });

const postRankings = async (rankings) => ({ });

export  {
  getAssignments,
  getUserInfo,
  postLogin,
  postRankings,
};
const getAssignments = async () => {
  const projects = [];
  const n = 15;
  for (let i = 0; i < n; i++) projects.push('Project ' + i);
  return projects;
};

const getUserInfo = async () => ({  });

const postLogin = async (username, login) => true;

const postRankings = async (rankings) => true;

export  {
  getAssignments,
  getUserInfo,
  postLogin,
  postRankings,
};
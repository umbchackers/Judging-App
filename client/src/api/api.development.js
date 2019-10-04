const getAssignments = async () => {
  const projects = [];
  const n = 15;
  for (let i = 0; i < n; i++) projects.push(`Ayyo test project name${i} #${i}`);
  return projects;
};

const getUserInfo = async () => ({ });

const postUserInfo = async () => ({  });

const postLogin = async (username, login) => ({ username });

const postRankings = async (rankings) => ({ });

export  {
  getAssignments,
  getUserInfo,
  postUserInfo,
  postLogin,
  postRankings,
};
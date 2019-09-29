let timeout = 0;

async function getRequest(url) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    Promise.resolve(fetch(url).then(res => res.json()));
  }, 5000);
}

async function postRequest(url, resource) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resource),
    }).then(res => res.json());
  }, 5000);
}

const getAssignments = () => getRequest('/api/assignments');
const getUserInfo = () => getRequest('/user/me');
const postRankings= rankings => postRequest('/api/rankings', { rankings });
const postLogin = (username, password) => postRequest('/login', { username, password });

export {
  getAssignments,
  getUserInfo,
  postRankings,
  postLogin,
};
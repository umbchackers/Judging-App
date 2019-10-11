function getRequest(url) {
  return fetch(url).then(res => res.json());
}

function postRequest(url, resource) {
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource)
  }).then(res => res.json());
}

const getAssignments = () => getRequest('/api/assignments');
const getUserInfo = () => getRequest('/user/me');
const postUserInfo = info => postRequest('/user/me', info);
const postRankings= rankings => postRequest('/api/rankings', { rankings });
const postLogin = (username, password) => postRequest('/login', { username, password });

export {
  getAssignments,
  getUserInfo,
  postUserInfo,
  postRankings,
  postLogin,
};
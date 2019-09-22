function getRequest(url) {
  return fetch(url).then(res => {
    if (res.ok) res.json()
    else throw 
  }).catch()
}

function postRequest(url, resource) {
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource)
  }).then(res => {
    if (res.ok) res.json()
    else throw 
  });
}

const getAssignments = getRequest('/api/assignments');
const postLogin = (username, password) => postRequest('/login', { username, password });

export {
  getAssignments,
  postLogin,
};
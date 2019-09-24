let api;

if (process.env.NODE_ENV === 'production') {
  api = require('./api.production.js');
} else if (process.env.NODE_ENV === 'development') {
  api = require('./api.development.js');
}

export default api;
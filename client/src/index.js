import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// REFACTOR - MOVE INSIDE APP COMPONENT UNDER COMPONENTDIDMOUNT
const getInitialAuthState = async () => {
  const response = await fetch('/api/user/me');
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

// REFACTOR - REMOVE AND TURN TO NORMAL
const render = async () => {
  const isAuthed = await getInitialAuthState();
  ReactDOM.render(<App isAuthed={isAuthed} />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

render();
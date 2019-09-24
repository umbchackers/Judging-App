import React, { Component } from 'react';
import './App.css';

import api from 'api/api';

import ReactLoading from 'react-loading';

import Home from './Home/Home.js';
import Login from './Login/Login.js';

function Loading(props) {
  return (
    <div className="loading">
      <ReactLoading
        type="bubbles"
        color="#aaa"
        delay={500}
      />
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isAuthed: false,
    };
  }

  componentDidMount() {
    api.getUserInfo().then(data => {
      this.setState({ isLoading: false, isAuthed: !!data.user.username });
    });
  }

  handleAuth = (username, password) => {
    api.postLogin(username, password).then(data => {
      this.setState({ isAuthed: data.auth });
    });
  }

  render() {
    const { isLoading, isAuthed } = this.state;

    if (isLoading) return Loading();

    return (
      <div className="app">
        {isAuthed ? (
          <Home />
        ) : (
          <Login handleAuth={this.handleAuth} />
        )}
      </div>
    );
  }
}

export default App; 
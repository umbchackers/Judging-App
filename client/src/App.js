import React, { Component } from 'react';
import './App.css';

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
    fetch('/user/me')
    .then(res => {
      this.setState({ isLoading: false, isAuthed: res.ok });
    });
  }

  handleAuth = (username, password) => {
    fetch('/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password})
    })
    .then(res => {
      this.setState({ isAuthed: res.ok });
    });
  }

  render() {
    const { isLoading, isAuthed } = this.state;

    if (isLoading) { return Loading(); }

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
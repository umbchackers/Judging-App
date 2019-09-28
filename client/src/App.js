import React, { Component } from 'react';
import './App.css';

import api from 'api/api';

import ReactLoading from 'react-loading';

import Home from './Home/Home.js';
import Login from './Login/Login.js';

const Loading = () => (
  <div className="loading">
    <ReactLoading
      type="bubbles"
      color="#aaa"
      delay={500}
    />
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      isAuthed: false,
      assignments: [],
      data: {},
    };
  }

  componentDidMount() {
    api.getUserInfo().then(this.getAssignments);
  }

  handleAuth = (username, password) => {
    api.postLogin(username, password).then(this.getAssignments);
  }

  getAssignments = data => {
    this.setState({ data, isLoading: !!data.user, isAuthed: !!data.user }, () => {
      if (this.state.isAuthed) {
        api.getAssignments().then(assignments => {
          this.setState({ assignments, isLoading: false });
        });
      }
    });
  }

  render() {
    const { isLoading, isAuthed, assignments } = this.state;

    if (isLoading) return Loading();

    return (
      <div className="app">
        {isAuthed ? (
          <Home assignments={assignments} />
        ) : (
          <Login handleAuth={this.handleAuth} />
        )}
      </div>
    );
  }
}

export default App; 
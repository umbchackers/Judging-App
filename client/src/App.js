import React, { Component } from 'react';

import Home from './Home/Home.js';
import Login from './Login/Login.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isAuthed: null
    };
  }

  componentDidMount() {
    fetch('/user/me')
    .then(response => {
      this.setState({ isAuthed: response.ok });
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
    const { isAuthed } = this.state;

    if (isAuthed == null) {
      // Render some sort of loading screen
      return <div>Loading...</div>
    }

    return (
      <div>
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
import React, { useState, useRef } from 'react';

import './Login.css';

function Login(props) {
  const username = useRef(''), password = useRef('');
  const [error, setError] = useState('');

  function handleSubmit() {
    props.handleAuth(username.current.value, password.current.value);
  }

  return (
    <div className="login">
      <label><b>Username</b></label>
      <input type="text" ref={username} />
      <label><b>Password</b></label>
      <input type="password" ref={password} />
      <div className="submit" onClick={handleSubmit}>Log in</div>
    </div>
  );
}

export default Login;
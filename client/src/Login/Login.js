import React from 'react';

function Login(props) {

  let usernameInput = React.createRef();
  let passwordInput = React.createRef();

  // REFACTOR - MAKE THIS COMPONENT LESS UGLY
  function handleClick() {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    props.handleAuth(username, password);
  }

  return (
    <div>
      <h1>Hey, you need to log in!</h1>
      <p>Username: </p>
      <input 
        type="text" 
        ref={usernameInput}
      />
      <p>Password</p>
      <input 
        type="text"
        ref={passwordInput}        
      />
      <br/>
      <button onClick={handleClick}>Log in</button>
    </div>
  );
}

export default Login;
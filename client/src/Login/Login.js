import React, { useRef, useState } from 'react';

import { Form, Button } from 'react-bootstrap';

import './Login.css';

const Login = ({ handleAuth }) => {
  const username = useRef(''), password = useRef('');
  const [doShowPassword, setDoShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    handleAuth(username.current.value, password.current.value);
  }

  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            ref={username}
            type="text" 
            placeholder="Enter username" 
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            ref={password}
            type={doShowPassword ? "text" : "password"} 
            placeholder="Enter password" 
          />
          <Form.Text 
            className="text-muted text-show"
            onClick={() => setDoShowPassword(!doShowPassword)}
          >
            {doShowPassword ? 'Hide' : 'Show'} password
          </Form.Text>
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
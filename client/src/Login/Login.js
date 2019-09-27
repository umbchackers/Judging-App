import React, { useRef } from 'react';

import { Form, Button } from 'react-bootstrap';

import './Login.css';

function Login(props) {
  const username = useRef(''), password = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleAuth(username.current.value, password.current.value);
  }

  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  );
}

export default Login;
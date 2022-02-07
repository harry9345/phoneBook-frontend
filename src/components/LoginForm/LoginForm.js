import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleSubmit }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const loggingIn = (event) => {
    event.preventDefault();
    handleSubmit({
      username,
      password,
    });
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={loggingIn}>
        <div>
          User name :
          <input
            type='text'
            name='Username'
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div>
          Password :
          <input
            type='password'
            name='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

LoginForm.prototype = {
  handelSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;

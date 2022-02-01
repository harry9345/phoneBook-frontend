import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handelSubmit }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loggingIn = (event) => {
    event.preventDefault();
    handelSubmit({
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
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div>
          Password :
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
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

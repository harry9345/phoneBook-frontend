import React, { useState } from "react";

const LoginForm = ({ handelSubmite }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loggingIn = (event) => {
    event.preventDefault();
    handelSubmite({
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
            name="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>
        <div>
          Password :
          <input
            type="password"
            name="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;

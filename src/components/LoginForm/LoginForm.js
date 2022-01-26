import React from "react";

const LoginForm = ({
  handelSubmite,
  handleUserNameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handelSubmite}>
        <div>
          User name :
          <input
            type="text"
            name="Username"
            value={username}
            onChange={handleUserNameChange}
          />
        </div>
        <div>
          Password :
          <input
            type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;

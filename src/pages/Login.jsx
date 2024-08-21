import React from "react";
import Add from "../img/add.png";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Realtime Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button>Sign In</button>
        </form>
        <p>
          You don't have an account <a href="/login">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
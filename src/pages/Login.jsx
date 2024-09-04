import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/login");
    } catch (error) {
      setErr(true);
    }
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Realtime Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
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
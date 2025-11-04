import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Log in to ChronoView</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
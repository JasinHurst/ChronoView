import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create your ChronoView account</h2>

        <form className="signup-form">
          <input type="text" placeholder="Full name" required />
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

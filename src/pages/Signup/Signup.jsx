import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    timezone: "",
    birth_date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Welcome, ${data.first_name}!`);
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create your ChronoView account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="birth_date"
            placeholder="Birthdate (DD/MM/YYYY)"
            value={formData.birth_date}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // remove non-digits
              if (value.length > 2 && value.length <= 4)
                value = `${value.slice(0, 2)}/${value.slice(2)}`;
              else if (value.length > 4)
               value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 8)}`;
            setFormData({ ...formData, birth_date: value });
            }}
            maxLength="10"
            required
            />
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            required
          >
            <option value="">Select Timezone</option>
            <option value="America/New_York">Eastern (EST)</option>
            <option value="America/Chicago">Central (CST)</option>
            <option value="America/Denver">Mountain (MST)</option>
            <option value="America/Los_Angeles">Pacific (PST)</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

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
    birth_date: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    
    if (name === "birth_date") {
      
      newValue = newValue.replace(/\D/g, "");

      
      if (newValue.length > 2 && newValue.length <= 4) {
        newValue = newValue.slice(0, 2) + "/" + newValue.slice(2);
      } else if (newValue.length > 4) {
        newValue =
          newValue.slice(0, 2) +
          "/" +
          newValue.slice(2, 4) +
          "/" +
          newValue.slice(4, 8);
      }

      
      newValue = newValue.slice(0, 10);
    }

    setFormData({ ...formData, [name]: newValue });
    setErrors({ ...errors, [name]: "" }); 
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    const birthRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!formData.first_name.trim()) newErrors.first_name = "First name required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name required.";
    if (!formData.username.trim()) newErrors.username = "Username required.";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (formData.birth_date && !birthRegex.test(formData.birth_date))
      newErrors.birth_date = "Use MM/DD/YYYY format.";
    if (!newErrors.birth_date && formData.birth_date) {
      const [mm, dd, yyyy] = formData.birth_date.split("/").map(Number);
      const date = new Date(`${yyyy}-${mm}-${dd}`);
      if (
        date.getMonth() + 1 !== mm ||
        date.getDate() !== dd ||
        date.getFullYear() !== yyyy
      ) {
        newErrors.birth_date = "Enter a valid date.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Welcome, ${data.first_name}!`);
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          birth_date: "",
        });
        setErrors({});
      } else {
        setErrors({ server: data.error || "Signup failed" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ server: "Server error. Please try again." });
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
            className={errors.first_name ? "error" : ""}
            required
          />
          {errors.first_name && <p className="error-text">{errors.first_name}</p>}

          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            className={errors.last_name ? "error" : ""}
            required
          />
          {errors.last_name && <p className="error-text">{errors.last_name}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "error" : ""}
            required
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "error" : ""}
            required
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <input
            type="text"
            name="birth_date"
            placeholder="Birth Date (MM/DD/YYYY)"
            value={formData.birth_date}
            onChange={handleChange}
            className={errors.birth_date ? "error" : ""}
            maxLength="10"
            inputMode="numeric"
          />
          {errors.birth_date && <p className="error-text">{errors.birth_date}</p>}

          {errors.server && <p className="error-text">{errors.server}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

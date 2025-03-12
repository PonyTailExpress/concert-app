import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signIn.css";

const API_URL = import.meta.env.VITE_API_URL;

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: false, // Add a boolean field for the role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox separately
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked, // Set the role to the checkbox's checked state
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);
      setSuccess("Sign-up successful!");
      setError("");
      console.log("Response:", response.data);
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err) {
      setError("Sign-up failed. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">
            <input
              type="checkbox"
              id="role"
              name="role"
              checked={formData.role}
              onChange={handleChange}
            />
            Do you like to post new events?
          </label>
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

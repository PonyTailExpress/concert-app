import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signIn.css";

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.newPassword) {
      setError("Email and new password are required.");
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/auth/login`, formData);
      setSuccess("Password updated successfully!");
      setError("");
      console.log("Response:", response.data);

      // Redirect to the sign-in page after a delay
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err) {
      setError("Failed to update password. Please check your email.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="signin-form">
      <h2>Change Password</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="someone2@domain.com"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Camel1!@#"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update Password
        </button>
        <Link to="/signin">
          <button type="button" className="submit-button">
            Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
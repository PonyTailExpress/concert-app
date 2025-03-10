import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/signIn.css";
import { AuthContext } from "../context/auth.context"
const API_URL = import.meta.env.VITE_API_URL
const SignInForm = () => {
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      setSuccess("Sign-in successful!");
      setError("");
      console.log("Response:", response.data);

      // Save the token to localStorage or context (for authentication)
      storeToken(response.data.authToken);
      authenticateUser();
      setTimeout(() => {
        navigate("/concerts"); 
      }, 1000)
    } catch (err) {
      setError("Sign-in failed. Please check your credentials.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
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
        <button type="submit" className="submit-button">
          Sign in
        </button>
        <Link to='/signup'>
        <button type="submit" className="submit-button">
          Sign up
        </button>
        </Link>
      </form>
    </div>
  );
};

export default SignInForm;
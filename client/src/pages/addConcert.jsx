import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/addConcert.css";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_URL = import.meta.env.VITE_API_URL;

const AddConcert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    venue: "",
    date: "",
    image_url: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  // Check for authentication when component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage(imageFile);
    if (imageUrl) {
      formData.image_url = imageUrl;
    }

    try {
      await axios.post(`${API_URL}/concerts`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setSuccess("Concert added successfully!");
      setError("");

      setTimeout(() => {
        navigate("/concerts");
      }, 1000);
    } catch (err) {
      setError("Failed to add concert. Please try again.");
      console.error("Error:", err);
    }
  };

  // Error message display
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="add-concert-form">
      <h2>Add New Concert</h2>
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="venue">Concert Title:</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Concert Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Concert
        </button>
      </form>
    </div>
  );
};

export default AddConcert;

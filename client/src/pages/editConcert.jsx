import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/addConcert.css";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const API_URL = import.meta.env.VITE_API_URL;

const EditConcert = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Getting the concert id from the route params
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

  useEffect(() => {
    // Fetch the concert details from the backend when the component mounts
    const fetchConcertData = async () => {
      try {
        const response = await axios.get(`${API_URL}/concerts/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setFormData({
          venue: response.data.venue,
          date: response.data.date,
          image_url: response.data.image_url,
        });
        setPreviewImage(response.data.image_url);
      } catch (error) {
        setError("Failed to fetch concert details.");
        console.error("Error fetching concert:", error);
      }
    };

    fetchConcertData();
  }, [id, storedToken]);

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

    let imageUrl = formData.image_url;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) return;
    }

    try {
      await axios.put(
        `${API_URL}/concerts/${id}`,
        { ...formData, image_url: imageUrl },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      setSuccess("Concert updated successfully!");
      setError("");

      setTimeout(() => {
        navigate("/createdevents");
      }, 1000);
    } catch (err) {
      setError("Failed to update concert. Please try again.");
      console.error("Error:", err);
    }
  };

  // Error message display
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="add-concert-form">
      <h2>Edit Concert</h2>
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
          Update Concert
        </button>
        <Link to="/createdevents">
        <button type="submit" className="submit-button">
          Back
        </button>
        </Link>
      </form>
    </div>
  );
};

export default EditConcert;

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/concerts.css";

const API_URL = import.meta.env.VITE_API_URL;
function ArtistDetails() {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`${API_URL}/artists/${id}`)
      .then((response) => {
        setArtist(response.data); // Set a single concert object
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching concert:", error);
        setError("Failed to load concert details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading concerts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!artist) return <p>No concert found.</p>;

  return (
    <div>
      <h2>Artist Details</h2>
      <div className="concerts-grid">
        <div className="concert-item">
          <img
            src={artist.artistImage}
            alt={artist.name}
            className="concert-image"
          />
          <h3>{artist.name}</h3>
          <p>{artist.bio}</p>{" "}
          {/*Assuming there's a description or more details */}
          <div className="concert-actions">
            <Link to="/artists">
              <button className="details-button">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;

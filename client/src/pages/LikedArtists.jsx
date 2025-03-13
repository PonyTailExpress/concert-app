import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/concerts.css";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function LikedArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    axios
      .get(`${API_URL}/auth/likedartists/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setArtists(response.data);
        } else {
          console.error("API response is not an array");
          setArtists([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching concerts:", error);
        setError("Failed to load concerts");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading Artists...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {artists.length == 0 ? (
        <h2>No liked artists</h2>
      ) : (
        <div>
          <h2>.</h2>
          <div className="concerts-grid">
            {artists.map((artist, index) => (
              <div
                key={artist._id}
                className={`concert-item ${index % 2 === 0 ? "even" : "odd"}`}
              >
                <img
                  src={artist.artistImage}
                  alt={`Image of ${artist.name}`}
                  className="concert-image"
                />
                <h3>{artist.name}</h3>
  
                <div className="concert-actions">
                  <Link to={`/artists/${artist._id}`}>
                    <button className="details-button">More Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 

export default LikedArtists;

import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/concerts.css";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function LikedConcerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    axios
      .get(`${API_URL}/auth/likedconcerts/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setConcerts(response.data);
        } else {
          console.error("API response is not an array");
          setConcerts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching concerts:", error);
        setError("Failed to load concerts");
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading concerts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {concerts.length == 0 ? (
        <h2>No liked concerts</h2>
      ) : (
        <div>
          <h2>.</h2>
          <div className="concerts-grid">
            {concerts.map((concert, index) => (
              <div
                key={concert._id}
                className={`concert-item ${index % 2 === 0 ? "even" : "odd"}`}
              >
                <img
                  src={concert.image_url}
                  alt={concert.venue}
                  className="concert-image"
                />
                <h3>{concert.venue}</h3>
  
                <div className="concert-actions">
                  <Link to={`/concerts/${concert._id}`}>
                    <button className="details-button">More Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
}

export default LikedConcerts;

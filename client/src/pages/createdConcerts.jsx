import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/concerts.css";
import { AuthContext } from "../context/auth.context";
const API_URL = import.meta.env.VITE_API_URL;

function CreatedConcerts() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [concerts, setConcerts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    axios
      .get(`${API_URL}/auth/createdconcerts/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setConcerts(response.data);
          if (!concerts) {
            <p>No events created by you.</p>;
          }
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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/concerts/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      if (res.status === 200) {
        console.log("Concert deleted successfully");
        setTimeout(() => {
          navigate("/addconcert");
        }, 500);
      }
    } catch (error) {
      console.error("Error deleting the concert:", error);
    }
  };
  if (loading) return <p>Loading concerts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {concerts.length === 0 ? (
        <h1>No events created by you.</h1>
      ) : (
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
                <Link to={`/createdevents/${concert._id}`}>
                  <button className="details-button">edit</button>
                </Link>
                <button
                  className="details-button"
                  onClick={() => handleDelete(concert._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CreatedConcerts;

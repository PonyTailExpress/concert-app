import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import './CSS/Concert.css'
import { AuthContext } from "../context/auth.context"


const API_URL = import.meta.env.VITE_API_URL
function Concerts() {
  const [concerts, setConcerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, isLoggedIn } = useContext(AuthContext)
  
  const clickFunc = (id) => {
    const storedToken = localStorage.getItem("authToken");
    const userId = user._id;

    if (!storedToken || !userId) {
      console.error("Auth token or user ID is missing.");
      return;
    }

    setLoading(true);  // Set loading to true before the API call

    axios
      .patch(
        `${API_URL}/auth/concerts/${id}`,  // API call to the concert endpoint
        {
          userId: userId,  // Pass userId in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,  // Pass the auth token in the header
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("User updated successfully");
        } else {
          console.error("Failed to update user profile");
        }
        setLoading(false);  // End loading after response
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
        setError("Failed to update user profile");  // Handle error if something goes wrong
        setLoading(false);  // End loading after error
      });
  };



useEffect(() => {
    axios
      .get(`${API_URL}/concerts`)  
      .then((response) => {
      if (Array.isArray(response.data)) {
          setConcerts(response.data) 
        } else {
          console.error('API response is not an array')
          setConcerts([])  
        }
        setLoading(false) 
      })
      .catch((error) => {
        console.error('Error fetching concerts:', error)
        setError('Failed to load concerts')
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading concerts...</p>
  if (error) return <p>Error: {error}</p>

  return (
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

              <button
                className="heart-button"
                onClick={() => isLoggedIn ? clickFunc(concert._id) : alert("Please log in to like concerts and/or artists")}
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Concerts

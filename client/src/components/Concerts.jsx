import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import './CSS/Concert.css'


const API_URL = import.meta.env.VITE_API_URL
function Concerts() {
  const [concerts, setConcerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
                onClick={() => console.log("Heart button clicked for", concert._id)}
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

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import './CSS/Concert.css'


const API_URL = import.meta.env.VITE_API_URL
function Artists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`${API_URL}/artists`)  
      .then((response) => {
      if (Array.isArray(response.data)) {
          setArtists(response.data) 
        } else {
          console.error('API response is not an array')
          setArtists([])  
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
        {artists.map((artist, index) => (
          <div
            key={artist._id}
            className={`concert-item ${index % 2 === 0 ? "even" : "odd"}`}
          >{/* <img src={concert.image_url} alt={concert.venue} className="concert-image" /> 
            <img
              src={concert.image_url}
              alt={concert.venue}
              className="concert-image"
            /> */}
            <h3>{artist.name}</h3>
            <h3>{artist.genre}</h3>
            
            <div className="concert-actions">
              <Link to={`/artists/${artist._id}`}>
                <button className="details-button">More Details</button>
              </Link>

              <button
                className="heart-button"
                onClick={() => console.log("Heart button clicked for", artist._id)}
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

export default Artists

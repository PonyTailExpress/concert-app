import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import './CSS/Concert.css'


const API_URL = import.meta.env.VITE_API_URL
function ConcertDetails() {
  const [concert, setConcert] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    axios
      .get(`${API_URL}/concerts/${id}`)
      .then((response) => {
        setConcert(response.data); // Set a single concert object
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching concert:', error);
        setError('Failed to load concert details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading concerts...</p>
  if (error) return <p>Error: {error}</p>
  if (!concert) return <p>No concert found.</p>

  return (
    <div>
      <h2>Concert Details</h2>
      <div className="concerts-grid">
        <div className="concert-item">
          <img
            src={concert.image_url}
            alt={concert.venue}
            className="concert-image"
          />
          <h3>{concert.venue}</h3>
          {/*<p>{concert.description}</p>  Assuming there's a description or more details */}
          <div className="concert-actions">
            <Link to="/concerts">
              <button className="details-button">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConcertDetails

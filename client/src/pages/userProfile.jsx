import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import "../styles/profile.css";

const API_URL = import.meta.env.VITE_API_URL;

function UserProfile() {
    const { user, logOutUser } = useContext(AuthContext);
    const storeToken = localStorage.getItem("authToken");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = (id) => {
        setLoading(true);

        axios.delete(`${API_URL}/auth/user/${id}`, {
            headers: { Authorization: `Bearer ${storeToken}` }
        })
        .then(() => {
            setTimeout(() => {
                logOutUser();
                navigate("/signin");
            }, 500);
        })
        .catch(() => {
            setError("Failed to delete user.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className="profile-wrapper">
            <div className="user-profile">
                <h2>{user.name} Profile</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role ? "Admin" : "Non-Admin"}</p>

                {error && <p className="error-message">{error}</p>}

                <div className="button-container">
                    <button 
                        onClick={() => handleDelete(user._id)} 
                        className="delete-button"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Account"}
                    </button>

                    <Link to="/" className="back-button">Back</Link>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
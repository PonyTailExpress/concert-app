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

        axios.delete(`${API_URL}/auth/delete/${id}`, {
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
        <div className="user-profile">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role ? "Admin" : "Non-Admin"}</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button 
                onClick={() => handleDelete(user._id)} 
                style={{ backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px" }}
                disabled={loading}
            >
                {loading ? "Deleting..." : "Delete Account"}
            </button>

            <br />
            <Link to="/">Back</Link>
        </div>
    );
}

export default UserProfile;

import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Import the CSS file
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const handleLogout = () => {
    logOutUser();
    navigate("/signin");
  };

  // Toggle hamburger menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu if the click is outside
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside); // Cleanup on unmount
  }, []);

  return (
    <nav className="navbar">
     <div className="navbar-container" ref={menuRef}>
        {/* Hamburger Menu */}
        <div className="hamburger" onClick={handleMenuToggle}>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        {/* Tabs (Concerts & Artists) */}
        <div className={`navbar-tabs ${isMenuOpen ? "hide" : ""}`}>
          <NavLink to="/" className="navbar-tab" activeclassname="active">
            About
          </NavLink>
          <NavLink
            to="/concerts"
            className="navbar-tab"
            activeclassname="active"
          >
            Concerts
          </NavLink>
          <NavLink
            to="/artists"
            className="navbar-tab"
            activeclassname="active"
          >
            Artists
          </NavLink>
        </div>

        {/* Sign In/Sign Out Button */}
        {isLoggedIn ? (
          <button
            className={`sign-in-btn ${isMenuOpen ? "hide" : ""}`}
            onClick={handleLogout} // Calls logOutUser if logged in
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signin">
            <button className={`sign-in-btn ${isMenuOpen ? "hide" : ""}`}>
              Sign In
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : "hide"}`}>
        <NavLink to="/" className="mobile-menu-item" activeclassname="active">
          About
        </NavLink>
        <NavLink
          to="/concerts"
          className="mobile-menu-item"
          activeclassname="active"
        >
          Concerts
        </NavLink>
        <NavLink
          to="/artists"
          className="mobile-menu-item"
          activeclassname="active"
        >
          Artists
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            to="/likedconcerts"
            className="mobile-menu-item"
            activeclassname="active"
          >
            Events you liked
          </NavLink>
        ) : null}
        {isLoggedIn ? (
          <NavLink
            to="/likedartists"
            className="mobile-menu-item"
            activeclassname="active"
          >
            Artists you liked
          </NavLink>
        ) : null}
        {isLoggedIn && user.role ? (
          <NavLink
            to="/addconcert"
            className="mobile-menu-item"
            activeclassname="active"
          >
            Create an event
          </NavLink>
        ) : null}
        {isLoggedIn && user.role ? (
          <NavLink
            to="/createdevents"
            className="mobile-menu-item"
            activeclassname="active"
          >
            Events created by you
          </NavLink>
        ) : null}
        {isLoggedIn ? (
          <NavLink
            to="/userprofile"
            className="mobile-menu-item"
            activeclassname="active"
          >
            Your profile
          </NavLink>
        ) : null}
        {isLoggedIn ? (
          <div
            className="mobile-menu-item"
            onClick={handleLogout} // Trigger the logout function
            style={{ cursor: "pointer" }} // Make it look clickable
          >
            Sign Out
          </div>
        ) : (
          <NavLink
            to="/signin"
            className="mobile-menu-item"
            activeclassname="active"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

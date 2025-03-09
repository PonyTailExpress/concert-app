import React, { useState } from 'react';
import './CSS/navbar.css'; // Import the CSS file
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import { Link } from 'react-router-dom'; // Use NavLink instead of Link
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle hamburger menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Hamburger Menu */}
        <div className="hamburger" onClick={handleMenuToggle}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Tabs (Concerts & Artists) */}
        <div className={`navbar-tabs ${isMenuOpen ? 'hide' : ''}`}>
          <NavLink to="/about" className="navbar-tab" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/concerts" className="navbar-tab" activeClassName="active">
            Concerts
          </NavLink>
          <NavLink to="/artists" className="navbar-tab" activeClassName="active">
            Artists
          </NavLink>
        </div>

        {/* Sign In Button */}
        <Link to="/signin">
          <button className={`sign-in-btn ${isMenuOpen ? 'hide' : ''}`}>
            Sign In
          </button>
        </Link>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : 'hide'}`}>
      <NavLink to="/about" className="mobile-menu-item" activeClassName="active">
          About
        </NavLink>
        <NavLink to="/concerts" className="mobile-menu-item" activeClassName="active">
          Concerts
        </NavLink>
        <NavLink to="/artists" className="mobile-menu-item" activeClassName="active">
          Artists
        </NavLink>
        <NavLink to="/signin" className="mobile-menu-item" activeClassName="active">
          Sign In
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
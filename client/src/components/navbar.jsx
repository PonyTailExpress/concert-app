import React, { useState } from 'react';
import './CSS/navbar.css'; // Import the CSS file

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
          <a href="#concerts" className="navbar-tab">Concerts</a>
          <a href="#artists" className="navbar-tab">Artists</a>
          <a href="#about" className="navbar-tab">About</a>
        </div>

        {/* Sign In Button */}
        <button className={`sign-in-btn ${isMenuOpen ? 'hide' : ''}`}>Sign In</button>
      </div> 
       
      {/* Mobile Menu (Dropdown) */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : 'hide'}`}>
        <a href="#concerts" className="mobile-menu-item">Concerts</a>
        <a href="#artists" className="mobile-menu-item">Artists</a>
        <a href="#signin" className="mobile-menu-item">Sign In</a>
      </div>
    </nav>
  );
};

export default Navbar;

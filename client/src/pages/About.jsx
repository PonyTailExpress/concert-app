import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";

function About() {
  return (
    <div className="about-container">
      <h1>About Our Concert App</h1>
      <p>
        Welcome to the ultimate concert discovery platform! Our app keeps you
        updated with the latest concerts happening across Germany. Whether
        you're a fan of rock, pop, classical, or indie music, we've got you
        covered.
      </p>

      <div className="features">
        <h2>What We Offer</h2>
        <ul>
          <li>📅 Stay informed about upcoming concerts in Germany.</li>
          <li>📍 Explore venues of your favorite artists.</li>
          <li>❤️ Save your favorite concerts and plan your music journey.</li>
        </ul>
      </div>

      <div className="cta">
        <Link to="/concerts" className="cta">
          Start exploring now and never miss a concert again! 🎶
        </Link>
      </div>
    </div>
  );
}

export default About;

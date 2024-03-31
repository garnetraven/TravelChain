import React from 'react';
import { Link } from 'react-router-dom';
import '../css/homepage.css'; // Import your CSS file for styling

const Homepage = () => {
  return (
    <div className="container mt-5">
      <div className="homepage-content">
        <img src="/logo.png" alt="Logo" className="logo" /> {/* Apply styling for the logo */}
        <Link to="/signin" className="btn btn-primary sign-in-btn">Sign in</Link> {/* Apply styling for the sign-in button */}
      </div>
    </div>
  );
};

export default Homepage;

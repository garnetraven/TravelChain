import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/signin.css'; // Import the CSS file for SignIn component styling

const SignIn = () => {
  // State to track login status
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle MetaMask login
  const handleMetaMaskLogin = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Check if accounts are present
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
          console.log('Logged in with MetaMask');
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error logging in with MetaMask:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  // Redirect to dashboard if already logged in
  if (loggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <div className="container mt-5 sign-in-container">
      <h2>Sign In with MetaMask</h2>
      <p></p>
      <button onClick={handleMetaMaskLogin} className="btn btn-primary sign-in-btn">Sign In with MetaMask</button>
    </div>
  );
};

export default SignIn;

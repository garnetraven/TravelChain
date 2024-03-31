import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl'; // Import mapbox-gl library
import Web3 from 'web3';
import contractABI from '../contractABI.json'; // Import the contract ABI

import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/dashboard.css';

const Dashboard = () => {
  const [userImages, setUserImages] = useState([]); // State to hold user's images
  const [map, setMap] = useState(null); // State to hold the map object
  const [markers, setMarkers] = useState([]); // State to hold markers
  const [loading, setLoading] = useState(true); // State to track loading status
  const [contractAddress, setContractAddress] = useState(''); // State to hold the contract address
  const [userAddress, setUserAddress] = useState(''); // State to hold the user address

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          console.log('MetaMask detected');
          const web3 = new Web3(window.ethereum);
          
          // Request access to user accounts
          console.log('Requesting access to user accounts');
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('Access to user accounts granted');
  
          // Get contract instance and user address
          console.log('Fetching contract instance and user address');
          const accounts = await web3.eth.getAccounts();
          const userAddress = accounts[0];
          const contractInstance = new web3.eth.Contract(contractABI, '<YourContractAddress>');
          console.log('Contract instance and user address fetched:', contractInstance, userAddress);
  
          // Fetch user images from contract
          console.log('Fetching user images from contract');
          const imageCount = await contractInstance.methods.getImageCount().call();
          console.log('Image count:', imageCount);
          const images = [];
  
          // Fetch image details and URLs from the contract
          for (let i = 0; i < imageCount; i++) {
            console.log('Fetching image', i);
            const imageData = await contractInstance.methods.getImage(i).call();
            console.log('Image data:', imageData);

            const latitude = Number(imageData[1]) / 10**6;
            const longitude = Number(imageData[2]) / 10**6;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            
            images.push({ 
              url: imageData[0], 
              latitude: latitude, 
              longitude: longitude 
            });
          }
  
          setUserImages(images);
          setLoading(false);
          setContractAddress('YourContractAddress');
          setUserAddress(userAddress);
        } else {
          console.error('MetaMask not detected');
        }
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };
  
    fetchUserImages();
  }, []);

  useEffect(() => {
    if (!map && !loading) {
      // Initialize map only when component mounts and user images are fetched
      mapboxgl.accessToken = '<API_Token>';
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 3
      });

      mapInstance.on('load', () => {
        setMap(mapInstance);
      });
    }
  }, [map, loading]);

  useEffect(() => {
    if (map && userImages.length > 0) {
      userImages.forEach(image => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
            <img src="${image.url}" alt="Image" style="width: 200px; height: 200px;">
            <p>Latitude: ${image.latitude}</p>
            <p>Longitude: ${image.longitude}</p>
          </div>`
        );

        new mapboxgl.Marker()
          .setLngLat([image.longitude, image.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    }
  }, [map, userImages]);

  return (
    <div className="container mt-5 dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <p>Contract Address: {contractAddress}</p>
      <p>User Address: {userAddress}</p>
      {/* Render loading message or user images */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Render map and user images */}
          {/* Map rendering code goes here */}
          <div className="map-container" id="map" style={{ height: '400px', width: '100%' }}></div>
          <div className="user-images">
            <h3>Your Travel Images</h3>
            {/* Display images in grid layout */}
            <div className="image-grid">
              {userImages.map((image, index) => (
                <div className="image-container" key={index}>
                  <img src={image.url} alt={`Image ${index}`} className="image" />
                  <p>Latitude: {image.latitude}</p>
                  <p>Longitude: {image.longitude}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <p></p>


      <Link to="/upload" className="btn btn-primary mr-2">Upload</Link>
    </div>
  );
};

export default Dashboard;

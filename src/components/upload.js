import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import exifr from 'exifr';
import Web3 from 'web3';
import contractABI from '../contractABI.json'; // Import the contract ABI
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase storage functions

import '../css/upload.css';

const Upload = () => {
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState(''); // State to hold the user address
  const [contractAddress, setContractAddress] = useState(''); // State to hold the contract address
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setUserAddress(accounts[0]);
          const contractAddress = '<contract_token>'; // Replace with your contract address
          setContractAddress(contractAddress);
        } else {
          console.error('MetaMask not detected');
        }
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
      }
    };
  
    fetchBlockchainData();
  }, []);

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleExtractGPSData = async () => {
    if (!selectedImage) {
      setError('No image selected');
      return;
    }

    try {
      const options = { ifd0: false, exif: false, gps: ['GPSLatitudeRef', 'GPSLatitude', 'GPSLongitudeRef', 'GPSLongitude'] };
      const gps = await exifr.parse(selectedImage, options);

      if (gps) {
        setLatitude(gps.latitude);
        setLongitude(gps.longitude);
        setError(null);
      } else {
        setError('GPS data not found in the image');
      }
    } catch (error) {
      setError('Error extracting GPS data');
    }
  };

  const handleUploadToFirebase = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, selectedImage.name);
      await uploadBytes(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(storageRef); // Await for the download URL
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
      setError('Error uploading image to Firebase');
      return null;
    }
  };

  const handleUploadToBlockchain = async (imageUrl) => {
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(contractABI, contractAddress);
  
      // Convert latitude and longitude to integers
      const latitudeInt = Math.round(latitude * 10**6);
      const longitudeInt = Math.round(longitude * 10**6);
  
      // Estimate gas and get gas price
      const gasEstimate = await instance.methods.uploadImage(imageUrl, latitudeInt, longitudeInt).estimateGas({ from: accounts[0] });
      const gasPrice = await web3.eth.getGasPrice();
  
      // Send transaction to upload image
      await instance.methods.uploadImage(imageUrl, latitudeInt.toString(), longitudeInt.toString()).send({ from: accounts[0], gas: gasEstimate, gasPrice: gasPrice });
  
      setError(null);
      setSuccessMessage('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image hash to the blockchain:', error);
      setError('Error uploading image hash to the blockchain');
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError('No image selected');
      return;
    }

    try {
      const imageUrl = await handleUploadToFirebase();
      if (imageUrl) {
        await handleUploadToBlockchain(imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image');
    }
  };

  return (
    <div className="container mt-5 upload-container">
      <h2 className='upload-title'>Upload Image</h2>
      <div className='upload-info'>
        <p className="upload-info-text">User Address: {userAddress}</p>
        <p className="upload-info-text">Contract Address: {contractAddress}</p>
      </div>
      <div className='upload-input'>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="upload-file-input" />
      </div>
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="upload-image-preview" />
      )}
      <div className="mt-3">
        <button type="button" className="btn btn-primary upload-extract-button" onClick={handleExtractGPSData} disabled={!selectedImage }>
          Extract GPS Data
        </button>
      </div>
      {latitude !== null && longitude !== null && (
        <div>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </div>
      )}
      {latitude !== null && longitude !== null && (
        <div>
          <button type="button" onClick={handleUpload} className="upload-upload-button">Upload Image</button>
        </div>
      )}
      {error && <div className="alert alert-danger mt-3 upload-error">{error}</div>}
      {successMessage && <div className="alert alert-success mt-3 upload-success">{successMessage}</div>}
      <Link to="/dashboard" className="btn btn-secondary mt-3">Back to Dashboard</Link>
    </div>
  );
};

export default Upload;

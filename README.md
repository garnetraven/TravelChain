<img src="readme_images/home.PNG">

### Description

TravelChain is an application originally developed for a 48 hour ASU Blockchain Hackathon. Aimed at providing a decentralized solution for travel enthusiasts to store and visualize their travel memories. The app utilizes blockchain technology to securely store GPS metadata extracted from photos and presents them in an interactice map interface.

### Technologies Used

- Solidity Smart Contracts: Smart contracts are written in Solidity, enabling the storage of GPS metadata on the blockchain securely.
- Polygon Testnet: The app utilizes the Polygon test network for blockchain interactions, ensuring efficient and cost-effective testing and deployment.
- Hardhat: Hardhat is used for testing the smart contracts, providing a reliable environment for smart contract development and testing.
- React and Node.js: The front-end of the application is built using React.js, offering a user-friendly interface for interacting with the TravelChain platform. Node.js is used for server-side logic and API interactions.
- Firebase: Firebase is utilized for storage, providing a scalable and reliable solution for storing user data and images.
- Mapbox API: Mapbox API is integrated into the application for visualizing the stored photos on an interactive map, allowing users to explore their travel memories geographically.

<p></p>
<img src="readme_images/upload.PNG">

### Functionality

- Metadata Extraction: The app extracts GPS metadata from user-uploaded photos, ensuring accurate location data for each image.
- Blockchain Storage: The extracted GPS metadata is securely stored on the Polygon blockchain using smart contracts, ensuring immutability and transparency.
- Map Visualization: Users can view their stored photos on an interactive map powered by Mapbox API, providing a visual representation of their travel experiences.
- User Dashboard: The app offers a personalized dashboard for each user, allowing them to manage their uploaded photos and explore their travel memories conveniently.

### Usage

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Start the front-end server using `npm start`.
4. Connect to the Polygon test network and deploy the smart contracts using Hardhat.
5. Explore the TravelChain platform, upload photos, and visualize your travel memories on the interactive map.

<p></p>
<img src="readme_images/dashboard.PNG">

### Current State of Development

Since the hackathon I have worked on this project periodically. At this point it is still in development. My current goal is to get the dApp on the blockchain and up and running as a website for users to login and enjoy their photos. As of now only the metadata is being stored on the blockchain. The images are being stored in firebase, the next phase is to bring them to the blockchain using IPFS to store them instead.


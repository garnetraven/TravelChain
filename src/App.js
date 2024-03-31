import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import "firebase/firestore";

import Homepage from './components/homepage';
import Upload from './components/upload';
import Signin from './components/signin';
import Dashboard from './components/dashboard';

import './App.css';

const firebaseConfig = {
  apiKey: "",
  authDomain: "smartrewards-b4381.firebaseapp.com",
  projectId: "smartrewards-b4381",
  storageBucket: "smartrewards-b4381.appspot.com",
  messagingSenderId: "765981009167",
  appId: "1:765981009167:web:89f040ab20b9ec45678a7a",
  measurementId: "<fire>"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

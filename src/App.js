import React from 'react'
import './App.css';

import Login from './components/Login.js';    // Yeni sayfalar, sen oluşturacaksın
import Signup from './components/SignUp.js';
import Home from './Home.js';      // Film ve TV listelerinin olduğu sayfa
import Navbar from './components/Navbar.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
}

export default App;
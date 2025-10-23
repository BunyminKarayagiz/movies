import React from 'react'
import './App.css';
import Login from './components/Login.js';    // Yeni sayfalar, sen oluşturacaksın
import Signup from './components/SignUp.js';
import Home from './Home.js';      // Film ve TV listelerinin olduğu sayfa
import Admin from './components/Admin.js'
import UserLayout from './UserLayout.js';
import WatchList from "./components/WatchList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
  <Routes>

    <Route element={<UserLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/watchlist" element={<WatchList />} />
    </Route>
    <Route path="/admin" element={<Admin />} />

  </Routes>
</Router>
  );
}

export default App;
import React from 'react'
import './App.css';
import Login from './pages/Login.js';    // Yeni sayfalar, sen oluşturacaksın
import Signup from './pages/SignUp.js';
import Home from './pages/Home.js';      // Film ve TV listelerinin olduğu sayfa
import Admin from './pages/Admin.js'
import UserLayout from './UserLayout.js';
import Profile from './pages/Profile.js';
import WatchList from "./pages/WatchList.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemDetail from "./components/ItemDetails.js"

function App() {

  return (
    <Router>
  <Routes>

    <Route element={<UserLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/watchlist" element={<WatchList />} />
      <Route path="/movie/:id" element={<ItemDetail type="movie" />} />
      <Route path="/tv/:id" element={<ItemDetail type="tv" />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="/admin" element={<Admin />} />

  </Routes>
</Router>
  );
}

export default App;
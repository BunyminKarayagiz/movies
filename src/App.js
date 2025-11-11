import React, { Suspense, lazy } from "react";
import './App.css';
import UserLayout from './UserLayout.js';
import Profile from './pages/Profile.js';
import WatchList from "./pages/WatchList.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from "./pages/NotFound.js";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const ItemDetail = lazy(() => import("./components/ItemDetails"));


function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/movie/:id" element={<ItemDetail type="movie" />} />
            <Route path="/tv/:id" element={<ItemDetail type="tv" />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
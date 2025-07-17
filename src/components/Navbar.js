import React from "react";
import "../styles/Navbar.css";
import { auth } from "../Firebase.js";
import { signOut,onAuthStateChanged  } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

  const [currentUser, setCurrentUser] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);


  function logOut() {
    signOut(auth);
    console.log("Cikis yapildi.");
    window.location.reload();
  }

  const isCurrentUser = () => {
    if (currentUser) {
      return (
        <div className="navbar-user">
          <p className="welcome-text">
            Hoşgeldin, <span>{user.email}</span>
          </p>
          <button className="logout-btn" onClick={logOut}>
            Çıkış Yap
          </button>
        </div>
      );
    }
    return (
      <div className="navbar-buttons">
        <Link to="/login">
          <button className="nav-btn">Giriş</button>
        </Link>
        <Link to="/signup">
          <button className="nav-btn">Kayıt</button>
        </Link>
      </div>
    );
  };

  return (
    <div className="navbar">
      <h1 className="navbar-logo">
        <Link to="/">MovieExplorer</Link>
      </h1>
      {isCurrentUser()}
    </div>
  );
}

export default Navbar;

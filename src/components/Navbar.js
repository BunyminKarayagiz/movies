import React from "react";
import "../styles/Navbar.css";
import { auth,db } from "../Firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUserRole(docSnap.exists() ? docSnap.data().role : null);
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserRole(null);
    navigate('/');
  };

  const goToAdmin = () => navigate('/admin');

  return (
    <div className="navbar">
      <h1 className="navbar-logo">
        <Link to="/">MovieExplorer</Link>
      </h1>
      {currentUser ? (
        <div className="navbar-user">
          <p className="welcome-text">Hoşgeldin, <span>{currentUser.email}</span></p>
          <button className="logout-btn" onClick={logOut}>Çıkış Yap</button>
          {userRole === "admin" && (
            <button className="admin-btn" onClick={goToAdmin}>Admin</button>
          )}
        </div>
      ) : (
        <div className="navbar-buttons">
          <Link to="/login"><button className="nav-btn">Giriş</button></Link>
          <Link to="/signup"><button className="nav-btn">Kayıt</button></Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;

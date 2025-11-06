import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { auth, db } from "../Firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

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
    navigate("/");
  };

  return (
    <div className="navbar">
      <h1 className="navbar-logo">
        <Link 
          onClick={(e) => { e.preventDefault(); window.location.assign("/"); }}>
          MovieExplorer
        </Link>
      </h1>

      {currentUser ? (
        <div className="navbar-links">
          {userRole === "admin" && (
            <div className="nav-item" onClick={() => navigate("/admin")}>Admin</div>
          )}
          <div className="nav-item" onClick={() => navigate("/watchlist")}>WatchList</div>
          <div className="nav-item" onClick={() => navigate("/profile")}>Profil</div>
          <div className="nav-item logout" onClick={logOut}>Çıkış Yap</div>
        </div>
      ) : (
        <div className="navbar-links">
          <div className="nav-item" onClick={() => navigate("/login")}>Giriş</div>
          <div className="divider"></div>
          <div className="nav-item" onClick={() => navigate("/signup")}>Kayıt</div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

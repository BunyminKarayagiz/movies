import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import "../styles/Profile.css";

function Profile() {
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="profile-container">
        <p>Profil bilgilerini görmek için lütfen giriş yap.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profil Bilgileri</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {userData?.role || "Kullanıcı"}</p>
          <p><strong>Kayıt Tarihi:</strong> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("tr-TR") : "-"}</p>
        </div>
        <div className="profile-actions">
          <button className="profile-btn">Şifreyi Değiştir</button>
          <button className="profile-btn">Bilgileri Güncelle</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

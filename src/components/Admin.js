import { useEffect, useState } from "react";
import UserAdd from "./UserAdd";
import UserDelete from "./UserDelete";
import UserList from "./UserList";
import UserUpdate from "./UserUpdate";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import "../styles/Admin.css";

function Admin() {
  const [activeTab, setActiveTab] = useState("list");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(querySnapshot.docs)
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data:doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Kullanıcılar alınırken hata:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="navbar-logo">MovieExplorer</h1>
        <button onClick={() => setActiveTab("list")}>Kullanıcı Listele</button>
        <button onClick={() => setActiveTab("add")}>Kullanıcı Ekle</button>
        <button onClick={() => setActiveTab("update")}>
          Kullanıcı Güncelle
        </button>
        <button onClick={() => setActiveTab("delete")}>Kullanıcı Sil</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "list" && <UserList users={users} />}
        {activeTab === "add" && <UserAdd />}
        {activeTab === "update" && <UserUpdate />}
        {activeTab === "delete" && <UserDelete />}
      </div>
    </div>
  );
}

export default Admin;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import "../styles/Admin.css";

function Admin() {
  const [activeTab, setActiveTab] = useState("list");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setUsers(usersList);
        setFilteredUsers(usersList); // ilk yükleme hepsi gelsin
      } catch (error) {
        console.error("Kullanıcılar alınırken hata:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const filtered = users.filter(user => 
       user.data.email &&
    user.data.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="navbar-logo">
          <Link to="/">MovieExplorer</Link>
        </h1>
        <button onClick={() => setActiveTab("list")}>Kullanıcı Listele</button>
        <button onClick={() => setActiveTab("add")}>Kullanıcı Ekle</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="search-div">
          <label>Kullanici Ara</label>
          <input
            type="text"
            placeholder="Enter mail"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div>
          {activeTab === "list" && <UserList users={filteredUsers} />}
          {activeTab === "add" && <UserAdd />}
        </div>
      </div>
    </div>
  );
}

export default Admin;

import React from "react";
import UserItem from "./UserItem";
import "../styles/UserList.css";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function UserList() {
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
        setFilteredUsers(usersList); // tüm kullanıcılar gösterilsin
      } catch (error) {
        console.error("Kullanıcılar alınırken hata:", error);
      }
    };
    fetchUsers();
  }, []);

    const handleSearch = () => {
    const filtered = users.filter(
      (user) =>
        user.data.email &&
        user.data.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <>
      <div className="search-div">
        <label>Kullanıcı Ara</label>
        <input
          type="text"
          placeholder="Enter mail"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="card-container">
        {filteredUsers.map((user, key) => {
          return <UserItem key={key} user={user} />;
        })}
      </div>
    </>
  );
}

export default UserList;

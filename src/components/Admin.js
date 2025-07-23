import { useState } from "react";
import { Link } from "react-router-dom";
import UserAdd from "./UserAdd";
import UserList from "./UserList";
import "../styles/Admin.css";

function Admin() {
  const [activeTab, setActiveTab] = useState("list");

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
        <div>
          {activeTab === "list" && <UserList/>}
          {activeTab === "add" && <UserAdd />}
        </div>
      </div>
    </div>
  );
}

export default Admin;

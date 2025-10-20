import React from "react";
import "../styles/UserList.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";

const handleDelete = async (userId) => {
  const confirmDelete = window.confirm("Kullanıcıyı silmek istediğinize emin misiniz?");
  
  if (confirmDelete) {
    try {
      await deleteDoc(doc(db, "users", userId));
      alert("Kullanıcı başarıyla silindi.");
    } catch (error) {
      console.error("Silme işlemi sırasında hata:", error);
      alert("Silme işlemi başarısız oldu.");
      window.location.reload()
    }
  } else {
    console.log("Kullanıcı silme iptal edildi.");
  }
};

function UserItem({ user }) {
  return (
    <div >
      <div className="user-card">
        <div className="user-content">
          <h1>Name: {user.data.displayName}</h1>
          <p>
            <span>ID:</span>{user.id}</p>
          <p>
            <span>E-Mail:</span> {user.data.email}
          </p>
          <p>
            <span>Role:</span> {user.data.role}
          </p>
          <p>
            <span>Time:</span>{" "}
            {new Date(user.data.createdAt.seconds * 1000).toLocaleString(
              "tr-TR"
            )}
          </p>
        </div>
        <div className="edit-container">
          <div className="edit-column" id="remove">
            <button onClick={() => handleDelete(user.id)}><MdDeleteForever /></button>
          </div>

          <div className="edit-column" id="edit">
            <button><FaEdit /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserItem;

import React from "react";
import "../styles/UserAdd.css";
import { isMailValid, isPasswordStrong } from "../helpers/validFunctions.js";
import { auth, db } from "../Firebase.js";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

function UserAdd() {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("user");


  const addUser = async (event) => {
    event.preventDefault();

    if (!isMailValid(userMail) || !isPasswordStrong(userPass)) {
      alert("Mail is not valid Or Password is not strong");
      return;
    }

    try {
      debugger;
      const userLogUp = await createUserWithEmailAndPassword(
        auth,
        userMail,
        userPass
      );
      const userId = userLogUp.user.uid;

      await setDoc(doc(db, "users", userId), {
        createdAt: serverTimestamp(),
        email: userMail,
        displayName: userName, // ya kayıt formundan al
        watchList: [],
        role: userRole,
      });

      console.log("Kullanici Eklendi")
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="user-add-container">
      <h1 className="form-title">Add User</h1>

      <form className="user-form" onSubmit={addUser}>
        <div className="form-group">
          <label>Enter Name</label>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group">
          <label>Enter Mail</label>
          <input
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
            type="text"
            placeholder="Enter Mail"
          />
        </div>

        <div className="form-group">
          <label>Enter Password</label>
          <input
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            type="text"
            placeholder="Enter Password"
          />
        </div>

        <div className="form-group">
          <label>Select Role</label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default UserAdd;

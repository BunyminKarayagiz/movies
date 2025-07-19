import React from "react";
import "../styles/UserList.css";

function UserItem({ user }) {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Name: {user.data.displayName}</h1>
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
      </div>
    </div>
  );
}

export default UserItem;

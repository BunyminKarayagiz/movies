import React from 'react'
import UserItem from './UserItem'
import '../styles/UserList.css'


function UserList({users}) {
  return (
    <div className="card-container">
        {users.map((user,key) => {
          return <UserItem key={key} user={user}/>
      })}
    </div>
  )
}

export default UserList
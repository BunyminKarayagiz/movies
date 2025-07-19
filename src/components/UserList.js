import React from 'react'
import UserItem from './UserItem'


function UserList({users}) {
  return (
    <div>
        {users.map((user,key) => {
          return <UserItem key={key} user={user}/>
      })}
    </div>
  )
}

export default UserList
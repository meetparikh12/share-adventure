import React from 'react'
import UserItems from "./UserItems";
const UsersList = (props) => {

    if(props.items.length === 0) {
        return <div>
            <h1> No users found.</h1>
        </div>
    } else {
    return (
        <div>
           <ul>
               {props.items.map((user)=> <UserItems 
                   key = {user.id}
                   id={user.id}
                   name= {user.name}
                   places = {user.placeCount}
                   image = {user.image}
               />)}
           </ul> 
        </div>
    )
    }
}

export default UsersList;
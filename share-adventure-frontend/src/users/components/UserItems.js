import React from 'react'
const UserItems = (props) => {

    return (
        <li className="UserItems">

            <h1>Name: {props.name}</h1>
            <p>No. of places visited: {props.places}</p>
            <img src={props.image}/>
        </li>
    )
}


export default UserItems;
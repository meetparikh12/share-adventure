import React from 'react'
import UsersList from '../components/UsersList';
const Users = (props) => {

    const USERS = [{
        id: 'u1',
        name: 'MEET',
        placeCount: 2,
        image: 'https://img.icons8.com/officel/2x/user.png',
    }];

    return (
        <div>
            <UsersList items={USERS} />
        </div>
    )
}

export default Users;
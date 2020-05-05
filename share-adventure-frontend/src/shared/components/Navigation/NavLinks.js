import React from 'react'
import { NavLink } from 'react-router-dom';
import './NavLinks.css';

const NavLinks = () => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/u1/places">MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/place/new">NEW PLACE</NavLink>
            </li>
            <li>
                <NavLink to="/login">AUTHENTICATE</NavLink>
            </li>
        </ul>

    )
}
export default NavLinks;
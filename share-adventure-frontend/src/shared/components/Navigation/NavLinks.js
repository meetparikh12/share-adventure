import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { AuthContext } from '../context/Auth-Context';
import { connect } from 'react-redux';

const NavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            { !auth.isLoggedIn &&
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            }
            { auth.isLoggedIn &&
            <li>
                <NavLink to="/u1/places">MY PLACES</NavLink>
            </li>
            }
            { auth.isLoggedIn &&
            <li>
                <NavLink to="/place/new">NEW PLACE</NavLink>
            </li>
            }
            { !auth.isLoggedIn && <li>
                <NavLink to="/login">AUTHENTICATE</NavLink>
            </li> }

        </ul>

    )
}
export default NavLinks;
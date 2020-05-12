import React from 'react' ;
//{useContext} from 'react'
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
//import { AuthContext } from '../context/Auth-Context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../../store';
import setJwtToken from '../security-utils/setJwtToken';
import { USER_LOGIN} from '../../../actions/actionTypes';

class NavLinks extends React.Component {
  //  const auth = useContext(AuthContext);

    logout(){
        localStorage.removeItem("jwtToken");
        setJwtToken(false);
        store.dispatch({
            type: USER_LOGIN,
            payload: {}
        });
    }

    render(){
        const { userInfo } = this.props;
        return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            { userInfo.userId &&
            <li>
                <NavLink to={`/${userInfo.userId}/places`}>MY PLACES</NavLink>
            </li>
            }
            { userInfo.userId &&
            <li>
                 <NavLink to="/place/new">NEW PLACE</NavLink>
            </li>
            }
            { userInfo.userId &&
            <li>
                <NavLink to="/register" onClick={this.logout.bind(this)}>LOGOUT</NavLink>
            </li>
            }
            { !userInfo.userId && <li>
                <NavLink to="/login">AUTHENTICATE</NavLink>
            </li> }

        </ul>
        )
    }
}
NavLinks.propTypes = {
    userInfo : PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        userInfo: state.user.loginUserInfo
    }
}

export default connect(mapStateToProps,null)(NavLinks);
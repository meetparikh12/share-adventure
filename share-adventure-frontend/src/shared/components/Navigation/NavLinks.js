import React from 'react' ;
//{useContext} from 'react'
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
//import { AuthContext } from '../context/Auth-Context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUserInfo } from '../../../actions/actions';

class NavLinks extends React.Component {
  //  const auth = useContext(AuthContext);

    logout(){
        this.props.setUserInfo(!this.props.isUserLoggedIn, {});
    }

    render(){
        const { isUserLoggedIn } = this.props;
        return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            { isUserLoggedIn &&
            <li>
                <NavLink to="/u1/places">MY PLACES</NavLink>
            </li>
            }
            { isUserLoggedIn &&
            <li>
                 <NavLink to="/place/new">NEW PLACE</NavLink>
            </li>
            }
            { isUserLoggedIn &&
            <li>
                <NavLink to="/register" onClick={this.logout.bind(this)}>LOGOUT</NavLink>
            </li>
            }
            { !isUserLoggedIn && <li>
                <NavLink to="/login">AUTHENTICATE</NavLink>
            </li> }

        </ul>
        )
    }
}
NavLinks.propTypes = {
    isUserLoggedIn : PropTypes.bool.isRequired
}
const mapStateToProps = state => {
    return {
        isUserLoggedIn : state.user.isUserLoggedIn
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        setUserInfo: (isUserLoggedIn) => {
            dispatchEvent(setUserInfo(isUserLoggedIn, {}));
            
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavLinks);
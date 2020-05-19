import React from 'react'
import UsersList from '../components/UsersList';
import axios from 'axios';
import { connect} from 'react-redux';
import { getAllUsers} from '../../actions/actions.js';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';
import PropTypes from 'prop-types';
import config from 'react-global-configuration';

toast.configure();
class Users extends React.Component {

    componentDidMount(){
        trackPromise(
        axios.get(`${config.get('backend_url')}/users`)
        .then((res)=> {
            this.props.getAllUsers(res.data.users);
         })
        .catch((err)=>{
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000
            });
        }));
    }
    render(){
        return (
            <div>
                <UsersList items={this.props.users} />
            </div>
        )
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    getAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => {
   return { users : state.user.allUsers }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        getAllUsers: (users) => dispatchEvent(getAllUsers(users)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users);
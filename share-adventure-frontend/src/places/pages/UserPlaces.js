import React from 'react'
import PlaceList from '../components/PlaceList';
import {connect} from 'react-redux';
import axios from 'axios';
import { getAllPlaces } from '../../actions/actions';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';
import PropTypes from 'prop-types';
import config from 'react-global-configuration';

toast.configure();
class UserPlaces extends React.Component {
    
    componentDidMount(){
        const { userId } = this.props.match.params;
        this.props.getAllPlaces(userId);
    }
    render(){
         const { userId } = this.props.match.params;
        return <PlaceList userId = {userId} items={this.props.places} />;
    }
}

UserPlaces.propTypes = {
    places: PropTypes.array.isRequired,
    getAllPlaces: PropTypes.func.isRequired
}
const mapStateToProps = state => {
    return {
        places: state.place.places
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        getAllPlaces : (userId) => {
            trackPromise(
            axios.get(`${config.get('backend_url')}/places/user/${userId}`)
            .then((res) => {
                dispatchEvent(getAllPlaces(res.data.places));
            })
            .catch((err) => {
                dispatchEvent(getAllPlaces([]));
            }));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPlaces);
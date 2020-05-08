import React from 'react'
import PlaceList from '../components/PlaceList';
import {connect} from 'react-redux';
import axios from 'axios';
import { getAllPlaces } from '../../actions/actions';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';

toast.configure();
class UserPlaces extends React.Component {
    // const userId = useParams().userId;
    // const loadedPlaces = USER_PLACES.filter((place)=> place.creator === userId);

    componentDidMount(){
        const { userId } = this.props.match.params;
        this.props.getAllPlaces(userId);
       // console.log(userId);
    }
    render(){
         const { userId } = this.props.match.params;
        return <PlaceList userId = {userId} items={this.props.places} />;
    }
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
            axios.get(`http://localhost:5000/api/places/user/${userId}`)
            .then((res) => {
                dispatchEvent(getAllPlaces(res.data.places));
            })
            .catch((err) => {
                console.log(err)
                dispatchEvent(getAllPlaces([]));
            }));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPlaces);
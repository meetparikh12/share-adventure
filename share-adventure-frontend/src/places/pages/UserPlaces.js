import React from 'react'
import PlaceList from '../components/PlaceList';
import {connect} from 'react-redux';
import axios from 'axios';
import { getAllPlaces } from '../../actions/actions';
import {toast } from 'react-toastify';

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
        return <PlaceList items={this.props.places} />;
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
            axios.get(`http://localhost:5000/api/places/user/${userId}`)
            .then((res) => {
                dispatchEvent(getAllPlaces(res.data.places));
            })
            .catch((err) => {
                console.log(err)
                dispatchEvent(getAllPlaces([]));
                toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT})
            });
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPlaces);
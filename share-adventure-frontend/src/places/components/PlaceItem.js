import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlaceItem.css';
import { deletePlace } from '../../actions/actions';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceItem = props => {
    
    const showDeleteWarningHandler = (placeId) => {
      
      if(window.confirm('Do you want to delete this place? Please note that it cannot be undone.')) {
          axios.delete(`http://localhost:5000/api/places/${placeId}`)
          .then((res) => {
              props.deletePlace(placeId);
              toast.success(res.data.message, {position: toast.POSITION.BOTTOM_RIGHT});
          })
          .catch((error) => toast.error(error.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT}));
      }
    };

  const openMapHandler = () => {
   alert('Sorry, Map can not be shown.');
  }

  return (
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {props.userInfo._id === props.creatorId && <Button to={`/place/${props.id}`}>EDIT</Button>}
            {props.userInfo._id === props.creatorId && <Button danger onClick={() => showDeleteWarningHandler(props.id)}>DELETE</Button>}
          </div>
        </Card>
      </li>
  );
};

PlaceItem.propTypes = {
  userInfo: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.loginUserInfo
  }
}
const mapDispatchToProps = dispatchEvent => {
  return {
    deletePlace : (placeId) => {dispatchEvent(deletePlace(placeId))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaceItem);

import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlaceItem.css';
import { deletePlace } from '../../actions/actions';
import axios from 'axios';
import { toast } from 'react-toastify';
import { trackPromise } from 'react-promise-tracker';
import config from 'react-global-configuration';

const PlaceItem = props => {
    const [isBtnDisabled, btnDisabledHandler] = useState(false);
    const showDeleteWarningHandler = (placeId) => {
      
      if(window.confirm('Do you want to delete this place? Please note that it cannot be undone.')) {
        btnDisabledHandler(true);
        trackPromise(  
        axios.delete(`${config.get('backend_url')}/places/${placeId}`)
          .then((res) => {
              props.deletePlace(placeId);
              toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000
              });
          })
          .catch((error) => toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000
          })));
          btnDisabledHandler(false);
      }
      btnDisabledHandler(false);
    };

  const openMapHandler = () => {
    toast.info('Sorry, Map Service is unavailable right now.', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000
    })
  }

  return (
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={`${config.get('asset_url')}/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button disabled={isBtnDisabled} inverse onClick={openMapHandler}>VIEW ON MAP</Button>
            {props.userInfo.userId === props.creatorId && <Button disabled={isBtnDisabled} to={`/place/${props.id}`}>EDIT</Button>}
            {props.userInfo.userId === props.creatorId && <Button danger disabled={isBtnDisabled} onClick={() => showDeleteWarningHandler(props.id)}>DELETE</Button>}
          </div>
        </Card>
      </li>
  );
};

PlaceItem.propTypes = {
  userInfo: PropTypes.object.isRequired,
  deletePlace: PropTypes.func.isRequired
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

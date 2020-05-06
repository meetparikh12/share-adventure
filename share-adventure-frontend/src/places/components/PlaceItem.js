import React from 'react';
 //{ useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
//import Modal from '../../shared/components/UIElements/Modal';
import './PlaceItem.css';

const PlaceItem = props => {
  //const [showMap, setShowMap] = useState(false);
  //const [showConfirmModal, setShowConfirmModal] = useState(false);

    
    const showDeleteWarningHandler = () => {
      //setShowConfirmModal(true);
      window.confirm('Do you want to delete this place? Please note that it cannot be undone.')
    };

    // const cancelDeleteHandler = () => {
    //   setShowConfirmModal(false);
    // };

    // const confirmDeleteHandler = () => {
    //   setShowConfirmModal(false);
    //   console.log('DELETING...');
    // };

  const openMapHandler = () => {
   // setShowMap(true);
   alert('Sorry, Map can not be shown.');
  }
  //const closeMapHandler = () => setShowMap(false);

  return (
    // <React.Fragment>
    //   <Modal
    //     show={showMap}
    //     onCancel={closeMapHandler}
    //     header={props.address}
    //     contentClass="place-item__modal-content"
    //     footerClass="place-item__modal-actions"
    //     footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
    //   >
    //     <div className="map-container">
    //       <h2>THE MAP!</h2>
    //     </div>
    //   </Modal>
    //   <Modal
    //     show={showConfirmModal}
    //     onCancel={cancelDeleteHandler}
    //     header="Are you sure?"
    //     footerClass="place-item__modal-actions"
    //     footer={
    //       <React.Fragment>
    //         <Button inverse onClick={cancelDeleteHandler}>
    //           CANCEL
    //         </Button>
    //         <Button danger onClick={confirmDeleteHandler}>
    //           DELETE
    //         </Button>
    //       </React.Fragment>
    //     }
    //   >
    //     <p>
    //       Do you want to delete this place? Please note that it
    //       can't be undone thereafter.
    //     </p>
    //   </Modal>

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
            {props.isUserLoggedIn && <Button to={`/place/${props.id}`}>EDIT</Button>}
            {props.isUserLoggedIn && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>}
          </div>
        </Card>
      </li>
  );
};

PlaceItem.propTypes = {
  isUserLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.user.isUserLoggedIn
  }
}

export default connect(mapStateToProps, null)(PlaceItem);

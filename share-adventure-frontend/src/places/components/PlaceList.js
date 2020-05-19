import React from 'react';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './PlaceList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
            <h2>No places found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          creatorId= {place.creator}
          address = {place.address}
        />
      ))}
    </ul>
  );
};

PlaceList.propTypes = {
  userInfo: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    userInfo: state.user.loginUserInfo
  }
}
export default connect(mapStateToProps, null)(PlaceList);

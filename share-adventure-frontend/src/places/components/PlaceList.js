import React from 'react';
import { Link } from 'react-router-dom';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';
import { connect } from 'react-redux';

import './PlaceList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        { props.userId === props.userInfo.userId ? 
        <Card>
            <h2>No places found. Maybe share one?</h2>
            <Link to="/place/new">Share Place</Link>
        </Card> : 
        <Card>
            <h2>No places found.</h2>
        </Card>
        }
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
const mapStateToProps = state => {
  return {
    userInfo: state.user.loginUserInfo
  }
}
export default connect(mapStateToProps, null)(PlaceList);

import React from 'react'
import PlaceList from '../components/PlaceList';
const UserPlaces = (props) => {
    const USER_PLACES = [{
        id: 'p1',
        title: 'Eiffel Tower',
        description: "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
        address: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
        location: {
            lat: 48.8583701,
            long: 2.2922926
        },
        creator: 'u1',
        imageUrl: "https://lh5.googleusercontent.com/p/AF1QipP-NhTcS5og3oV5i9Io6VCI6L9SId9olNJx12iI=w408-h272-k-no"
    }, {
        id: 'p2',
        title: 'Castel Cafe',
        description: "Late-night food , Cosy, Casual ",
        address: "5 Avenue de Suffren, 75007 Paris, France",
        location: {
            lat: 48.8583701,
            long: 2.2922926
        },
        creator: 'u1',
        imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMMdy3joN1_HlEM-ZwVBkm5-__1ZTrcbUHoIkOE=w408-h256-k-no"
    }]
    return <PlaceList items={USER_PLACES} />;
}

export default UserPlaces;
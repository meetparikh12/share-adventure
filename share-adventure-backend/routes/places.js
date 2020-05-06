const express = require('express');
const route  = express.Router();

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
    creator: 'u2',
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMMdy3joN1_HlEM-ZwVBkm5-__1ZTrcbUHoIkOE=w408-h256-k-no"
}]

route.get('/:placeId', (req,res,next)=> {
    const placeId = req.params.placeId;
    const place = USER_PLACES.find((place)=> place.id === placeId);
    res.json({place});
});

route.get('/user/:userId', (req,res,next) => {
    const userId = req.params.userId;
    const place = USER_PLACES.find((place)=> place.creator === userId);
    res.json({place});

});

module.exports = route;
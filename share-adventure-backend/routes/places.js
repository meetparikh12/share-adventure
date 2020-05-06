const express = require('express');
const route  = express.Router();
const placeController = require('../controllers/places');
route.get('/:placeId', placeController.GET_PLACE_BY_ID) ;

route.get('/user/:userId', placeController.GET_PLACES_BY_USERID );

route.post('/', placeController.CREATE_NEW_PLACE);

module.exports = route;
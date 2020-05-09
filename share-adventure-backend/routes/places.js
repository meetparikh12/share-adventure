const express = require('express');
const route  = express.Router();
const placeController = require('../controllers/places');
const {body} = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const auth = require('../middleware/auth');

route.get('/:placeId', placeController.GET_PLACE_BY_ID) ;

route.get('/user/:userId', placeController.GET_PLACES_BY_USERID );

route.post('/', auth, fileUpload.single('image') ,[
    body('title').trim().isLength({min: 5}).withMessage('Title should be minimum of 5 characters'),
    body('description').trim().isLength({min: 10}).withMessage('Description shoulf be minimum of 10 characters'),
    body('address').trim().isLength({min: 10}).withMessage('Address should be minimum of 10 characters'),
    //body('image').not().isEmpty().withMessage('Please provide an image')
], placeController.CREATE_NEW_PLACE);

route.patch('/:placeId',auth, [
    body('title').trim().isLength({min: 5}).withMessage('Title should be minimum of 5 characters'),
    body('description').trim().isLength({min: 10}).withMessage('Description shoulf be minimum of 10 characters'),
], placeController.UPDATE_PLACE);

route.delete('/:placeId', auth, placeController.DELETE_PLACE);

module.exports = route;
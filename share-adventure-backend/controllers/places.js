const ErrorHandling = require('../models/error-handling');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Place = require('../models/place');

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

exports.GET_PLACE_BY_ID = async (req, res, next) => {
    const placeId = req.params.placeId;
    let place;
    try {
         place = await Place.findOne({_id: placeId}).exec();  
    } catch(err) {
        //error for missing information in url (invalid ID)
        return next(new ErrorHandling('Place not fetched', 500));
    }
    if (!place) {
        //error for place not found in DB (valid ID)
        return next(new ErrorHandling('Place not found', 404));
    }
    res.status(200).json({place});
}

exports.GET_PLACES_BY_USERID = async (req, res, next) => {
    const userId = req.params.userId;
    let places;
    try {
        places = await Place.find({creator: userId}).exec();
    } catch(err){
        return next(new ErrorHandling('Places not fetched', 500));
    }
    if (places.length === 0) {
        return next(new ErrorHandling('Place not found', 404));
    }
    res.json({places});
}

exports.CREATE_NEW_PLACE = async (req,res,next)=> {
    const error = validationResult(req);
    if(!error.isEmpty()){
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    }
    const { title, description, address, creator } = req.body;
    const createdPlace = new Place({
        title,
        description,
        address,
        creator,
        image: "https://lh5.googleusercontent.com/p/AF1QipP-NhTcS5og3oV5i9Io6VCI6L9SId9olNJx12iI=w408-h272-k-no"
    });
    try {
    await createdPlace.save();
    } catch(err) {
        const error = new ErrorHandling('Place not created, please try again', 500);
        return next(error);
    }
    res.status(201).json({place: createdPlace});
}

exports.UPDATE_PLACE = async (req,res,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    }
    const placeId = req.params.placeId;
    let place;
    try{
     place = await Place.findById(placeId);
    }
    catch(err) {
        return next(new ErrorHandling('Try again', 500));
    }

    if(!place){
        return next(new ErrorHandling('Place not found', 404));
    }

    const { title, description} = req.body;
    place.title = title;
    place.description = description;
    try{
      await place.save();
    } catch(err) {
        return next(new ErrorHandling('Place not updated', 500));
    } 
    res.status(200).json({place});
    // let updatedPlace;
    // if(!place) {
    //     throw new ErrorHandling('Place not found', 404);
    // } else {
    //      updatedPlace = {...place}
    // }
    //const {title, description} = req.body;
    // const placeIndex = USER_PLACES.findIndex((place) => place.id === placeId);
    // updatedPlace.title = title;
    // updatedPlace.description = description;
    // USER_PLACES[placeIndex] = updatedPlace;
}

exports.DELETE_PLACE = async (req,res,next)=> {
    const placeId = req.params.placeId;
    //const place = USER_PLACES.find((place)=> place.id === placeId);
    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        return next(new ErrorHandling('Try again', 500));
    }
    if(!place) {
        return next(new ErrorHandling('Place not found', 404));
    } 

    try {
        await Place.findByIdAndRemove(placeId);
    } catch(err) {
        return next(new ErrorHandling('Place not deleted', 500));
    }
    
    res.status(200).json({message: 'Place deleted'});

    //const placeIndex = USER_PLACES.findIndex((place) => place.id === placeId);
    //actually removes element from array
    //USER_PLACES.splice(placeIndex);
    //can also use filter method on USER_PLACES array to get a set of array on condition, it does not change the original array

    
}
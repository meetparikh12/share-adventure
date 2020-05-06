const ErrorHandling = require('../models/error-handling');
const { v4: uuidv4 } = require('uuid');

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

exports.GET_PLACE_BY_ID = (req, res, next) => {
    const placeId = req.params.placeId;
    const place = USER_PLACES.find((place) => place.id === placeId);
    if (!place) {
        // const error = new Error('Place not found');
        // error.statusCode = 404;
        // next(error);
        throw new ErrorHandling('Place not found', 404);
    }
    res.json({
        place
    });

}

exports.GET_PLACES_BY_USERID = (req, res, next) => {
    const userId = req.params.userId;
    const place = USER_PLACES.filter((place) => place.creator === userId);
    if (!place) {
        // const error = new Error('User not found');
        // error.statusCode = 404;
        // next(error);
        return next(new ErrorHandling('User not found', 404));
    }
    res.json({
        place
    });
}

exports.CREATE_NEW_PLACE = (req,res,next)=> {
    const { title, description, address, coordinates, creator } = req.body;
    const createPlace = {
        id: uuidv4(),
        title,
        description,
        address,
        location: coordinates,
        creator
     //   imageUrl: req.body.id
    }
    USER_PLACES.push(createPlace);
    console.log(USER_PLACES);
    res.status(201).json({place: createPlace});
}

exports.UPDATE_PLACE = (req,res,next) => {
    const placeId = req.params.placeId;
    const place = USER_PLACES.find((place)=> place.id === placeId);
    let updatedPlace;
    if(!place) {
        throw new ErrorHandling('Place not found', 404);
    } else {
         updatedPlace = {...place}
    }
    const {title, description} = req.body;
    const placeIndex = USER_PLACES.findIndex((place) => place.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;
    USER_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
}

exports.DELETE_PLACE = (req,res,next)=> {
    const placeId = req.params.placeId;
    const place = USER_PLACES.find((place)=> place.id === placeId);
    if(!place) {
        throw new ErrorHandling('Place not found', 404);
    } 
    const placeIndex = USER_PLACES.findIndex((place) => place.id === placeId);
    //actually removes element from array
    USER_PLACES.splice(placeIndex);
    //can also use filter method on USER_PLACES array to get a set of array on condition, it does not change the original array

    res.status(200).json({message: 'Place deleted'});
}
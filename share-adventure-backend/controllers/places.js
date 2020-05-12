const ErrorHandling = require('../models/error-handling');
const { validationResult } = require('express-validator');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

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
    //let places;
    let user;
    try {
        user = await User.findById(userId).populate('places');
    } catch(err){
        return next(new ErrorHandling('Places not fetched', 500));
    }
    
    //if(!places || !places.length === 0)
    if (user.places.length === 0) {
        return next(new ErrorHandling('No places found', 404));
    }
    res.json({places: user.places});
}

exports.CREATE_NEW_PLACE = async (req,res,next)=> {
    const error = validationResult(req);
    if(!error.isEmpty()){
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    }
    const { title, description, address } = req.body;
    let user;
    try {
         user = await User.findById(req.userId);
    } catch(err){
        return next(new ErrorHandling('Try again', 500));
    }
    if(!user) {
        return next(new ErrorHandling('User not found', 404));
    }

    let imagePath = req.file.path;
    imagePath = imagePath.replace(/\\/g, "/");
    const createdPlace = new Place({
        title,
        description,
        address,
        creator: req.userId,
        image: imagePath
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdPlace.save({session});
        user.places.unshift(createdPlace);
        await user.save({session});
        await session.commitTransaction();
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
    try {
        place = await Place.findById(placeId);
    }
    catch(err) {
        return next(new ErrorHandling('Try again', 500));
    }

    if(!place){
        return next(new ErrorHandling('Place not found', 404));
    }

    if(place.creator.toString() !== req.userId) {
        return next(new ErrorHandling('You are not authorized', 401));
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
   
}

exports.DELETE_PLACE = async (req,res,next)=> {
    const placeId = req.params.placeId;
    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        return next(new ErrorHandling('Try again', 500));
    }
    if(!place) {
        return next(new ErrorHandling('Place not found', 404));
    } 

    if (place.creator._id.toString() !== req.userId) {
        console.log(place.creator);
        console.log("not");
        return next(new ErrorHandling('You are not authorized', 401));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        //alternate way to access user object using creator / thanks to populate method
        place.creator.places.pull(place);
        await place.creator.save({session});
        
        // const user = await User.findById(place.creator.toString());
        // user.places.pull(place);
        // await user.save({session});

        await place.remove({session});
        await session.commitTransaction();
    } catch(err) {
        return next(new ErrorHandling('Place not deleted', 500));
    }

    fs.unlink(place.image, (err) => {
        err && console.log(err);
        !err && console.log("Place deleted");
    })
    res.status(200).json({message: 'Place deleted'});
}

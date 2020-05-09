const ErrorHandling = require('../models/error-handling');
const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.GET_USERS = async (req, res, next) => {
    let users;
    try {
         users = await User.find({}, '-password').populate('places','title description').exec()
    } catch (error) {
        return next(new ErrorHandling('Cannot fetch users', 500));
    } 
    if(users.length === 0) {return next(new ErrorHandling('No users found', 404))};
    
    res.status(200).json({users});
}

exports.SIGN_UP = async (req,res,next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    }
    let user;
    try {
        user = await User.findOne({email: req.body.email})
    } catch(err) {
        return next(new ErrorHandling('Try again', 500));
    }
    if(user) {
        return next(new ErrorHandling('Email already exists', 422));
    }   
    const { name, email, password } = req.body;
    let imagePath = req.file.path;
    imagePath = imagePath.replace(/\\/g, "/");
    
    const userRegister = new User({
        name, email, password, image: imagePath
    })
    try{
        await userRegister.save()
    } catch(err) {
        return next(new ErrorHandling('User not signed up!', 500));
    }
    res.status(201).json({user: userRegister});
}

exports.LOGIN = async (req,res,next)=> {
    const error = validationResult(req);
    if(!error.isEmpty()){
        error.statusCode = 422;
        error.message = error.array()
        return next(error);
    } 
    const { email, password } = req.body;
    let userLogin;
    try {
        userLogin = await User.findOne({email})
    } catch(err){
        return next(new ErrorHandling('Try again', 500));   
    } 

    if(!userLogin || userLogin.password !== password) {
        return next(new ErrorHandling('Invalid credentials', 401));
    }
    
    res.status(200).json({user: userLogin});
}
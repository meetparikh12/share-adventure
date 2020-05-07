const { v4 : uuidv4} = require('uuid');
const ErrorHandling = require('../models/error-handling');

const USERS = [{
    id: 'u1',
    name: 'Meet Parikh',
    email: 'parikhmeet1234@gmail.com',
    password: 'meet1234',
}];


exports.GET_USERS = (req, res, next) => {

    res.json({
    users: USERS
    });

}

exports.SIGN_UP = (req,res,next) => {
    const userRegister = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const user = USERS.find((user)=> user.email === userRegister.email)
    if(user) {
        return res.status(422).json({message: 'Email already exists'});
    }
    USERS.unshift(userRegister);
    res.status(201).json({user: userRegister});
}

exports.LOGIN = (req,res,next)=> {
    const userLogin = {
        email: req.body.email,
        password: req.body.password
    }
    const user = USERS.find((user)=> user.email === userLogin.email);
    if(!user) {
        throw new ErrorHandling('User not found', 404);
    }
    if(user.password !== userLogin.password){
        throw new ErrorHandling('Password mismatch', 401);
    }
    res.status(200).json({user});
}
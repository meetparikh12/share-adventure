const {secretKey} = require('../config/keys');
const jwt = require('jsonwebtoken');
const ErroHandling = require('../models/error-handling');

module.exports = (req,res,next)=> {
    const header = req.get('Authorization');
    if(!header) {
        return next(new ErroHandling('Not Authorized', 401))
    }
    const token = header.split(' ')[1];
    try {
        decodedToken = jwt.verify(token,secretKey);
    } catch (err) {
        return next(new ErroHandling('Not Authorized', 401))
    } 
    if(!decodedToken) {
        return next(new ErroHandling('Not Authorized', 401))
    }

    req.userId = decodedToken.userId;
    next();
}
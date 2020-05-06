const express = require('express');
const route  = express.Router();

route.get('/', (req,res,next)=> {
    res.json({message: 'GOT PLACE'});
});

module.exports = route;
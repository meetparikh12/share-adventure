const express = require('express');
const route = express.Router();
const usersController = require('../controllers/users');

route.get('/', usersController.GET_USERS);
route.post('/signup', usersController.SIGN_UP);
route.post('/login', usersController.LOGIN);

module.exports = route;
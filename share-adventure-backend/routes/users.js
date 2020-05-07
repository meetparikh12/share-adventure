const express = require('express');
const route = express.Router();
const usersController = require('../controllers/users');
const {body} = require('express-validator');

route.get('/', usersController.GET_USERS);
route.post('/signup', [
    body('name').trim().isLength({min: 4}).withMessage('Name should be minimum of 4 characters'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('Password should be minimum of 5 characters.')
], usersController.SIGN_UP);
route.post('/login', [
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('Password should be minimum of 5 characters.')
], usersController.LOGIN);

module.exports = route;
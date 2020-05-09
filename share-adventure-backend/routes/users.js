const express = require('express');
const route = express.Router();
const usersController = require('../controllers/users');
const {body, check} = require('express-validator');
const fileUpload = require('../middleware/file-upload');

route.get('/', usersController.GET_USERS);
route.post('/signup', fileUpload.single('image'), [
    body('name').trim().isLength({min: 4}).withMessage('Name should be minimum of 4 characters'),
    body('email').trim().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 5}).withMessage('Password should be minimum of 5 characters.'),
    //check('image').exists({checkNull: true}).withMessage('Please provide an image')

], usersController.SIGN_UP);
route.post('/login', usersController.LOGIN);

module.exports = route;
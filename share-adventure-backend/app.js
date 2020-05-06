const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');
const ErrorHandling = require('./models/error-handling');
app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

//Middleware for Unsupported Routes
app.use((req,res,next)=> {
    next(new ErrorHandling('The specified route does not exist', 404));
})

//Middleware for handling errors
app.use((error,req,res,next)=> {
    const message = error.message || 'Unknown Error Occured';
    const status = error.statusCode || 500;
    res.status(status).json({message});
})
app.listen(5000);
console.log("Server is listening on port " +5000);

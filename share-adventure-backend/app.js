const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');
const ErrorHandling = require('./models/error-handling');
const mongoose = require('mongoose');
const config = require('config');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type, Authorization');
    next();
});

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

mongoose.connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
})
.then(()=> {
app.listen(5000);
console.log("Server is listening on port 5000");
})
.catch((error)=> {
    console.log(error);
});


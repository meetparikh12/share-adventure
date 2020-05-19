const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');
const ErrorHandling = require('./models/error-handling');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const {mongoURI} = require('./config/keys');

const port = process.env.PORT || 5000

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    next();
});

app.use('/uploads/images', express.static(path.join(__dirname,'uploads','images')))
app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

//Middleware for Unsupported Routes
app.use((req,res,next)=> {
    next(new ErrorHandling('The specified route does not exist', 404));
})

//Middleware for handling errors
app.use((error,req,res,next)=> {
    if(req.file) {
        fs.unlink(req.file.path, (err)=> err && console.log(err))
    }
    const message = error.message || 'Unknown Error Occured';
    const status = error.statusCode || 500;
    res.status(status).json({message});
})

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
})
.then(()=> {
app.listen(5000);
console.log("Server is listening on port " +port);
})
.catch((error)=> {
    console.log(error);
});


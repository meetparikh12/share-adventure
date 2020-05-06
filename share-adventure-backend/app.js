const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use((error,req,res,next)=> {
    const message = error.message || 'Unknown Error Occured';
    const status = error.statusCode || 500;
    res.status(status).json({message});
})
app.listen(5000);
console.log("Server is listening on port " +5000);

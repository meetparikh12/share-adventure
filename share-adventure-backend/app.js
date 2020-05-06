const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');

app.use(bodyParser.json());

app.use('/places', placesRoutes);
app.use('/users', userRoutes);

app.listen(5000);
console.log("Server is listening on port " +5000);

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String, required: true
    },
    address: { type: String, required: true},
    creator: { type: String, required: true},
    image: { type: String, required: true}
})

module.exports = mongoose.model('Place', placeSchema);
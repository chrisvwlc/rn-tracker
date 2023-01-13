const mongoose = require('mongoose');
// WHAT OUR TRACK IS IN OUR APPLICATION
// So once again, this point schema is going to represent one individual recorded point that we collected

// off a mobile device in the world, and it's going to have all those different properties you see listed
//we need to load track schema into mongoose at bottom
const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number,
    }
});
const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''
    },
    //pointing to a separate schema object
    locations: [pointSchema]
});

mongoose.model('Track', trackSchema);

//not tying pointSchema because it's embedded in track
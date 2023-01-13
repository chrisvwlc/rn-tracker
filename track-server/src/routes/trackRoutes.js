const { Router } = require('express');
const express = require('express');
//mongoose gives us access to Track Model we created
//if we required it individually in different files we'd rerun 'mode track traskSchema ll mult times
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

// Note: we have to execute or recquire in track file from at least one location inside of our

// project like for the user JS file. we'll do that in index

const Track = mongoose.model('Track');

const router = express.Router();

//make sure users are signed in
router.use(requireAuth);

//define first route to work with 
//a routte to get all tracks
//HANDLER
router.get('/tracks', async (req, res) => {
    //fetch all tracks from which user?
    //inspect req object... reqAuth... correct jwt... assigned to suerid
    //query mongodb

    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
    
});

//HANDLER
router.post('/tracks', async ( req, res ) => {
    const { name, locations } = req.body;

    if(!name || !locations) {
        return res
        .status(422)
        .send({ error: 'you must provide a name and some locations' });
    }

    try {
        // const track = new Track({name: name, locations: locations});
        const track = new Track({name, locations, userId: req.user._id});
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
    
});

//export this module
module.exports = router;
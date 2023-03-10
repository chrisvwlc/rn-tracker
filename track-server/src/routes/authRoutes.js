const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log(req.body);
    // res.send('You made a post request');

    //destructred from req.body
    const { email, password } = req.body;

    try {
        const user = new User({email, password});
        await user.save();    

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
       // res.send('you made a post request');
    } catch (err) {
        return res.status(422).send(err.message);
    }

});

router.post('/signin', async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide email and password'});
    }

    // await User.findOne({email: email})
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(422).send({ error: 'Invalid email or password' });
    }

    try {
        await user.comparePassword(password);
        //if passwords match, assign jot
        const token = jwt.sign({ userId : user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (err) {
        //422 something kinda wrong
        return res.status(422).send({error: 'no matching email or password'});
    }
    

});

module.exports = router;

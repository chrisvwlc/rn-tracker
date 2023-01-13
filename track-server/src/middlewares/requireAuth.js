//preprocessing middleware fn to check incoming request has token
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

//next: a signal that the request can move on to the next middleware inside of our chain


//request handler
module.exports = (req, res, next) => {
    //attempt to authenticate user
    const { authorization } = req.headers;

    //authorization === 'Bearer elslekfjlaj'...

    if(!authorization){
        return res.status(401).send({ error: 'You must be logged in, dear.'});
    }

    const token = authorization.replace('Bearer ', '');

    //validate token
    //payload is what we stuck into our json web token
    jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
        if(err){
            return res.status(401).send({error: 'you must be logged in, you'});
        }
        const { userId } = payload;

        const user = await User.findById(userId);
        req.user = user;
        next();
        //onto our next middleware in the chain...
    });
};


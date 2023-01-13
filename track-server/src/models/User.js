const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//define
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//step 1 hash and salt pw
userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

//step 2

userSchema.methods.comparePassword = function ( candidatePassword ) {
    //'THIS' HERE REFERS TO USER MODEL
    //creating our own promise to use async await syntax while we compare pws
    //bcrypt library uses callbacks excluslively

    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
}
mongoose.model('User', userSchema);
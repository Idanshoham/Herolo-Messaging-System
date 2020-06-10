const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/user');

findAndGetUserByUsername = (username, res, next) => {
    User.findOne({ username }, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        if (!existingUser) {
            return res.status(422).send({ error: 'user does not exists' });
        }

        res.json({ user: existingUser });
    });
};

exports.getUserDetailsById = function(req, res, next) {
    const userToken = req.body.userToken;
    const userId = ObjectID(jwt.decode(userToken, process.env.SECRET + '').sub);

    if (!userId) {
        return res.status(422).send({ error: 'You must provide userId'});
    }

    User.findById(userId , function(err, existingUser) {
        if (err) {
            return next(err);
        }

        if (!existingUser) {
            return res.status(422).send({ error: 'user does not exists' });
        }

        res.json({ user: existingUser });
    });
}

exports.getUserDetails = function(req, res, next) {
    const username = req.body.username;

    if (!username) {
        return res.status(422).send({ error: 'You must provide username'});
    }

    findAndGetUserByUsername(username, res, next);
}

exports.editUserDetails = function(req, res, next) {
    const { username, newName, oldPassword, newPassword } = req.body;

    if (!username) {
        return res.status(422).send({ error: 'You must provide username'});
    }

    User.findOne({ username: username }, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        if (!existingUser) {
            return res.status(422).send({ error: 'user does not exists' });
        }

        let query = {
            name: newName ? newName : existingUser.name,
        };

        if (oldPassword) {
            bcrypt.compare(oldPassword, existingUser.password, function(err, isMatch) {
                if (err){
                next(err);
                }

                if (!isMatch) {
                    return res.status(422).send({ error: 'old password is incorrect' });
                } else {
                    bcrypt.genSalt(10, function(err, salt) {
                        if (err) {
                            return next(err);
                        }
                
                        bcrypt.hash(newPassword, salt, null, function(err, hash) {
                            if (err) {
                                return next(err);
                            }

                            query["password"] = newPassword ? hash : existingUser.password;
                            
                            User.updateOne({ username: username }, query, function(err) {
                                if (err) {
                                    return next(err);
                                }

                                findAndGetUserByUsername(username, res, next);
                            });
                        });
                    });
                }
            });
        }
        else {
            User.updateOne({ username: username }, query, function(err) {
                if (err) {
                    return next(err);
                }

                findAndGetUserByUsername(username, res, next);
            });
        }
    });
}

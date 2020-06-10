const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET + '');
}

exports.signin = function(req, res, next) {
    res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
    const { name, username, password } = req.body;

    if (!username || !password) {
        return res.status(422).send({ error: 'You must provide username and password'});
    }

    User.findOne({ username: username }, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({ error: 'username is in use' });
        }

        const user = new User({
            name: name,
            username: username,
            password: password
        });

        user.save(function(err) {
            if (err) {
                return next(err);
            }
        });

        res.json({ token: tokenForUser(user) });
    });
}

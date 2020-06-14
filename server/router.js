const AuthenticationController = require('./Controllers/authenticationController');
const UserController = require('./Controllers/userController');
const MessageController = require('./Controllers/messageController');
const passportService = require('./Services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ hi: 'there' });
    });
    app.post('/signin', requireSignin ,AuthenticationController.signin);
    app.post('/signup', AuthenticationController.signup);

    app.post('/getUserDetailsById', UserController.getUserDetailsById);
    app.post('/getUserDetails', UserController.getUserDetails);
    app.post('/editUserDetails', UserController.editUserDetails);

    app.post('/writeMessage', MessageController.writeMessage);
    app.post('/deleteMessage', MessageController.deleteMessage);
    app.post('/getAllReceivedMessages', MessageController.getAllReceivedMessages);
    app.post('/getAllSentMessages', MessageController.getAllSentMessages);
};

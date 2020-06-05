const ObjectID = require('mongodb').ObjectID;
const Message = require('../models/message');

exports.writeMessage = function(req, res, next) {
    const { sender, receiver, subject, message } = req.body;

    if (!sender || !receiver) {
        return res.status(422).send({ error: 'You must provide sender username and receiver username'});
    }

    const newMessage = {
        sender,
        receiver,
        subject,
        message,
        creationDate: Date.now()
    }

    Message.insertMany(newMessage, function (err) {
        if (err) {
            return next(err);
        };
        res.send('message sent');
    });
}

exports.deleteMessage = function(req, res, next) {
    const { messageId } = req.body;

    Message.deleteOne({ _id: ObjectID(messageId) }, function(err, result) {
        if (err) {
            return next(err);
        } 
        if (!result.deletedCount) {
            return res.status(422).send({ error: 'message was not deleted' });
        }
        res.send('message deleted');
    });
}

exports.getAllMessages = function(req, res, next) {
    const { username } = req.body;

    if (!username) {
        return res.status(422).send({ error: 'You must provide username'});
    }

    Message.find({ sender: username }, function(err, allSendedMessages) {
        if (err) {
            return next(err);
        }

        Message.find({ receiver: username }, function(err, allReceivedMessages) {
            if (err) {
                return next(err);
            } else {
                res.send(allSendedMessages.concat(allReceivedMessages));
            }
        });
    });
}

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
        creationDate: Date.now(),
        isDeletedBySender: false,
        isDeletedByReceiver: false
    }

    Message.insertMany(newMessage, function (err) {
        if (err) {
            return next(err);
        };

        res.send('message sent');
    });
}

exports.deleteMessage = function(req, res, next) {
    const { messageId, isDeleterSender } = req.body;

    if (isDeleterSender) {
        Message.findOneAndUpdate({ _id: ObjectID(messageId) }, { isDeletedBySender: true }, function(err, message) {
            if (err) {
                return next(err);
            } 

            if (!message) {
                return res.status(422).send({ error: 'message was not found' });
            }

            if (message.isDeletedByReceiver) {
                Message.deleteOne({ _id: ObjectID(messageId) }, function(err, result) {
                    if (err) {
                        return next(err);
                    } 

                    if (!result.deletedCount) {
                        return res.status(422).send({ error: 'message was not deleted' });
                    }

                    res.send('message deleted completly');
                });
            }
            else
                res.send('message deleted');
        });
    }
    else {
        Message.findOneAndUpdate({ _id: ObjectID(messageId) }, { isDeletedByReceiver: true }, function(err, message) {
            if (err) {
                return next(err);
            } 

            if (!message) {
                return res.status(422).send({ error: 'message was not found' });
            }

            if (message.isDeletedBySender) {
                Message.deleteOne({ _id: ObjectID(messageId) }, function(err, result) {
                    if (err) {
                        return next(err);
                    } 

                    if (!result.deletedCount) {
                        return res.status(422).send({ error: 'message was not deleted' });
                    }

                    res.send('message deleted completly');
                });
            }
            else
                res.send('message deleted');
        });
    }
}

exports.getAllReceivedMessages = function(req, res, next) {
    const { username } = req.body;

    if (!username) {
        return res.status(422).send({ error: 'You must provide username'});
    }

    Message.find({ receiver: username, isDeletedByReceiver: false }).sort({ 'creationDate': -1}).exec(function(err, allReceivedMessages) {
        if (err) {
            return next(err);
        } else {
            res.send({ messages: allReceivedMessages.length !== 0 ? allReceivedMessages : undefined });
        }
    });
}

exports.getAllSentMessages = function(req, res, next) {
    const { username } = req.body;

    if (!username) {
        return res.status(422).send({ error: 'You must provide username'});
    }

    Message.find({ sender: username, isDeletedBySender: false }).sort({ 'creationDate': -1}).exec(function(err, allSentMessages) {
        if (err) {
            return next(err);
        } else {
            res.send({ messages: allSentMessages.length !== 0 ? allSentMessages : undefined });
        }
    });
}

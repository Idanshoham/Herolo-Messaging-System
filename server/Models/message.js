const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: String,
    receiver: String,
    subject: String,
    message: String,
    creationDate: Date,
    isDeletedBySender: Boolean,
    isDeletedByReceiver: Boolean
});

const ModelClass = mongoose.model('message', messageSchema);

module.exports = ModelClass;
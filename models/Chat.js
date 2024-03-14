const mongo = require('mongoose');
const User = require('./User');
const Message = require('./Message');

const Schema = mongo.Schema

const Chat = new Schema({
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    messages : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    }]
})

module.exports = mongo.model('chat',Chat);
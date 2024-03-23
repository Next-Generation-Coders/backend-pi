const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    type: { type: String, required: true, enum: ['one-on-one', 'group'] },
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    }],
});

module.exports = mongoose.model('Chat', chatSchema);
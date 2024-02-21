const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User');
const Match = require('./Match');

const TeamSchema = new Schema({
    name: String,
    logo: String,
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }]
});

module.exports = mongoose.model('Team', TeamSchema);
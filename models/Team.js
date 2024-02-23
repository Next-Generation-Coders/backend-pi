const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User');
const Match = require('./Match');

const TeamSchema = new Schema({
    name: String,
    logo: String,
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }]
});

module.exports = mongoose.model('Team', TeamSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Team = require('./Team');
const Match = require('./Match');

const TournamentSchema = new Schema({
    title: String,
    startDay: Number,
    startMonth: Number,
    startYear: Number,
    endDay: Number,
    endMonth: Number,
    endYear: Number,
    trophy: String,
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }]
});

module.exports = mongoose.model('Tournament', TournamentSchema);
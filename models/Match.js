const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },startDay : Number,
    startMonth : Number,
    startYear : Number,
    endDay : Number,
    endMonth : Number,
    endYear : Number,
    result : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MatchResult'
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
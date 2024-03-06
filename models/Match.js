const mongoose = require('mongoose');
const Team = require('./Team');

<<<<<<< HEAD
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
=======
const Schema = mongo.Schema
//
const Match = new Schema({
    
    team1 : {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Team'
    },
    team2 : {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Team'
    },
    round :Number,
    startDay : Number,
>>>>>>> origin/youssef
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
    },
    referee: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'user'
    }],   
})

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
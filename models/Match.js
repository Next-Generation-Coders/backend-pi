const mongo = require('mongoose');
const Team = require('./Team');
const Result = require('./Result');
const Tournament = require('./Tournament');

const Schema = mongo.Schema

const Match = new Schema({
    
    team1 :  {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Team'
    },
    team2 :  {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Team'
    },
    round :Number,
    startDay : Number,
    startMonth : Number,
    startYear : Number,
    endDay : Number,
    endMonth : Number,
    endYear : Number,
    result : {
        type: mongo.Schema.Types.ObjectId,
        ref: 'result'
    },
    tournament: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    referee: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'user'
    }],  
})

module.exports = mongo.model('match',Match);
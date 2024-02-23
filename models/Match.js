const mongo = require('mongoose');
const Team = require('./Team');

const Schema = mongo.Schema
//
const Match = new Schema({
    
    team1 : Team,
    team2 : Team,
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
    }    
})

module.exports = mongo.model('match',Match);
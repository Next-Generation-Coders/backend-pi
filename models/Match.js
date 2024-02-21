const mongo = require('mongoose');
const Team = require('./Team');
const Tournament = require('./Tournament');

const Schema = mongo.Schema

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    },
    tournament : Tournament
})

module.exports = mongo.model('match',Match);
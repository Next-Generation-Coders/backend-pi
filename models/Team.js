const mongo = require('mongoose');
const Match = require('./Match');
const User = require('./User')

const Schema = mongo.Schema

const Team = new Schema({
    name : String,
    logo : String,
    players : [User],
    coach : User,
    matches : [Match]
    
})

module.exports = mongo.model('team',Team);
const mongo = require('mongoose');

const Schema = mongo.Schema

const Role = {
    COACH: 'COACH',
    PLAYER: 'PLAYER',
    REFEREE: 'REFEREE',
    ORGANIZER : 'ORGANIZER',
    USER : 'USER',
    ADMIN : 'ADMIN'
  };

const User = new Schema({
    fullname : String,
    email : String,
    phone : String,
    age : Number,
    role : [{
        type : String,
        enum : Object.values(Role),
        default : Role.USER
    }]
})

module.exports = mongo.model('user',User);
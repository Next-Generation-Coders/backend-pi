const mongoose = require('mongoose');
const { Schema } = mongoose;


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
    }],
    //teams to show player previous team // Coach also maybe
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    // games played by coach and player 
    games:Number , 
    // rating of player or coach 
    rate:Number ,
    // for player 
    position:String ,
    jersyNumber:Number ,
    value:String //parseFloat to chnage it to float 

})

module.exports = mongoose.model('user',User);
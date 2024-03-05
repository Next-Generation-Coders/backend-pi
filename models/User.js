const mongo = require('mongoose');
const bcrypt = require("bcrypt");
const validator = require('validator')


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
    password : String,
    age : Number,
    verified:{
        type:Boolean,
        default:false
    },
    roles : [{
        type : String,
        enum : Object.values(Role),
        default : Role.USER
    }],
    isBlocked: {
        type:Boolean,
        default : false
    },
    //teams to show player previous team // Coach also maybe
    teams: [{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    // games played by coach and player
    games:Number ,
    // rating of player or coach
    rate:Number ,
    // for player
    position:String ,
    jerseyNumber:Number ,
    //parseFloat to chnage it to float
    value:String,
    secret:String,
    googleId:String,
    avatar:{
        type:String,
        default:null
    },
    country:{
        label:{
            type:String,
            default:null
        },
        value:{
            type:String,
            default:null
        },
    },
    city:{
        label:{
            type:String,
            default:null
        },
        value:{
            type:String,
            default:null
        },
    }

})

User.statics.login = async function(email, password) {

    if (!email || !password ) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

User.statics.signup = async function(email, password,phone,fullname,age) {

    if (!email || !password || !phone || !fullname || !age) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const rls = [Role.USER];
    const vrf=false;
    return await this.create({email, password: hash,phone,age,fullname,roles:rls,verified:vrf})
}


User.statics.signupPlayer = async function(email, password,phone,fullname,age,position,jerseyNumber) {

    if (!email || !password || !phone || !fullname || !age) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const rls = [Role.PLAYER,Role.USER];
    const vrf=false;
    return await this.create({email, password: hash,phone,age,fullname,roles:rls,verified:vrf,jerseyNumber,position})
}

module.exports = mongo.model('user',User);
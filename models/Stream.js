const mongo = require("mongoose");
const Schema = mongo.Schema

const StreamStatus = {
    PLAYING:"PLAYING",
    SOON:"SOON",
    PAUSED:"PAUSED",
    ENDED:"ENDED",
};

const Stream = new Schema({
    roomName: {
        type : String,
        default : null
    },
    owner: {
        type: String,
        default: 'None'
    },
    status:{
        type:String,
        enum:Object.values(StreamStatus),
        default:StreamStatus.PLAYING
    },
    roomUrl:{
        type:String,
        default:null
    },
    startDate:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongo.model('stream',Stream);
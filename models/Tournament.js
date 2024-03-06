const mongoose = require('mongoose');
const { Schema } = mongoose;
const Team = require('./Team');
const Match = require('./Match');


const FriOrComp = {
    Competitive: 'Competitive',
    Friendly: 'Friendly',
  };

  const TournamentType = {
    Knockout: 'Knockout',
    League: 'League',
    Championship:'Championship',
  };

  const TournamentStatus = {
    Pending: 'Pending',
    Finished: 'Finished',
    OnGoing:'OnGoing',
    Paid: 'Paid'
  };

  const access = {
    Private: 'Private',
    Public: 'Public',
  };

const TournamentSchema = new Schema({
    title: String,
    startDay: Number,
    startMonth: Number ,
    startYear: Number,
    endDay : Number,
    endMonth : Number , 
    endYear : Number,
    Country: String,
    City : String,
    trophy: String,
    numberOfPlayers: Number,
    numberOfTeams:Number,
    logo: String,
    TournamentType : [{
        type : String,
        enum : Object.values(TournamentType),
        default : TournamentType.League
    }],
    TournamentStatus : [{
        type : String,
        enum : Object.values(TournamentStatus),
        default : TournamentStatus.Pending
    }],
    access : [{
        type : String,
        enum : Object.values(access),
        default : access.Private
    }],
    FriOrComp : [{
        type : String,
        enum : Object.values(FriOrComp),
        default : FriOrComp.Competitive
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match'
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Tournament', TournamentSchema);
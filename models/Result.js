const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Result = new Schema({
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
      },
      team1Goals: {
        type: Number,
        required: true
      },
      team2Goals: {
        type: Number,
        required: true
      }
})

module.exports = mongoose.model('result',Result);
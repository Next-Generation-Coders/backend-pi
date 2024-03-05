const express = require("express")
const http = require("http")
const cors = require('cors');
var app = express()
const Bodyparser=require('body-parser')
const mongo= require ("mongoose")
const server = http.createServer(app)
const allowedOrigin = 'http://localhost:5173';
const config=require ('./config/dbconfig.json')
app.use(Bodyparser.json())
const db = require('./config/dbcon');
const Tournament = require('./models/Tournament');
const ResultRouter=require("./routes/ResultRoute");
app.use("/api",ResultRouter);
const socketIo = require('socket.io');

const  io = socketIo(server);


app.use(cors());
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('goal', async ({ team }) => {
    try {
      // Update match data in the database based on the team that scored
      const result = await Result.findOne().populate('match');
      if (!result) {
        throw new Error('Match not found');
      }

      if (team === 'team1') { 
        console.log("team1 goal")
        result.team1Goals++;
      } else if (team === 'team2') {
        console.log("team2 goal")

        result.team2Goals++;
      }

      await result.save();

      // Emit scoreUpdate event to all connected clients with updated score information
      io.emit('scoreUpdate', { team1Goals: result.team1Goals, team2Goals: result.team2Goals });
    } catch (error) {
      console.error('Error:', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000,console.log("server is running"))
  mongo.connect(config.url ,{
      useUnifiedTopology:true,
      useNewUrlParser:true,
  }).then (()=> console.log("database connected")).catch(()=>console.log("error with db connection "));

module.exports =app